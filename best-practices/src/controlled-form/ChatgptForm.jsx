import { useState } from "react";

function SignupForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let message = "";

        if (name === "name" && value.trim().length < 3) {
            message = "Name must be at least 3 characters.";
        }

        if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
            message = "Email is invalid.";
        }

        if (name === "password" && value.length < 6) {
            message = "Password must be at least 6 characters.";
        }

        if (name === "confirmPassword" && value !== formData.password) {
            message = "Passwords do not match.";
        }

        setErrors((prev) => ({
            ...prev,
            [name]: message,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation
        const newErrors = {};
        Object.keys(formData).forEach((key) =>
            validateField(key, formData[key])
        );

        if (Object.values(errors).some((msg) => msg)) {
            alert("Please fix validation errors.");
            return;
        }

        console.log("Form submitted:", formData);
        alert("Form submitted successfully!");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4 pl-4">
            {/* Name */}
            <div>
                <label className="block mb-1">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block mb-1">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block mb-1">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block mb-1">Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Sign Up
            </button>
        </form>
    );
}

export default SignupForm;
