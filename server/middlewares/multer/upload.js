import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // cb(null, Date.now() + file.originalname);
        //const uuidFile = v4();
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

export { upload };