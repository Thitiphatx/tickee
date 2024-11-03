"use client"

import React from "react";
import { useState } from "react";

interface TabProps {
    children: React.ReactNode;
    setCurrentTab: (tab: number) => void;
    currentTab: number;
    onTabChange: () => void;
}

export default function Selector({ children, setCurrentTab, currentTab ,onTabChange}: TabProps) {
    const handleClick = (seatId: number) => {
        setCurrentTab(seatId); // Set the current tab
        onTabChange(); // Call the function to hide ticket info
    };

    return (
        <div>
            <ul className="space-y-2 p-5">
                {React.Children.map(children, (child) => {
                    const { key } = (child as React.ReactElement); // Get the seatId from child props
                    return (
                        <li
                            key={key} // Use key as key
                            className={`cursor-pointer rounded-xl ring-foreground-900 ${currentTab === Number(key) ? "ring-4" : ""}`}
                            onClick={() => {
                                
                                handleClick(Number(key)); // Pass the seatId directly to the parent
                            }}
                        >
                            {child}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

