import express from "express";
import { createCompany, listCompanies, updateCompany, deleteCompany } from "../controllers/companyController.js";
import authMiddleware  from "../middlewares/auth.js";

const companyRouter = express.Router();

companyRouter.use(authMiddleware);

companyRouter.post("/register", createCompany);
companyRouter.get("/", listCompanies);
companyRouter.put("/:id", updateCompany);
companyRouter.delete("/:id", deleteCompany);

export default companyRouter;
