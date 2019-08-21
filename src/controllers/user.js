
const signUp = async (req, res) => {
  const { verificationMailResponse } = req;

  try {
    return res.status(200).json({
      status: 200,
      data: {
        message:
        'Message successfully sent, please check your email',
        verificationMailResponse
      }
    });
  } catch (err) {
    return res.status(400).json({ status: 400, error: 'An Error occured during the process.' });
  }
};


export default signUp;
