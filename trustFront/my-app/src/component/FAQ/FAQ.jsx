import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Trustline?",
    answer:
      "Trustline is an online civic complaint management system that allows citizens to report issues such as road damage, water leakage, garbage collection, and more. It connects citizens, staff, and municipal authorities for faster and transparent issue resolution."
  },
  {
    question: "How do I register on Trustline?",
    answer:
      "You can register by clicking the “Signup” button on the homepage and filling in your basic details like name, email, and password. Once registered, you can log in anytime to submit and track your complaints."
  },
  {
    question: "How can I submit a complaint?",
    answer:
      "After logging in, go to the “Submit Complaint” section, select the issue category, add a short description, upload images (optional), and submit. You’ll receive a unique complaint ID for tracking."
  },
  {
    question: "How do you handle delayed complaints?",
    answer:
      "If a complaint is not resolved within its SLA time, it automatically gets escalated to higher authorities for faster action."
  }
  
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
        <div className="faq-left">
            <p style={{color:"#0D9488"}}>FAQs</p>
            <p className="faq-heading">Answers to Common Queries</p>
        </div>
      <div className="faq-right">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
