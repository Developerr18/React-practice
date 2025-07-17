import { useState } from "react";

export default function MyForm() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // update user data
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let message = "";

        if (name === "username" && value.trim().length < 3) {
            message = "Name must be at least 3 characters.";
        }

        if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
            message = "Email is invalid.";
        }

        if (name === "password" && value.length < 6) {
            message = "Password must be at least 6 characters.";
        }

        if (name === "confirmPassword" && value !== user.password) {
            message = "Passwords do not match.";
        }

        setErrors((prev) => ({
            ...prev,
            [name]: message,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Object.keys(user).forEach((key) => validateField(key, user[key]));

        if (Object.values(errors).some((msg) => msg)) {
            alert("Please fix validation errors.");
            return;
        }

        console.log("Form submitted:", user);
        alert("Form submitted successfully!");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-5 max-w-[700px] w-full"
        >
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                <label className="text-white text-left sm:text-right">
                    Username:
                </label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="border rounded px-3 py-1 w-full"
                />
                {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                )}
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                <label className="text-white text-left sm:text-right">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="border rounded px-3 py-1 w-full"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                )}
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                <label className="text-white text-left sm:text-right">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="border rounded px-3 py-1 w-full"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                )}
            </div>

            {/* Confirm password         */}
            <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                <label className="text-white text-left sm:text-right">
                    Confirm Password:
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className="border rounded px-3 py-1 w-full"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
                Register
            </button>
        </form>
    );
}
