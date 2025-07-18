import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function MyFormValidation() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        validateForm(name, value);
    };

    const validateForm = (name, value) => {
        switch (name) {
            case "username":
                if (!value.trim()) return "Name is required";
                if (value.trim().length < 4) {
                    return "Username must be at least 4 characters";
                }
                if (/[^a-zA-Z0-9]/.test(value)) {
                    return "symbols not allowed";
                }
                return "Username looks good!";

            case "email":
                if (!value.trim()) return "Email is required";
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                    return "Email is invalid";
                }
                return "Email looks good!";

            case "password":
                if (!value.trim()) return "Password is required";
                if (value.trim().length < 6) {
                    return "Password must be at least 6 characters";
                }
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                }
                return "Password looks good!";

            case "confirmPassword":
                if (!value.trim()) return "Please confirm your password";
                if (value !== formData.password) {
                    return "Passwords do not match";
                }
                return "Passwords match!";

            default:
                return "";
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

                    <div className="space-y-6">
                        {/* Username Field - Valid State */}
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
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border-2 border-green-300 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200"
                                    placeholder="Enter your username"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-green-600 flex items-center">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Username looks good!
                            </p>
                        </div>

                        {/* Email Field - Invalid State */}
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
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border-2 border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <XCircle className="w-5 h-5 text-red-500" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Please enter a valid email address
                            </p>
                        </div>

                        {/* Password Field - Default State */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border-2 border-gray-300 bg-white hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <Eye className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password Field - Invalid State */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 text-black rounded-lg border-2 border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
                                    placeholder="Confirm your password"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                                    <XCircle className="w-5 h-5 text-red-500" />
                                    <EyeOff className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-red-600 flex items-center">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Passwords do not match
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        >
                            Create Account
                        </button>
                    </div>

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
