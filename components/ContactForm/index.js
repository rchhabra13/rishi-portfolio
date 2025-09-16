import React, { useState, useEffect } from "react";

const initialState = { fullName: "", email: "", message: "", subject: "" };

const ContactForm = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(null); // "success" | "error"
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((current) => ({ ...current, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Real-time validation
  useEffect(() => {
    const { fullName, email, message, subject } = formValues;
    const newErrors = {};
    
    if (fullName && fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }
    
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    if (message && message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    if (subject && subject.trim().length < 5) {
      newErrors.subject = "Subject should be at least 5 characters";
    }
    
    setErrors(newErrors);
    
    // Check if form is valid
    const isValid = fullName.trim() && 
                   email.trim() && 
                   message.trim() && 
                   subject.trim() &&
                   Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
  }, [formValues]);

  const validate = () => {
    const { fullName, email, message, subject } = formValues;
    
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    if (!subject.trim()) return "Please enter a subject.";
    if (!message.trim()) return "Please enter your message.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    
    if (fullName.trim().length < 2) return "Name must be at least 2 characters.";
    if (subject.trim().length < 5) return "Subject should be at least 5 characters.";
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
    <div className="mt-10 w-full max-w-2xl">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 laptop:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="fullName">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formValues.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName 
                    ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20" 
                    : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                }`}
                disabled={isSubmitting}
                required
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email 
                    ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20" 
                    : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                }`}
                disabled={isSubmitting}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="subject">
              Subject *
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formValues.subject}
              onChange={handleChange}
              placeholder="Project collaboration, job opportunity, etc."
              className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.subject 
                  ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20" 
                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              }`}
              disabled={isSubmitting}
              required
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formValues.message}
              onChange={handleChange}
              placeholder="Tell me about your project, ideas, or how I can help you..."
              className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.message 
                  ? "border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20" 
                  : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              }`}
              disabled={isSubmitting}
              required
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formValues.message.length}/500 characters
            </p>
          </div>

          {statusMessage && (
            <div
              className={`p-4 rounded-lg border ${
                statusType === "success"
                  ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                  : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {statusType === "success" ? (
                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{statusMessage}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              * Required fields
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className={`inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium transition-all duration-200 transform ${
                isSubmitting || !isFormValid
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

