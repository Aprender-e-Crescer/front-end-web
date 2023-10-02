import React from "react"
interface Props {
    children:React.ReactNode;
    type?: "submit" | "button";
}

export default function Button({ type, children}:Props) {
    return (
    <button
    type={type}
        className="p-2 w-full rounded-sm bg-slate-700 shadow-lg text-zinc-100">

    {children}</button>
    );
}