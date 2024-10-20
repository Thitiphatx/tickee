"use client"

import { useState } from "react";

interface SearchFunction {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdminSearchbar({ searchText, setSearchText }: SearchFunction) {
    const [input, setInput] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearchText(input)
    };
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
            <input
                type="text"
                name="input"
                className="size-full rounded-md focus:outline-none py-3 px-5 text-sm"
                placeholder="Search"
                defaultValue={searchText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            />
            </form>
        </div>
    )
};
