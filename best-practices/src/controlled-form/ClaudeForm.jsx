import React, { useState } from "react";

const ControlledForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Name is required";
                if (value.trim().length < 2)
                    return "Name must be at least 2 characters";
                if (!/^[a-zA-Z\s]+$/.test(value))
                    return "Name can only contain letters and spaces";
                return "";

            case "email":
                if (!value.trim()) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value))
                    return "Please enter a valid email address";
                return "";

            case "password":
                if (!value) return "Password is required";
                if (value.length < 6)
                    return "Password must be at least 6 characters";
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                }
                return "";

            case "confirmPassword":
                if (!value) return "Please confirm your password";
                if (value !== formData.password)
                    return "Passwords do not match";
                return "";

            default:
                return "";
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Real-time validation
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));

            // Special case: re-validate confirm password when password changes
            if (name === "password" && touched.confirmPassword) {
                const confirmError = validateField(
                    "confirmPassword",
                    formData.confirmPassword
                );
                setErrors((prev) => ({
                    ...prev,
                    confirmPassword: confirmError,
                }));
            }
        }
    };

    // Handle field blur (when user leaves the field)
    const handleBlur = (e) => {
        const { name, value } = e.target;

        // Mark field as touched
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        // Validate field
        const error = validateField(name, value);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");

        // Mark all fields as touched
        setTouched({
            name: true,
            email: true,
            password: true,
            confirmPassword: true,
        });

        // Validate all fields
        const formErrors = validateForm();
        setErrors(formErrors);

        // If no errors, submit the form
        if (Object.keys(formErrors).length === 0) {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 2000));

                setSubmitMessage("Form submitted successfully! 🎉");

                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setTouched({});
                setErrors({});
            } catch (error) {
                setSubmitMessage(error, "Submission failed. Please try again.");
            }
        } else {
            setSubmitMessage("Please fix the errors above.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Sign Up Form
            </h2>

            <div className="space-y-4">
                {/* Name Field */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                            errors.name && touched.name
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter your full name"
                    />
                    {errors.name && touched.name && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                            errors.email && touched.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && touched.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                            errors.password && touched.password
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Create a password"
                    />
                    {errors.password && touched.password && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                            errors.confirmPassword && touched.confirmPassword
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                        isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>

                {/* Submit Message */}
                {submitMessage && (
                    <p
                        className={`text-center text-sm ${
                            submitMessage.includes("successfully")
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {submitMessage}
                    </p>
                )}
            </div>

            {/* Debug Info (Remove in production) */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold text-gray-700 mb-2">
                    Debug Info:
                </h3>
                <p className="text-xs text-gray-600">
                    <strong>Form Valid:</strong>{" "}
                    {Object.keys(validateForm()).length === 0 ? "Yes" : "No"}
                </p>
                <p className="text-xs text-gray-600">
                    <strong>Touched Fields:</strong>{" "}
                    {Object.keys(touched)
                        .filter((key) => touched[key])
                        .join(", ") || "None"}
                </p>
            </div>
        </div>
    );
};

export default ControlledForm;
