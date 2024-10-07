"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { DeleteIcon, PlusIcon } from "../icons";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";


export default function BusinessAdjustment() {
    const [display, setDisplay] = useState(false);
    const [banner, setBanner] = useState<string[] | null>([]);
    const [newImage, setNewImage] = useState<string>("");
    const [fee, setFee] = useState<number>(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/admin/business');
                const data = await res.json();
                setBanner(data.banner_images || null);
                setFee(data.fee || 0)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    if (banner == null) {
        console.log("error banner")
    }

    const deleteClick = (idx: number) => {
        if (banner != null) {
            const newArray = banner.filter((_, index) => index !== idx);
            setBanner(newArray)
        }
    };

    const insertNewBanner = () => {
        setDisplay(true);
    };

    const updateNewBanner = () => {
        if (banner != null) {
            const newArray = [...banner]
            newArray.push(newImage)
            setBanner(newArray)
            setDisplay(false);
        }
    };

    const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFee(Number(e.target.value));
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewImage(e.target.value);
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/business', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ banner, fee }),
            });
        } catch (error) {
            console.error('Error Upload banner:', error);
        }

        setDisplay(false)
    };

    return (
        <div className='flex flex-col items-center py-10'>
            <h1 className="font-bold text-inherit uppercase text-3xl">Banners</h1>
            <div className="flex flex-col items-center gap-2 w-full my-10 p-10 bg-opacity-30 bg-gray-500 rounded-2xl">

                {banner?.map((src, index) => (
                    <div key={index} className='relative'>
                        <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(index)}>
                            <DeleteIcon />
                        </span>
                        <img src={src} style={{ width: '100%', height: 'auto' }} />
                    </div>
                ))}
                <div onClick={insertNewBanner} className='size-1/4'>
                    {!display && (
                        <PlusIcon className='size-full' />
                    )}

                    {display && (
                        <div className='flex flex-col items-center size-full'>
                            <input className='size-full' type="text" value={newImage} onChange={handleImageInputChange} />
                            <button className='size-full' onClick={updateNewBanner}>submit</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
            <h1 className="font-bold text-inherit uppercase text-3xl">Fee</h1>
                <input type="number" value={fee} onChange={handleFeeChange} />
                <button onClick={handleSubmit}>submit</button>
            </div>
        </div>

    )
};
