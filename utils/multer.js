const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'));
  }
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: fileFilter
});
module.exports=upload;