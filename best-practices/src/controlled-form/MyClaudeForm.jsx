import { useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function FormValidation() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // check input value & returns "valid" or "invalid" state
    const validateUsername = (username) => {
        if (!username) return "default";
        return username.length >= 3 ? "valid" : "invalid";
    };

    const validateEmail = (email) => {
        if (!email) return "default";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) ? "valid" : "invalid";
    };

    const validatePassword = (password) => {
        if (!password) return "default";
        return password.length >= 8 ? "valid" : "invalid";
    };

    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) return "default";
        return confirmPassword === password ? "valid" : "invalid";
    };

    const usernameState = validateUsername(formData.username);
    const emailState = validateEmail(formData.email);
    const passwordState = validatePassword(formData.password);
    const confirmPasswordState = validateConfirmPassword(
        formData.confirmPassword,
        formData.password
    );

    // handle form submission
    const isFormValid =
        usernameState === "valid" &&
        emailState === "valid" &&
        passwordState === "valid" &&
        confirmPasswordState === "valid";

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            alert("Please fix all validation errors before submitting");
            return;
        }

        console.log("Form submitted successfully!", formData);
        alert("Account created successfully!");

        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    // get input classes based on validation state
    const getInputClasses = (validationState) => {
        const baseClasses =
            "w-full text-black px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-200";

        switch (validationState) {
            case "valid":
                return `${baseClasses} border-green-300 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-500`;
            case "invalid":
                return `${baseClasses} border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500`;
            default:
                return `${baseClasses} border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500`;
        }
    };

    // render validation icon based on validation state
    const renderValidationIcon = (validationState) => {
        switch (validationState) {
            case "valid":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case "invalid":
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return null;
        }
    };

    // render validation message based on validation state
    const renderValidationMessage = (
        validationState,
        validMessage,
        invalidMessage
    ) => {
        switch (validationState) {
            case "valid":
                return (
                    <p className="mt-2 text-sm text-green-600 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {validMessage}
                    </p>
                );
            case "invalid":
                return (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {invalidMessage}
                    </p>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600">
                            Fill in your details to get started
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={getInputClasses(usernameState)}
                                    placeholder="Enter your username"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {renderValidationIcon(usernameState)}
                                </div>
                            </div>
                            {renderValidationMessage(
                                usernameState,
                                "Username looks good!",
                                "Username must be at least 3 characters long"
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={getInputClasses(emailState)}
                                    placeholder="Enter your email"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {renderValidationIcon(emailState)}
                                </div>
                            </div>
                            {renderValidationMessage(
                                emailState,
                                "Email format is correct",
                                "Please enter a valid email address"
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={getInputClasses(passwordState)}
                                    placeholder="Enter your password"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    {renderValidationIcon(passwordState)}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {renderValidationMessage(
                                passwordState,
                                "Password strength is good",
                                "Password must be at least 8 characters long"
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={getInputClasses(
                                        confirmPasswordState
                                    )}
                                    placeholder="Confirm your password"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                                    {renderValidationIcon(confirmPasswordState)}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {renderValidationMessage(
                                confirmPasswordState,
                                "Passwords match!",
                                "Passwords do not match"
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isFormValid
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 focus:ring-blue-500"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="#"
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
