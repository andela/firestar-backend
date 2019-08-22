
/* eslint-disable import/prefer-default-export */

export const signUp = async (req, res) => {
  const { verificationMailResponse } = req;

  return res.status(200).json({
    status: 200,
    data: {
      message:
        'Message successfully sent, please check your email',
      verificationMailResponse
    }
  });
};
