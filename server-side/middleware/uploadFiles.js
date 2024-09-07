import  path from 'path';
import multer from 'multer';
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../server-side/uploads');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname );
	}
});

const  fileFilter   =(req, file, cb) =>{
	const filetypes = /mp3|wav|ogg|jpeg|jpg|png|audio/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);
  
	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error('Error: Audio or image Files Only!'));
	}
};

const upload=multer({storage,fileFilter });

export default upload;