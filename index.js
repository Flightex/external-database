const express = require("express");
const fetch = require("node-fetch");
const app = express();
const fs = require("fs");
const marked = require("marked");
const {
	dbURI,
	port,
	token
} = require("./config.js");

const Keyv = require("keyv");
const db = new Keyv(dbURI);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());


const returnError = async (res, httpCode, message, path) => {
	let fullError = {
		code: httpCode,
		message: message,
		path: path
	};
	res.status(httpCode).send(fullError);
}

app.get("/", async (req, res) => {
	let path = __dirname + '/README.md';
	let file = fs.readFileSync(path, 'utf8');
	res.status(200).send(marked(file.toString()));
})

app.post("/set", async (req, res) => {
	if (req.header.token !== token) {
		returnError(res, 401, "Invalid or missing API token!", "/set");
		res.end();
		return;
	}
	if (!req.body.data) {
		returnError(res, 400, "You are missing the data object!", "/set");
		res.end();
		return;
	}
	await db.set(req.body.data.key, req.body.data.value);
	res.status(204);
	res.end();
});

app.post("/get", async (req, res) => {
	if (req.header.token !== token) {
		returnError(res, 401, "Invalid or missing API token!", "/get");
		res.end();
		return;
	}
	if (!req.body.data) {
		returnError(res, 400, "You are missing the data object!", "/get");
		res.end();
		return;
	}
	let d = await db.get(req.body.data.key.toString())
	res.status(200).send((d == undefined || d == null) ? "undefined" : d.toString())
})

app.post("/ping", async (req, res) => {
	var used = process.memoryUsage().heapUsed / 1024 / 1024;
	var total = process.memoryUsage().heapTotal / 1024 / 1024;
	var ramTotal = Math.round(total * 100) / 100
	var ramUsed = Math.round(used * 100) / 100
	await db.set('dbInfo.uptime', process.uptime())
	await db.set('dbInfo.ram.used', ramUsed)
	await db.set('dbInfo.ram.total', ramTotal)
	await db.set('os', process.platform)
	res.status(200).send("Pong!")
})

app.listen(port, () => {
	console.log(`External database is up and running! It's listening on port ${port}.`)
});