require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST Route
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
        const numbers = data.filter(item => /^[0-9]+$/.test(item));
        const highestAlphabet = alphabets.sort().pop() || null;

        res.status(200).json({
            is_success: true,
            user_id: "22bcs11999",
            college_email_id:"gunjan@gmail.com",
            college_roll_number: "22bcs11999",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Internal Server Error" });
    }
});

app.get("/", (req, res) => {
    res.send("API is configuring.")
});

// GET Route
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

