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
        <div>
            <SearchBar />
            <ProductTable products={products} />
        </div>
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
