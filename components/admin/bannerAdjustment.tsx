"use client"

import { Event_Type, Event, Seat_Type } from "@prisma/client";
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { DeleteIcon, PlusIcon } from "../icons";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { getBannerImages } from "@/utils/function";
import { Input } from "@nextui-org/input";


export default function BannerAdjustment() {
    const [display, setDisplay] = useState(false);
    const [banner, setBanner] = useState<string[] | null>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBannerImages();
                setBanner(response?.banner_images || null);
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
        const newArray = banner?.filter((_, index) => index !== idx);
        setBanner(newArray || banner)
    };

    const insertNewBanner = () => {
        setDisplay(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // const res = await fetch('/api/adminbutton/deleteEvent', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ id }),
            // });
        } catch (error) {
            console.error('Error Upload banner:', error);
        }

        setDisplay(false)
    };

    return (
        <>
            {/* {display && (
                <div>
                    <button
                        className="absolute z-10 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={eventDetailClose}
                    />
                    <div className="absolute z-20 w-fit top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(mapData || null)}>
                            <DeleteIcon />
                        </span>
                        <Card className="grid grid-cols-1 lg:grid-cols-2">
                            <CardHeader className="w-full flex justify-center items-center">
                                <Image className="" width={"100%"} src={mapData?.event_images} />
                            </CardHeader>
                            <CardBody className="flex flex-col justify-between">
                                <div className="space-y-3">
                                    <h1 className="text-xl font-bold">{mapData?.event_name}</h1>
                                    <div className="flex flex-row">
                                        <Chip size="sm" className="">{mapData?.event_type.et_name}</Chip>
                                    </div>

                                    <div className='p-2' dangerouslySetInnerHTML={{ __html: mapData?.event_intro || "" }} />
                                </div>
                                <div>
                                    <h2 className="uppercase font-bold">Ticket</h2>
                                    <div className="max-w-md">
                                        {mapData?.Seat_Type.map((seat, index) => (
                                            <div key={seat.seat_id}>
                                                <h4 className="text-medium font-medium">{seat.seat_name}</h4>
                                                <p className="text-small text-default-400">฿ {seat.seat_price}</p>
                                                {index !== mapData?.Seat_Type.length - 1 && (
                                                    <Divider className="my-4" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )} */}

            {/* {deleteAlert && (
                <form onSubmit={handleDelete}>
                    <button
                        className="absolute z-30 bg-white opacity-30 size-full  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={deleteClose}
                    />
                    <Card className="absolute z-40 w-1/3 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <CardHeader className="bg-foreground bg-opacity-10">
                            <h1 className="mx-auto text-3xl font-bold uppercase">Delete</h1>
                        </CardHeader>
                        <CardBody className="overflow-hidden">
                            <div className="flex flex-col justify-center items-center gap-2 p-5 w-full h-56">
                                <span className="uppercase font-semibold text-xl">Are You Sure ?</span>
                                <p className="text-danger text-lg">
                                    <span>Delete </span>
                                    {mapData?.event_name}
                                    <span> from Event ?</span>
                                </p>
                            </div>
                            <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                        </CardBody>
                    </Card>
                </form>
            )} */}
            <form className="flex flex-col items-center gap-2 w-full">
                {banner?.map((src, index) => (
                    <div key={index}>
                        <span className="absolute right-5 top-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50" onClick={() => deleteClick(index)}>
                            <DeleteIcon />
                        </span>
                        <img src={src} style={{ width: '100%', height: 'auto' }} />
                    </div>
                ))}
                <div onClick={insertNewBanner}>
                    {display && (
                        <h1>input box</h1>
                    )}

                    {!display && (
                        <PlusIcon />
                    )}
                </div>
                <button>submit</button>
            </form>
        </>

    )
};
