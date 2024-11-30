const { v4: uuidv4 } = require("uuid");

let db;

const setDatabase = (database) => {
    db = database;
};


//Create Book API
const createBook = async (req, res) => {
    try {
        const { title, author, genre, availableCopies, publishedDate } = req.body;
        if (title && author && availableCopies) {
            const id = uuidv4();
            const createQuery = `
                INSERT INTO book 
                    (id,title, author, publishedDate, genre, availableCopies)
                VALUES ('${id}','${title}', '${author}', '${genre}', ${publishedDate}, ${availableCopies});
            `;
            await db.run(createQuery);
            res.status(201).json({ data: "Book Created Successfully", bookId: id });
        } else {
            res.status(400).json({ error: "BAD Request" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

};


//Update Book API
const updateBook = async (req, res) => {
    try {
        const { title, author, genre, availableCopies, publisheddate } = req.body;
        const { id } = req.params;
        if (title && author && availableCopies && id) {
            const updateQuery = `
                UPDATE book  
                                SET
                                    title= '${title}', 
                                    author= '${author}', 
                                    genre='${genre}', 
                                    publishedDate=${publishedDate}, 
                                    availableCopies=${availableCopies}
                                WHERE id = ${id};
            `;
            await db.run(updateQuery);
            res.status(200).json({ message: "Book Updated Successfully" });
        } else {
            res.status(400).json({ error: "BAD Request" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//GET All Books API with pagination & search query
const getAllBooks = async (req, res) => {
    try {
        const { search_q = "", page = 1, limit = 10 } = req.query;
        const parsedLimit = parseInt(limit, 10) || 10;
        const parsedPage = parseInt(page, 10) || 1;
        const offset = (parsedPage - 1) * parsedLimit;

        const getQuery = `
            SELECT * 
            FROM book
            WHERE id LIKE ? OR title LIKE ? OR author LIKE ? OR genre LIKE ?
            LIMIT ? OFFSET ?;
        `;
        const params = [`%${search_q}%`, `%${search_q}%`, `%${search_q}%`, `%${search_q}%`, parsedLimit, offset];
        const books = await db.all(getQuery, params);
        res.status(200).json({
            data: books,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



//Get Particular Book API
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const query = `SELECT * FROM book WHERE id = ${id};`;
            const book = await db.get(query);
            res.status(200).json({ data: book });
        } else {
            res.status(400).json({ error: "BAD Request" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//DELETE book API
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const deleteQuery = `DELETE FROM book WHERE id = ${id};`;
            const result = await db.run(deleteQuery);
            if (result.changes === 0) {
                return res.status(404).json({ error: "Book not found." });
            }
            res.status(200).json({ data: "Book deleted successfully." });
        } else {
            res.status(400).json({ error: "BAD Request" });

        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { setDatabase, createBook, updateBook, getAllBooks, getBookById, deleteBook };
