const express = require("express");

const router = express.Router();

// Controllers
// Controller
const {
    addUser,
    getUsers,
    getUser,
    updateUser,
    delUser,
} = require("../controllers/user");
const {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    delProduct,
} = require("../controllers/product");
const {
    getTransactions,
    addTransaction,
} = require("../controllers/transaction");
const { addCategory, getCategories, getCategory } = require("../controllers/category");
const { register, login } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// Routes
// User
router.post("/user", addUser);
router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", delUser);

// Category
router.post("/category", auth, addCategory);
router.get("/category", auth, getCategories);
router.get("/category/:id", auth, getCategory)

// Product
router.get("/products", auth, getProducts);
router.get("/products/:name", auth, getProduct);
router.post("/products", auth, uploadFile("img"), addProduct);
router.patch("/products/:name", auth, uploadFile("img"), updateProduct);
router.delete("/products/:id", auth, delProduct);

//Transaction
router.get("/transactions", auth, getTransactions);
router.post("/transactions", auth, addTransaction);

// Register Login
router.post("/register", register);
router.post("/login", login);

module.exports = router;
