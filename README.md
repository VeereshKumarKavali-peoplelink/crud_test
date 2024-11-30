CRUD Operations:
Implement the following endpoints:
POST /books - Add a new book.
GET /books - Retrieve a list of all books.
GET /books/:id - Retrieve details of a single book by ID.
PUT /books/:id - Update details of a specific book by ID.
DELETE /books/:id - Delete a specific book by ID.
Book Schema:
A book should have the following fields:
id (UUID or auto-generated)
title (string, required)
author (string, required)
publishedDate (date, optional)
genre (string, optional)
availableCopies (integer, required)
Database:
Use a simple database (SQLite, PostgreSQL, or MongoDB). Provide setup scripts or instructions if needed.
Validation:
Ensure that all required fields are validated. Use a library like Joi or express-validator for input validation.
Error Handling:
Implement proper error handling for scenarios such as missing data, invalid input, or a non-existent book ID.
 