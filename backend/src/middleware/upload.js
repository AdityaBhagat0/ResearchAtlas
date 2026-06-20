const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

// const fileFilter = (req, file, cb) => {

//     if(file.mimetype === "application/pdf") {
//         cb(null, true);
//     }
//     else {
//         cb(
//             new Error(
//                 "Only PDF files are allowed"
//             ),
//             false
//         );
//     }
// };

const fileFilter = (req, file, cb) => {
    console.log("Mimetype:", file.mimetype);
    console.log("Original Name:", file.originalname);

    cb(null, true);
};

const upload = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 20 * 1024 * 1024
    }
});

module.exports = upload;