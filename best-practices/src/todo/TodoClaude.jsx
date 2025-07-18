import { useState, useMemo } from "react";
import {
    Plus,
    Search,
    Filter,
    Calendar,
    AlertCircle,
    Check,
    X,
    Edit2,
    Save,
} from "lucide-react";

const TodoApp = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: "Complete project proposal",
            completed: false,
            priority: "high",
            category: "work",
            date: "2024-07-20",
        },
        {
            id: 2,
            text: "Buy groceries",
            completed: true,
            priority: "medium",
            category: "personal",
            date: "2024-07-18",
        },
        {
            id: 3,
            text: "Call dentist",
            completed: false,
            priority: "low",
            category: "health",
            date: "2024-07-25",
        },
        {
            id: 4,
            text: "Review code changes",
            completed: false,
            priority: "high",
            category: "work",
            date: "2024-07-19",
        },
        {
            id: 5,
            text: "Plan weekend trip",
            completed: false,
            priority: "medium",
            category: "personal",
            date: "2024-07-30",
        },
    ]);

    const [newTodo, setNewTodo] = useState("");
    const [newPriority, setNewPriority] = useState("medium");
    const [newCategory, setNewCategory] = useState("personal");
    const [newDate, setNewDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortBy, setSortBy] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const addTodo = () => {
        if (newTodo.trim()) {
            const todo = {
                id: Date.now(),
                text: newTodo.trim(),
                completed: false,
                priority: newPriority,
                category: newCategory,
                date: newDate || new Date().toISOString().split("T")[0],
            };
            setTodos([...todos, todo]);
            setNewTodo("");
            setNewDate("");
        }
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const saveEdit = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: editText } : todo
            )
        );
        setEditingId(null);
        setEditText("");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText("");
    };

    const filteredAndSortedTodos = useMemo(() => {
        let filtered = todos.filter((todo) => {
            const matchesSearch = todo.text
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesStatus =
                filterStatus === "all" ||
                (filterStatus === "completed" && todo.completed) ||
                (filterStatus === "pending" && !todo.completed);
            const matchesPriority =
                filterPriority === "all" || todo.priority === filterPriority;
            const matchesCategory =
                filterCategory === "all" || todo.category === filterCategory;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority &&
                matchesCategory
            );
        });

        filtered.sort((a, b) => {
            let aVal, bVal;

            switch (sortBy) {
                case "text":
                    aVal = a.text.toLowerCase();
                    bVal = b.text.toLowerCase();
                    break;
                case "priority":
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    aVal = priorityOrder[a.priority];
                    bVal = priorityOrder[b.priority];
                    break;
                case "category":
                    aVal = a.category.toLowerCase();
                    bVal = b.category.toLowerCase();
                    break;
                case "date":
                default:
                    aVal = new Date(a.date);
                    bVal = new Date(b.date);
                    break;
            }

            if (sortOrder === "asc") {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        return filtered;
    }, [
        todos,
        searchTerm,
        filterStatus,
        filterPriority,
        filterCategory,
        sortBy,
        sortOrder,
    ]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "text-red-600 bg-red-50";
            case "medium":
                return "text-yellow-600 bg-yellow-50";
            case "low":
                return "text-green-600 bg-green-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "high":
                return <AlertCircle className="w-4 h-4" />;
            case "medium":
                return <Calendar className="w-4 h-4" />;
            case "low":
                return <Check className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const stats = {
        total: todos.length,
        completed: todos.filter((t) => t.completed).length,
        pending: todos.filter((t) => !t.completed).length,
        high: todos.filter((t) => t.priority === "high").length,
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Advanced Todo List
                </h1>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.total}
                        </div>
                        <div className="text-sm text-blue-500">Total</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {stats.completed}
                        </div>
                        <div className="text-sm text-green-500">Completed</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.pending}
                        </div>
                        <div className="text-sm text-orange-500">Pending</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {stats.high}
                        </div>
                        <div className="text-sm text-red-500">
                            High Priority
                        </div>
                    </div>
                </div>

                {/* Add Todo Form */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Add New Todo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Enter todo..."
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 lg:col-span-2"
                            onKeyPress={(e) => e.key === "Enter" && addTodo()}
                        />
                        <select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                        <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="health">Health</option>
                            <option value="shopping">Shopping</option>
                        </select>
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={addTodo}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Todo
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Search & Filter
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search todos..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Categories</option>
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="health">Health</option>
                            <option value="shopping">Shopping</option>
                        </select>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="text">Sort by Text</option>
                            <option value="priority">Sort by Priority</option>
                            <option value="category">Sort by Category</option>
                        </select>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                {/* Todo List */}
                <div className="space-y-4">
                    {filteredAndSortedTodos.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p>No todos found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredAndSortedTodos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`p-4 rounded-lg border-l-4 transition-all duration-200 ${
                                    todo.completed
                                        ? "bg-gray-50 border-gray-300 opacity-75"
                                        : "bg-white border-blue-400 shadow-sm hover:shadow-md"
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        <button
                                            onClick={() => toggleTodo(todo.id)}
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                todo.completed
                                                    ? "bg-green-500 border-green-500 text-white"
                                                    : "border-gray-300 hover:border-green-500"
                                            }`}
                                        >
                                            {todo.completed && (
                                                <Check className="w-4 h-4" />
                                            )}
                                        </button>

                                        <div className="flex-1">
                                            {editingId === todo.id ? (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={editText}
                                                        onChange={(e) =>
                                                            setEditText(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onKeyPress={(e) =>
                                                            e.key === "Enter" &&
                                                            saveEdit(todo.id)
                                                        }
                                                    />
                                                    <button
                                                        onClick={() =>
                                                            saveEdit(todo.id)
                                                        }
                                                        className="text-green-600 hover:text-green-800 p-1"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="text-gray-600 hover:text-gray-800 p-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p
                                                        className={`font-medium ${
                                                            todo.completed
                                                                ? "line-through text-gray-500"
                                                                : "text-gray-800"
                                                        }`}
                                                    >
                                                        {todo.text}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(
                                                                todo.priority
                                                            )}`}
                                                        >
                                                            {getPriorityIcon(
                                                                todo.priority
                                                            )}
                                                            {todo.priority}
                                                        </span>
                                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                                            {todo.category}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(
                                                                todo.date
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {editingId !== todo.id && (
                                            <button
                                                onClick={() => startEdit(todo)}
                                                className="text-blue-600 hover:text-blue-800 p-1"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => removeTodo(todo.id)}
                                            className="text-red-600 hover:text-red-800 p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Results Info */}
                {filteredAndSortedTodos.length > 0 && (
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Showing {filteredAndSortedTodos.length} of{" "}
                        {todos.length} todos
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoApp;
