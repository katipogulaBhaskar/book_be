import mongoose from "mongoose";

// User schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Book schema
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
});

// Borrow schema
const BorrowSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "dummy", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
});

// Models
const User = mongoose.model("dummy", UserSchema);
const Book = mongoose.model("Book", BookSchema);
const Borrow = mongoose.model("Borrow", BorrowSchema);

export { User, Book, Borrow };
