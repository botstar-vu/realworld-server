const handleError = (req, res) => {
  let error = req.error;
  let message = 'Undetected error';
  switch (error.code) {
    case 502: message = 'Database did not response'; break;
    case 404: message = 'Cannot find requested resource'; break;
    case 406: message = 'Username or email is taken'; break;
  }
  res.status(error.code).json({message});
}

module.exports = { handleError };