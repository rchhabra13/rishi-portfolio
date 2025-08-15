import React, { useState } from "react";

const initialState = { fullName: "", email: "", message: "" };

const ContactForm = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(null); // "success" | "error"

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const { fullName, email, message } = formValues;
    if (!fullName || !email || !message) return "Please fill out all fields.";
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (message.trim().length < 10) return "Message should be at least 10 characters.";
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    setStatusType(null);

    const error = validate();
    if (error) {
      setStatusMessage(error);
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message. Please try again later.");
      }

      setStatusMessage("Thanks! Your message has been sent.");
      setStatusType("success");
      setFormValues(initialState);
    } catch (err) {
      setStatusMessage(err.message);
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-4 w-full max-w-2xl">
      <div>
        <label className="block text-sm opacity-80" htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formValues.fullName}
          onChange={handleChange}
          placeholder="Jane Doe"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label className="block text-sm opacity-80" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label className="block text-sm opacity-80" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formValues.message}
          onChange={handleChange}
          placeholder="How can I help you?"
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          disabled={isSubmitting}
          required
        />
      </div>

      {statusMessage && (
        <div
          className={`text-sm rounded-md px-3 py-2 ${
            statusType === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
          }`}
        >
          {statusMessage}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;

