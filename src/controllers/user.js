
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
    return res.status(500).json({ status: 500, error: 'An Internal Error occured during the process.' });
  }
};


export default signUp;
