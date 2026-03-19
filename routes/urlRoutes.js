import express from 'express';
import { shortenUrl,redirectUrl, getStats } from '../controllers/urlController.js';

const router = express.Router()
router.post("/shorten",shortenUrl)
router.get("/stats/:code", getStats)
router.get("/:code", redirectUrl)

export default router;