const express = require("express");
const cors = require("cors");
const route = require("./routes")

const app = express();

app.use(cors());
app.use(express.json())
app.use(route)

app.get("/", (req, res) =>{
res.json({message: "Welcome to library management application."})
});

const errorHandler = (error, req, res, next) => {
	res.status(error.status || 500).send({ message: error.message });
	next();
};

app.use(errorHandler);

module.exports = app;