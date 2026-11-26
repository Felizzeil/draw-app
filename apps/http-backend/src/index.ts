import express, { type Express } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { authorizationMiddleware } from "./middleware";
const app: Express = express();

app.post("signin", (req, res) => {
	const userId = 1;
	const token = jwt.sign(
		{
			userId,
		},
		JWT_SECRET,
	);
	res.send(token);
});
app.post("signup", (req, res) => {});
app.post("createroom", authorizationMiddleware, (req, res) => {});

app.listen(3001);
export default app;
