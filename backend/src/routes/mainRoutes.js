import express from "express";
import { getCategories } from "../controllers/categoriesController.js";
import { saveOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/categories", getCategories);

router.post("/order", saveOrder);

export default router;
