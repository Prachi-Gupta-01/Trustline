import { Contact } from "../models/contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (err) {
    console.error("Error submitting contact form:", err);
    res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};
