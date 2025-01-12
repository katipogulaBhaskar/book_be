import express from "express";
import { logInUser, signUpUser, logoutUser } from '../controllers/user.controller.js';
import { addBook, getBooks, updateBook, deleteBook, borrowBook, getBorrowedBooks } from "../controllers/book.controllers.js";


//import { addToDoList, editToDoList, completeToDoList, deleteToDoList, fetchAllTasks } from "../controller/todolist.controller.js";

const router = express.Router();

router.post('/signupUser', signUpUser);

router.post('/loginUser', logInUser);

router.post('/logout', logoutUser);

router.post("/books", addBook); // Add a new book
router.get("/get_books", getBooks); // Get all books
router.put("/books/:id", updateBook);

// Route to delete a book by its ID
router.delete("/books/:id", deleteBook);


// Routes for Borrowing
router.post("/borrow", borrowBook); // Borrow a book
router.get("/borrowed", getBorrowedBooks); // Get all borrowed books

export default router;