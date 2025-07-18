export default function TodoApp() {
    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 text-center">
                    <h1 className="text-3xl font-light mb-2">My Todo List</h1>
                    <p className="opacity-90 text-sm">
                        Keep track of your daily tasks
                    </p>
                </div>

                {/* Add Todo Section */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-base outline-none focus:border-indigo-500 transition-colors"
                            placeholder="What needs to be done?"
                        />
                        <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg text-base hover:bg-indigo-600 transition-colors">
                            Add Task
                        </button>
                    </div>
                </div>

                {/* Todo List */}
                <div className="divide-y divide-gray-100">
                    {/* Completed Todo Item */}
                    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                        <div className="w-5 h-5 bg-indigo-500 rounded border-2 border-indigo-500 mr-4 flex items-center justify-center">
                            <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 text-base text-gray-500 line-through">
                            Complete the project proposal
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors">
                                Edit
                            </button>
                            <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Pending Todo Item */}
                    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded mr-4"></div>
                        <div className="flex-1 text-base text-gray-700">
                            Review client feedback
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors">
                                Edit
                            </button>
                            <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Another Pending Todo Item */}
                    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded mr-4"></div>
                        <div className="flex-1 text-base text-gray-700">
                            Prepare for team meeting
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors">
                                Edit
                            </button>
                            <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Another Completed Todo Item */}
                    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                        <div className="w-5 h-5 bg-indigo-500 rounded border-2 border-indigo-500 mr-4 flex items-center justify-center">
                            <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="flex-1 text-base text-gray-500 line-through">
                            Buy groceries
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors">
                                Edit
                            </button>
                            <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Final Pending Todo Item */}
                    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded mr-4"></div>
                        <div className="flex-1 text-base text-gray-700">
                            Call the dentist
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm hover:bg-gray-200 transition-colors">
                                Edit
                            </button>
                            <button className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between text-sm text-gray-600">
                    <span>5 tasks total</span>
                    <span>2 completed, 3 remaining</span>
                </div>
            </div>
        </div>
    );
}
