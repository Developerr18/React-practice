export function ThinkingInReact() {
    return (
        <div>
            <h1>Thinking in React</h1>
            <p>This is a guide to help you think in React.</p>
            <ul>
                <li>Break the UI into components</li>
                <li>Build a static version in React</li>
                <li>Identify the minimal representation of UI state</li>
                <li>Identify where your state should live</li>
                <li>Add inverse data flow</li>
            </ul>
        </div>
    );
}

export default function ExampleApp() {
    return <FilterableProductTable products={PRODUCTS} />;
}

function FilterableProductTable({ products }) {
    return (
        <div className="m-4">
            <SearchBar />
            <ProductTable products={products} />
        </div>
    );
}

function SearchBar() {
    return (
        <form>
            <input className="border" type="text" placeholder="Search..." />
            <p>
                <input type="checkbox" /> Only show products in stock
            </p>
        </form>
    );
}

function ProductTable({ products }) {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    key={product.category}
                    category={product.category}
                />
            );
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
    });

    return (
        <table className="border-collapse border border-gray-300 mt-4">
            <thead>
                <tr>
                    <th className="border border-gray-300 w-40">Name</th>
                    <th className="border border-gray-300 w-12">Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan={2}>{category}</th>
        </tr>
    );
}

function ProductRow({ product }) {
    const name = product.stocked ? (
        product.name
    ) : (
        <span style={{ color: "red" }}>{product.name}</span>
    );

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
