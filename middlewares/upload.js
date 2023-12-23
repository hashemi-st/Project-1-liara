import multer from "multer";

const Storage = multer.memoryStorage()
export const upload = multer({
  storage: Storage,
//   onError : function(err, next) {
//     next(err);
//   }
}).single('testImage')