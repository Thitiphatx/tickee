"use client"

import { useState } from "react";

interface SearchFunction {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdminSearchbar({ searchText, setSearchText }: SearchFunction) {
    const [input, setInput] = useState<string>("");
    const searchREGEX = /[A-z\u0E00-\u0E7F0-9 ]+/g;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSearchText((input.match(searchREGEX)||[]).join(" "))
    };
    return (
        <div className="w-2/3 min-w-72">
            <form onSubmit={handleSubmit} className="w-full">
            <input
                type="text"
                name="input"
                className="size-full rounded-md focus:outline-none py-3 px-5 text-sm"
                placeholder="Search"
                defaultValue={searchText}
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let temp = (e.target.value.match(searchREGEX)||[]).join(" ")
                    setInput(temp)
                    
                }}
            />
            </form>
        </div>
    )
};
