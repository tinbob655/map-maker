// routes/hello.ts
import { Router, Request, Response } from "express";

const router = Router();

router.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript backend!" });
});

export default router;
