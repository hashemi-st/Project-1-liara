import multer from "multer";

const Storage = multer.memoryStorage()
export const upload = multer({
  storage: Storage,
}).single('image')