"use client"
import { useState } from "react"
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseZonedDateTime } from "@internationalized/date";
import TextEditor from "@/components/texteditor";
import { Select, SelectItem } from "@nextui-org/select";
import { Event_Type } from "@prisma/client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { DeleteIcon } from "./icons";
import { useSession } from "next-auth/react";


export default function AddEventForm({ eventType }: { eventType: Event_Type[]}) {
    const {data: session} = useSession();
    const [event_name, setevent_name] = useState('');
    const [event_intro, setevent_intro] = useState('');
    const [event_description, setevent_description] = useState('');
    const [eventimageURL, seteventimageURL] = useState('');



    const [startDateTime, setStartDateTime] = useState(parseZonedDateTime("2024-04-01T00:45[Asia/Bangkok]"));
    const [endDateTime, setEndDateTime] = useState(parseZonedDateTime("2024-04-08T11:15[Asia/Bangkok]"));



    interface EventLocation {
        address: string;
        city: string;
        country: string;
    }

    const [event_location, setevent_location] = useState<EventLocation>({
        address: '',
        city: '',
        country: ''
    });

    interface seatdata {
        seat_name: string;
        seat_price: number;
        seat_max: number;
    }

    const [seat, setseat] = useState<seatdata[]>(
        [{
            seat_name: "",
            seat_price: 0,
            seat_max: 0
        }]);



    const removeSeat = (indexToRemove: any) => {
        const updatedSeats = [...seat];

        // Remove the item at the specified index
        updatedSeats.splice(indexToRemove, 1);

        // Update the state with the modified array
        setseat(updatedSeats);
    };

    const addseatfields = () => {
        setseat([
            ...seat, // คัดลอกข้อมูลที่มีอยู่แล้ว
            {
                seat_name: "",
                seat_price: 0,
                seat_max: 0
            }
        ]);
    }
    const handleseatInputChange = (e, index, field) => {
        let value;

        if (field === 'seat_price' || field === 'seat_max') {
            value = parseInt(e.target.value);
        } else {
            value = e.target.value;
        }

        const updatedSeats = [...seat];
        updatedSeats[index] = { ...updatedSeats[index], [field]: value };

        setseat(updatedSeats);
    };


    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setevent_location((prev) => ({
            ...prev,
            address: e.target.value,
        }));
    };

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setevent_location((prev) => ({
            ...prev,
            city: e.target.value,
        }));
    };

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setevent_location((prev) => ({
            ...prev,
            country: e.target.value,
        }));
    };

    const addtodb = async () => {
        console.log("name :", event_name)
        console.log("intro :", event_intro)
        console.log("image :", eventimageURL)
        console.log("location :", event_location)
        console.log("seat :", seat)
        console.log("des:", event_description)
        const startDateTimeISO = startDateTime.toDate().toISOString();
        const endDateTimeISO = endDateTime.toDate().toISOString();


        const data = {
            event_name: event_name,
            event_intro: event_intro,
            event_description: event_description,
            event_images: eventimageURL,
            event_start_date: startDateTimeISO,
            event_last_date: endDateTimeISO,
            event_location: JSON.stringify(event_location),
            event_seat_per_order: 5,
            producer_id: session?.user.id,
            event_type_id: parseInt(selectedeventTypeValue),
        }

        try {
            const response = await fetch('/api/addevent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create event');
            }

            const result = await response.json();
            console.log('event created successfully:', result);


            const eventId = result.event_id; //11
            await Promise.all(
                seat.map(async (seatItem) => {
                    const seatData = {
                        seat_name: seatItem.seat_name,
                        seat_price: seatItem.seat_price,
                        seat_max: seatItem.seat_max,
                        seat_create_date: startDateTimeISO,
                        seat_due_date: endDateTimeISO,
                        event_seat_id: eventId
                    };
                    // Send a POST request to insert the seat into the seat table
                    const seatResponse = await fetch('/api/addseat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(seatData),
                    });

                    if (!seatResponse.ok) {
                        throw new Error('Failed to add seat');
                    }

                    const result = await seatResponse.json();
                    console.log('seat created successfully:', result);
                })
            );

        } catch (error) {
            console.error('Error creating eventandseat:', error);
        }
    }

    const [selectedeventTypeValue, setselectedeventTypeValue] = useState("1");

    // Step 3: Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedeventTypeValue(event.target.value); // Update state with the selected value
    };


    return (

        <div className="space-y-8">
                <Select
                    label="Event category"
                    labelPlacement="outside"
                    placeholder="เลือกประเภทของกิจกรรม"
                    selectedKeys={[selectedeventTypeValue]}
                    onChange={handleChange}
                >
                    
                    {eventType.map((type, index)=> (
                        <SelectItem key={type.et_id} >
                            {type.et_name}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    label="Event name"
                    labelPlacement="outside"
                    type="text"
                    placeholder="ชื่องานหรือกิจกรรม"
                    value={event_name}
                    onChange={(e) => setevent_name(e.target.value)}
                    required
                />

            <div>
                <label className="block mb-2 text-sm font-medium leading-6 ">
                    Introduction
                </label>
                <TextEditor setContent={setevent_intro} />
                <p className="mt-3 text-sm leading-6 text-gray-400 ">เขียนเชิญชวนผู้มาเข้างาน</p>
            </div>

            <div>
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 ">
                    Event photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-foreground-200 px-6 py-6" >
                    {eventimageURL ? (
                        <div className="relative">
                            <img src={eventimageURL} alt="Event" className="max-w-full h-auto" />
                            <label
                                htmlFor="url-change"
                                className="absolute bottom-0 right-0 cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                <Input
                                    id="url-change"
                                    name="url-change"
                                    type="text"
                                    placeholder="Change image URL"
                                    onChange={(e) => seteventimageURL(e.target.value)} // Add your URL change logic
                                />
                            </label>

                        </div>

                    ) : (
                        <div className="text-center">
                            <Input
                                type="text"
                                placeholder="Paste image URL"
                                onChange={(e) => seteventimageURL(e.target.value)} // Add your URL change logic
                            />
                            <p className="text-xs leading-5 text-gray-600 mt-2">Enter the image URL (PNG, JPG, GIF)</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full max-w-xl flex flex-row gap-4 mt-5">
                <DateRangePicker
                    label="ระยะเวลา Event"
                    hideTimeZone
                    visibleMonths={2}
                    defaultValue={{
                        start: startDateTime,
                        end: endDateTime,
                    }}
                />
            </div>

            <label>Event location</label>
            <div className="flex flex-row gap-5">
                <Input
                    type="text"
                    placeholder="สถานที่จัดงาน"
                    value={event_location.address}
                    onChange={handleChangeAddress}
                    required
                />
                <Input
                    type="text"
                    placeholder="จังหวัด"
                    value={event_location.city}
                    onChange={handleChangeCity}
                    required
                />
                <Input
                    type="text"
                    placeholder="ประเทศ"
                    value={event_location.country}
                    onChange={handleChangeCountry}
                    required
                />

            </div>
            <div className="mt-4 rounded-md p-3 ring-1 ring-foreground-200">
            <h1 className="font-bold mb-4">ประเภทของบัตร/ตั๋ว</h1>

                {seat.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_10fr_10fr_1fr] text-sm w-full py-2 items-center'>
                        <div className='ml-2'>{index + 1}</div>
                        <div className="flex flex-row gap-2 w-full">
                            <Input
                                type="text"
                                value={seat[index].seat_name}
                                onChange={(e) => handleseatInputChange(e, index, 'seat_name')}
                                placeholder="ชื่อที่นั่งหรือประเภท"
                            />

                            <Input
                                type="number"
                                onChange={(e) => handleseatInputChange(e, index, 'seat_price')}
                                placeholder="ราคา"
                            />

                            <Input
                                type="number"
                                onChange={(e) => handleseatInputChange(e, index, 'seat_max')}
                                placeholder="จำนวนที่เปิดขาย"
                            />


                        </div>

                        {
                            index > 0 && (
                                <Button isIconOnly color="danger" type="button" onClick={() => removeSeat(index)}>
                                    <DeleteIcon width="1rem" height="1rem" />
                                </Button>
                            )
                        }

                    </div>
                ))}

                <div className='flex items-center justify-between mt-5'>
                    <Button color="primary" onClick={addseatfields}>เพิ่มอีก</Button>
                </div>
            </div>

            <label className="block mb-2 text-sm font-medium leading-6 ">
                Event description
            </label>
            <TextEditor setContent={setevent_description} />
            <p className="mt-3 text-sm leading-6 text-gray-400">เขียนรายละเอียดเกี่ยวกับตั๋วและโปรโมชั่น</p>


            <Button onClick={addtodb}>Submit</Button>

        </div>
    )
}