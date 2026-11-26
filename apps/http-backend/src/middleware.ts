import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		const decoded = jwt.verify(req.headers.authorization ?? "", JWT_SECRET);
		if (decoded) {
			if (typeof decoded === "string") {
				return res.status(401).json({ success: false, msg: "Invalid or expired token" });
			}
			req.userId = decoded.userId;
			next();
		}
	} catch {
		return res.status(401).json({ success: false, msg: "Invalid or expired token" });
	}
}
