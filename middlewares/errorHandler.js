const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }
   else if (error.isBoom) {
    const { statusCode, payload } = error.output;
    res.status(statusCode).json(payload);
  } 
  // else if(error.code === 11000){
  //   res.status(400).json("duplicate user!");
  // }
  else {
    console.log('ERROR',error)

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default errorHandler;
 