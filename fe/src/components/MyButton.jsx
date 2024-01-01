import React from "react";

export default function MyButton({ title, ...rest }) {
    return (
        <button
            className="bg-sky-600 w-full px-4 py-2 rounded-full text-white hover:bg-sky-500"
            {...rest}
        >
            {title}
        </button>
    );
}
