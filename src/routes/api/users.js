import { Router } from "express";
import passport from "passport";
import moment from "moment";
import crypto from "crypto";
import Validation from "../../validation";
import { sendResetMail, sendSignupMail } from "../../services/sendMail";
import { errorResponse, successResponse } from "../../utils/response";
import Hash from "../../utils/hash";
import models from "../../databaseCopy/models";

const router = Router();

const User = models.User;
const Login = models.Login;
const Reset = models.Reset;

router.get("/user", (req, res, next) => {
  User.findById(req.payload.id)
    .then(user => {
      if (!user) {
        return res.sendStatus(401);
      }
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

router.put("/user", (req, res, next) => {
  User.findById(req.payload.id)
    .then(user => {
      if (!user) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (typeof req.body.user.username !== "undefined") {
        user.username = req.body.user.username;
      }
      if (typeof req.body.user.email !== "undefined") {
        user.email = req.body.user.email;
      }
      if (typeof req.body.user.bio !== "undefined") {
        user.bio = req.body.user.bio;
      }
      if (typeof req.body.user.image !== "undefined") {
        user.image = req.body.user.image;
      }
      if (typeof req.body.user.password !== "undefined") {
        user.setPassword(req.body.user.password);
      }

      return user.save().then(() => res.json({ user: user.toAuthJSON() }));
    })
    .catch(next);
});

router.post("/users/login", (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (user) {
      return res.json({ user: user.toAuthJSON() });
    }
    return res.status(422).json(info);
  })(req, res, next);
});

router.post("/users", (req, res, next) => {
  const user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user
    .save()
    .then(() => res.json({ user: user.toAuthJSON() }))
    .catch(next);
});

// @route POST /api/v1/users/forgotpassword
// @desc Generate User Password Reset / Returning JWT Token
// @access Public
router.post("/forgotpassword", (req, res, next) => {
  const { errors, isValid } = Validation.validateEmail(req.body);

  // Check validation
  if (!isValid) {
    return errorResponse(res, 400, errors);
  }

  const { email } = req.body;
  console.log("email ", email);

  // Find user by email
  User.findOne({ where: { email } }).then(user => {
    // Check for user
    if (!user) {
      return sendSignupMail(user);
    }

    const newReset = new Reset({
      user_id: user.user_id,
      email: req.body.email,
      reset_token: "",
      created_on: new Date(),
      expire_time: moment
        .utc()
        .add(process.env.TOKENEXPIRY, "seconds")
        .toLocaleString()
    });

    // Generate Reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    Hash.hash(resetToken).then(resetHash => {
      newReset.reset_token = resetHash;
      // Remove all reset token for this user if it exists
      Reset.findOne({
        where: {
          email: newReset.dataValues.email
        }
      }).then(result => {
        return Reset.destroy({
          where: { email: newReset.dataValues.email }
        })
          .then(() => {
            newReset
              .save()
              // Send reset link to user email
              .then(() => {
                sendResetMail(user.dataValues, resetToken);
              });
          })
          .then(() =>
            successResponse(res, 200, "Check your mail for further instruction")
          )
          .catch(error => errorResponse(res, 500, error));
      });
    });
  });
});

// @route POST /api/v1/users/resetpassword/:id/:restToken
// @desc Resets a User Password / Returns a new Password
// @access Public
router.post("/resetpassword/:user_id", (req, res, next) => {
  const { errors, isValid } = Validation.validatePassword(req.body);

  // Check validation
  if (!isValid) {
    return errorResponse(res, 400, errors);
  }

  const { user_id } = req.params;
  const resetToken = req.query.token;
  const { password } = req.body;

  // Find user by email
  Reset.findOne({ where: { user_id } }).then(user => {
    // Check if user has requested password reset
    if (user) {
      // Check if reset token is not expired
      const expireTime = moment.utc(user.expire_time);

      // If reset link is valid and not expired
      if (
        moment().isBefore(expireTime) &&
        Hash.compareWithHash(resetToken, user.reset_token)
      ) {
        // Store hash of new password in login
        Hash.hash(password)
          .then(hashed => {
            Login.update(
              {
                token: "",
                password: hashed,
                logged_in: false,
                last_login: new Date()
              },
              { where: { email: user.email } }
            );
          })
          // Delete reset request from database
          .then(() => Reset.destroy({ where: { email: user.email } }))
          .catch(error => errorResponse(res, 500, error));
        return successResponse(res, 200, "Password Updated successfully");
      }
      return errorResponse(res, 400, "Invalid or expired reset token");
    }
    return errorResponse(res, 400, "Invalid or expired reset token");
  });
});

export default router;
