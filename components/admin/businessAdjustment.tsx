"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { DeleteIcon, PlusIcon } from "../icons";
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
            setNewImage("")
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
            <div className="flex flex-col items-center gap-2 w-full my-10 p-10 bg-opacity-20 bg-gray-600 rounded-2xl">

                {banner?.map((src, index) => (
                    <div key={index} className='relative'>
                        <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(index)}>
                            <DeleteIcon />
                        </span>
                        <img src={src} style={{ width: '100%', height: 'auto' }} />
                    </div>
                ))}
                <div onClick={insertNewBanner} className='flex justify-center h-1/3 w-3/4 p-5'>
                    {!display && (
                        <PlusIcon className='size-52' />
                    )}

                    {display && (
                        <div className='flex flex-col items-center gap-3 size-full'>
                            <Input onChange={handleImageInputChange} value={newImage} type="text" label="Image URL" />
                            <Button onClick={updateNewBanner} color='primary' variant='shadow' className="uppercase w-full" radius="full">insert</Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center gap-5 w-2/5">
                <h1 className="font-bold text-inherit uppercase text-3xl">Fee</h1>
                <Input onChange={handleFeeChange} labelPlacement='outside' size='lg' type="number" value={fee.toString()} label="Fee Charge Per Reservation" endContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-medium">$</span>
                    </div>
                } />
                <Button onClick={handleSubmit} color='primary' variant='shadow' className="uppercase w-full" radius="full">submit</Button>
            </div>
        </div>

    )
};
