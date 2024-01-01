import React from "react";

export default function Input({ id, label, type, ...rest }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                {...rest}
                type={type}
                className="w-full px-4 py-2 rounded-full border focus:outline-none focus:border-sky-500 focus:shadow-lg focus:shadow-sky-100 mt-1"
            />
        </>
    );
}
