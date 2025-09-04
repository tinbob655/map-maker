// routes/userMaps.ts
import { Router, Request, Response } from "express";
import fs from "fs";

const router = Router();

router.get("/userMaps", (req: Request, res: Response) => {
  try {
    if (fs.existsSync("savedMaps.json")) {
      const data: string = fs.readFileSync("savedMaps.json", "utf-8");
      res.json(JSON.parse(data));
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not find user maps" });
  }
});

export default router;
