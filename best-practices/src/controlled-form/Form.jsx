import { useState } from "react";
import "./Form.css";

export default function Form() {
    const [user, setUser] = useState({});

    return (
        <>
            <form className="space-y-4 p-5 max-w-[900px] w-full">
                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                    <label className="text-white text-left sm:text-right">
                        Username:
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username..."
                        className="border rounded px-3 py-1 w-full"
                        value={user.name || ""}
                        onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                        }
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                    <label className="text-white text-left sm:text-right">
                        Email:
                    </label>
                    <input
                        type="email"
                        className="border rounded px-3 py-1 w-full"
                        value={user.email || ""}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                    <label className="text-white text-left sm:text-right">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="border rounded px-3 py-1 w-full"
                        value={user.password || ""}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] items-center gap-2">
                    <label className="text-white text-left sm:text-right">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        className="border rounded px-3 py-1 w-full"
                        value={user.confirmPassword || ""}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                >
                    Register
                </button>
            </form>

            <hr />

            <div className="display-input m-5">
                <div className="username">username: {user.name}</div>
                <div className="email">email: {user.email}</div>
                <div className="pw">password: {user.password}</div>
                <div className="confirm-pw">
                    confirm password: {user.confirmPassword}
                </div>
            </div>
        </>
    );
}
