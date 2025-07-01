require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { connect } = require("http2");
const Session = require("./models/Session");
const Question = require("./models/Question");
const { generatePrimeSync, generateKey } = require("crypto");
const { GenerateContentResponse } = require("@google/genai");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const questions = require('./routes/questionRoutes');

const app = express();

//Middleware to handle CORS

app.use(
    cors({
        origin:"*",
        methods:['GET','POST', 'PUT', 'DELETE'],
        allowedHeaders:["Content-Type", "Authorization"],
    })

);

connectDB()

//Middleware
app.use(express.json());
//routes
app.use("/api/auth",authRoutes);
//app.use('/api/sessions', sessionRoutes);
//app.use('/api/questions', questionRoutes);

//app.use("/api/ai/generate-questiions", protect, generateInterviewQuestions);
//app.use("/api/ai/generate-explation", protect, generateConceptExplanation);

//server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Running onn port ${PORT}`));