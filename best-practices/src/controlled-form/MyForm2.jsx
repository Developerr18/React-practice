import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import FormInput from "./MyForm2Input";

export default function MyFormValidation() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [status, setStatus] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        validateForm(name, value);
    };

    const validateForm = (name, value) => {
        let message = "";

        switch (name) {
            case "username":
                if (!value.trim()) {
                    message = "Name is required";
                } else if (value.trim().length < 4) {
                    message = "Username must be at least 4 characters";
                } else if (/[^a-zA-Z0-9]/.test(value)) {
                    message = "symbols not allowed";
                } else {
                    message = "Username looks good!";
                }
                break;

            case "email":
                if (!value.trim()) {
                    message = "Email is required";
                } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                    message = "Email is invalid";
                } else {
                    message = "Email looks good!";
                }
                break;

            case "password":
                if (!value.trim()) {
                    message = "Password is required";
                } else if (value.trim().length < 6) {
                    message = "Password must be at least 6 characters";
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    message =
                        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
                } else {
                    message = "Password looks good!";
                }
                break;

            case "confirmPassword":
                if (!value.trim()) {
                    message = "Please confirm your password";
                } else if (value !== formData.password) {
                    message = "Passwords do not match";
                } else {
                    message = "Passwords match!";
                }
                break;

            default:
                return "";
        }

        setStatus((prevStatus) => ({
            ...prevStatus,
            [name]: message,
        }));
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
                        <FormInput
                            name="username"
                            label="Username"
                            type="text"
                            formData={formData}
                            handleInputChange={handleInputChange}
                            status={status}
                        />

                        <FormInput
                            name="email"
                            label="Email"
                            type="email"
                            formData={formData}
                            handleInputChange={handleInputChange}
                            status={status}
                        />

                        <FormInput
                            name="password"
                            label="Password"
                            type="password"
                            formData={formData}
                            handleInputChange={handleInputChange}
                            status={status}
                        />

                        <FormInput
                            name="confirmPassword"
                            label="ConfirmPassword"
                            type="password"
                            formData={formData}
                            handleInputChange={handleInputChange}
                            status={status}
                        />

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
