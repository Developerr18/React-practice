import { useState } from "react";
import { data } from "./data";

export default function Accordian() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multipleSelected, setMultipleSelected] = useState([]);

    function handleSingleSelection(currentId) {
        setSelected(currentId === selected ? null : currentId);
    }

    function handleMultiSelection(currentId) {
        if (multipleSelected.includes(currentId)) {
            setMultipleSelected(
                multipleSelected.filter((id) => id !== currentId)
            );
        } else {
            setMultipleSelected([...multipleSelected, currentId]);
        }
    }

    return (
        <div className="wrapper">
            <button
                onClick={() => setEnableMultiSelection(!enableMultiSelection)}
                className="bg-black text-white px-2 py-1 cursor-pointer mb-5"
            >
                {enableMultiSelection
                    ? "Enable Single selection"
                    : "Enable Multi selection"}
            </button>
            <div className="accordian">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div className="item mb-4 bg-amber-400">
                            <div
                                onClick={
                                    enableMultiSelection
                                        ? () =>
                                              handleMultiSelection(dataItem.id)
                                        : () =>
                                              handleSingleSelection(dataItem.id)
                                }
                                className="title flex justify-between px-4 py-2 text-2xl cursor-pointer mb-2"
                            >
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {selected === dataItem.id ? (
                                <div>{dataItem.answer}</div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <div>No data found</div>
                )}
            </div>
        </div>
    );
}
