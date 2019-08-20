import chai from "chai";

const { expect } = chai;
chai.use(chaiHttp);

const apiVersion = "/api/v1";
const forgotPasswordURL = `${apiVersion}/users/forgotpassword`;
const resetPasswordURL = `${apiVersion}/users/resetpassword`;
const validId = 2;
const resetToken = "12ererfbuib23iub328o7rg8hbiuva";

describe("POST /api/v1/users/resetpassword", () => {
  it("should not generate reset link without a valid email of an existing user", done => {
    chai
      .request(app)
      .post(`${forgotPasswordURL}`)
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal("error");
        expect(res.body.error).to.be.equal("Email is required");
        done();
      });
  });

  it("should not reset password without new password from existing user", done => {
    chai
      .request(app)
      .post(`${resetPasswordURL}/${validId}/${resetToken}`)
      .send({
        confirmPassword: ""
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal("error");
        expect(res.body.error).to.be.equal("Password is required");
        done();
      });
  });

  it("should not reset password without valid password", done => {
    chai
      .request(app)
      .post(`${resetPasswordURL}/${validId}/${resetToken}`)
      .send({
        password: "1"
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal("error");
        expect(res.body.error).to.be.equal("Password is invalid");
        done();
      });
  });

  it("should not reset password if passwords do not match", done => {
    chai
      .request(app)
      .post(`${resetPasswordURL}/${validId}/${resetToken}`)
      .send({
        password: "password10",
        confirmPassword: "password9"
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.equal("error");
        expect(res.body.error).to.be.equal("Passwords must match");
        done();
      });
  });

  it("should not reset password if reset password link is invalid", done => {
    chai
      .request(app)
      .post(`${resetPasswordURL}/${validId}/${resetToken}`)
      .send({
        password: "password10",
        confirmPassword: "password10"
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.equal("error");
        expect(res.body.error).to.be.equal("Invalid or expired reset token");
        done();
      });
  });
});
