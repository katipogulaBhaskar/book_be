import mongoose from "mongoose";
import { User, Book, Borrow } from "../models/user.model.js";

// Controller for Book

// Add a new book
export const addBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const book = new Book({ title, author });
        await book.save();
        res.status(201).json({ message: "Book added successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
    }
};

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
};

// Update a book
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    try {
        // Check if the book exists
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Update book details
        book.title = title || book.title;
        book.author = author || book.author;

        await book.save();
        res.status(200).json({ message: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the book exists
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      // Delete the book using findByIdAndDelete
      await Book.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error); // Log the error for debugging
      res.status(500).json({ message: "Error deleting book", error });
    }
  };
  
  


// Controller for Borrow
export const borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Ensure that userId and bookId are valid
        const user = await User.findById(userId);
        const book = await Book.findById(bookId);

        // If either the user or book does not exist, return an error
        if (!user || !book) {
            return res.status(400).json({ message: "Invalid user or book ID" });
        }

        // Create and save the Borrow record
        const borrow = new Borrow({ userId, bookId });
        await borrow.save();

        res.status(201).json({ message: "Book borrowed successfully", borrow });
    } catch (error) {
        res.status(500).json({ message: "Error borrowing book", error });
    }
};


export const getBorrowedBooks = async (req, res) => {
    try {
        const borrowedBooks = await Borrow.find()
            .populate("userId", "username email")  // Exclude password, only fetch username and email
            .populate("bookId");  // Populate bookId with all book fields

        res.status(200).json(borrowedBooks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching borrowed books", error });
    }
};


