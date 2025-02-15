const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
  
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      httpOnly: true,
      sameSite: "none",
      secure: true, // ensure this is set to true if using HTTPS
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  
  export default sendToken;
  