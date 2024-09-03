import multer from "multer";
import  path from 'path';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../server-side/uploads')

    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })

const  fileFilter   =(req, file, cb) =>{
    const filetypes = /mp3|wav|ogg|jpeg|jpg|png|audio|xls|xlsx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const excelMimeTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    const mimetype = excelMimeTypes.includes(file.mimetype) || filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Audio, image, or Excel files only!'));
    }
}

const upload=multer({storage,fileFilter });

export default upload;