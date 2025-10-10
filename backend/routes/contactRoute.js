import express from "express";
import {
  submitContactForm,
  getAllContacts,
} from "../controllers/contactController.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

//submit
router.post("/contact", submitContactForm);

//admin route to get all contacts
router.get(
  "/admin/contacts",
  authenticateUser,
  authorizeRoles("admin"),
  getAllContacts
);
export default router;
