import multer from "multer";
import path from "path";

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // first arguman is for errors that set null for now
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: Storage,
  // fileFilter: (req, file, cb) => {
  //   if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
  //     cb(null, true);
  //   } else {
  //     console.log("only png and jpg was supported");
  //     cb(null, false);
  //   }
  // },
  // limits: {
  //   fileSize: 1024 * 1024 * 2
  // }
}).single("files");



