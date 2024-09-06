"use client"

import React from "react";
import { useState } from "react";

interface TabProps {
    children: React.ReactNode;
    setCurrentTab: (tab: number) => void;
    currentTab: number;
}

export default function Selector({ children, setCurrentTab, currentTab }: TabProps) {
    const [activeTab, setActiveTab] = useState(currentTab || 0); // Set initial active tab
    
    const handleClick = (index: number) => {
        setActiveTab(index);
        if (setCurrentTab) {
            setCurrentTab(index); // Pass the selected tab index to the parent component if provided
        }
    };

    return (
        <div className="">
        <ul className="space-y-2 p-5">
        {React.Children.map(children, (child, index) => (
            <li
                key={index}
                className={`cursor-pointer rounded-xl ring-white ${activeTab === index ? "ring-1" : ""}`}
                onClick={() => handleClick(index)}
            >
            {child}
            </li>
        ))}
        </ul>
        </div>
    )
}
