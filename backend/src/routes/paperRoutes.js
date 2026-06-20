const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadPaper,
  getAllPapers,
  getPaperById,
  deletePaper
} = require("../controllers/paperController");

router.post(
  "/upload",
  upload.single("pdf"),
  uploadPaper
);

router.get("/", getAllPapers);

router.get("/:id", getPaperById);

router.delete("/:id", deletePaper);

module.exports = router;