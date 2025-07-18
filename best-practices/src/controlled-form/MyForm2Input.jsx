import { Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function FormInput({
    name,
    label,
    type = "text",
    formData,
    handleInputChange,
    status,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const fieldValue = formData[name] || "";
    const fieldStatus = status[name] || "";
    const isValid =
        fieldStatus?.includes("good") ||
        fieldStatus?.includes("Passwords match");
    const hasFeedback = fieldStatus !== "";

    const inputStyles = isValid
        ? "border-green-300 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-500"
        : hasFeedback
        ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-500"
        : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500";

    const textColor = isValid ? "text-green-600" : "text-red-600";
    const StatusIcon = isValid ? CheckCircle : XCircle;
    const MessageIcon = isValid ? CheckCircle : AlertCircle;

    // determine if we should toggle password
    const isPasswordField = name === "password" || name === "confirmPassword";

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    type={isPasswordField && showPassword ? "text" : type}
                    name={name}
                    id={name}
                    value={fieldValue}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 text-black rounded-lg border-2 ${inputStyles} focus:outline-none transition-all duration-200`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                />
                {hasFeedback && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {/* Validation icon (✅ or ❌) */}
                        <StatusIcon
                            className={`w-5 h-5 ${
                                isValid ? "text-green-500" : "text-red-500"
                            }`}
                        />

                        {/* Eye toggle for password fields */}
                        {isPasswordField &&
                            (showPassword ? (
                                <EyeOff
                                    onClick={() => setShowPassword(false)}
                                    className="w-5 h-5 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                />
                            ) : (
                                <Eye
                                    onClick={() => setShowPassword(true)}
                                    className="w-5 h-5 ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                />
                            ))}
                    </div>
                )}
            </div>
            {hasFeedback && (
                <p
                    id={`${name}-status`}
                    className={`mt-2 text-sm flex items-center ${textColor}`}
                >
                    <MessageIcon className="w-4 h-4 mr-1" />
                    {fieldStatus}
                </p>
            )}
        </div>
    );
}
