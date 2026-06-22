
const fs = require("fs");




const Paper = require("../models/paper");

exports.uploadPaper = async (req, res) => {

    try {

        if(!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required"
            });
        }

        const {
            title,
            abstract,
            authors,
            keywords,
            publicationYear,
            researchDomain
        } = req.body;

        if(!title || !abstract) {

            return res.status(400).json({
                success: false,
                message:
                    "Title and Abstract are required"
            });
        }

        const paper =
            await Paper.create({

                title,

                abstract,

                authors:
                    authors
                    ? authors.split(",")
                        .map(a => a.trim())
                    : [],

                keywords:
                    keywords
                    ? keywords.split(",")
                        .map(k => k.trim())
                    : [],

                publicationYear,

                researchDomain,

                pdfPath: req.file.path

            });

        res.status(201).json({

            success: true,

            message:
                "Paper uploaded successfully",

            paper

        });

    }
    catch(err) {

        res.status(500).json({

            success: false,

            message: err.message

        });
    }
};




// Existing uploadPaper here...

exports.getAllPapers = async (req, res) => {
  try {
    const papers = await Paper.find();

    res.status(200).json({
      success: true,
      papers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getPaperById = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found"
      });
    }

    res.status(200).json({
      success: true,
      paper
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.deletePaper = async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: "Paper not found"
      });
    }

    // Delete PDF file from uploads folder
    if (fs.existsSync(paper.pdfPath)) {
      fs.unlinkSync(paper.pdfPath);
    }

    // Delete MongoDB document
    await Paper.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Paper and PDF deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};