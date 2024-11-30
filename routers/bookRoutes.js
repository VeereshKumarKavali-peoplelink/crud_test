const express = require("express");
const { createBook, updateBook, getAllBooks, getBookById } = require("../controllers/bookController");

const router = express.Router();

router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);

module.exports = router;

