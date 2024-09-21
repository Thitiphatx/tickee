"use client"
import { ChangeEvent, useState } from "react"
import { DateRangePicker } from "@nextui-org/date-picker";
import { parseZonedDateTime } from "@internationalized/date";
import { Input } from "@nextui-org/input";
import { addEvent } from "./add";


export default function Addevent() {
    const [event_name, setevent_name] = useState('');
    const [event_intro, setevent_intro] = useState('');
    const [event_description, setevent_description] = useState('');
    const [eventimageURL, seteventimageURL] = useState('');
    const [event_location, setevent_location] = useState('');
    const startDateTime = parseZonedDateTime("2024-04-01T00:45[Asia/Bangkok]");
    const endDateTime = parseZonedDateTime("2024-04-08T11:15[Asia/Bangkok]");


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


    
    const addtodb = async () => {
        console.log("name :", event_name)
        console.log("intro :", event_intro)
        console.log("image :", eventimageURL)
        console.log("location :", event_location)
        console.log("seat :", seat)
        console.log("des:", event_description)
        const startDateTimeISO = startDateTime.toDate().toISOString();
        const endDateTimeISO = endDateTime.toDate().toISOString();

       const data ={
            event_name: event_name,
            event_intro: event_intro,
            event_description: event_description,
            event_images: eventimageURL,
            event_start_date: startDateTimeISO,
            event_last_date: endDateTimeISO,
            event_location: event_location,
            event_seat_per_order:5,
            producer_id:'cm1br2mq90000sx6uk2ihuaoy',
            event_type_id:1,
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
                        seat_create_date:startDateTimeISO,
                        seat_due_date:endDateTimeISO,
                        event_seat_id:eventId
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


    return (

        <div >

            <h1 className="text-2xl font-bold mb-4">Create Event</h1>


            <div>
                <label className="block mb-2 text-sm font-medium leading-6 ">Event name</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="ชื่องานหรือกิจกรรม"
                    value={event_name}
                    onChange={(e) => setevent_name(e.target.value)}
                    required
                />
            </div>

            <div className="mt-2">
                <label className="block mb-2 text-sm font-medium leading-6 ">
                    Introduction
                </label>
                <div className="mt-2">
                    <textarea

                        name="intro"
                        rows={3}
                        className="text-white p-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={event_intro}
                        onChange={(e) => setevent_intro(e.target.value)}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">เขียนเชิญชวนผู้มาเข้างาน</p>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div>
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 ">
                    Event photo
                </label>


                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white-900/25 px-6 py-6" >
                    {eventimageURL ? (
                        <div className="relative">
                            <img src={eventimageURL} alt="Event" className="max-w-full h-auto" />
                            <label
                                htmlFor="url-change"
                                className="absolute bottom-0 right-0 cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                <input
                                    id="url-change"
                                    name="url-change"
                                    type="text"
                                    placeholder="Change image URL"
                                    className="block w-full text-center mt-2 border rounded-md"
                                    onChange={(e) => seteventimageURL(e.target.value)} // Add your URL change logic
                                />
                            </label>

                        </div>

                    ) : (
                        <div className="text-center">
                            <input
                                type="text"
                                placeholder="Paste image URL"
                                className="block w-full border p-2 mt-2 rounded-md"
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


            <div className="mt-4 flex flex-row">
                <label className="block mb-2 text-sm font-medium leading-6 ">Event location</label>
                <input
                    type="text"
                    className="w-2/4 p-2 border ml-5 border-gray-300 rounded"
                    placeholder="สถานที่จัดงาน"
                    value={event_location}
                    onChange={(e) => setevent_location(e.target.value)}
                    required
                />

            </div>
            <div className="mt-4 border-1 rounded-md p-3">

                <h1 className=" font-bold mb-4">ประเภทของบัตร/ตั๋ว</h1>

                {seat.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_10fr_10fr_1fr] text-sm w-full py-2 items-center'>
                        <div className='ml-2'>{index + 1}</div>
                        <div className="pr-4 flex w-full">
                            <input
                                type="text"
                                className=" w-80 p-2 border border-gray-300 rounded"
                                value={seat[index].seat_name}
                                onChange={(e) => handleseatInputChange(e, index, 'seat_name')}
                                placeholder="ชื่อที่นั่งหรือประเภท"
                            />

                            <input
                                type="number"
                                className=" ml-4 w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => handleseatInputChange(e, index, 'seat_price')}
                                placeholder="ราคา"
                            />

                            <input
                                type="number"
                                className="ml-4 w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => handleseatInputChange(e, index, 'seat_max')}
                                placeholder="จำนวนที่เปิดขาย"
                            />


                        </div>

                        {
                            index > 0 && (
                                <button
                                    className=' grid place-items-center h-10 w-10 bg-rose-500 text-white hover:bg-white hover:text-rose-500 shadow-lg duration-300 rounded-md cursor-pointer border-none outline-none'
                                    type="button"
                                    onClick={() => removeSeat(index)}
                                >
                                    ลบ
                                </button>
                            )
                        }

                    </div>
                ))}

                <div className='flex items-center justify-between mt-5'>
                    <button onClick={addseatfields} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Add
                    </button>
                </div>





            </div>

            <div className="mt-2">
                <label className="block mb-2 text-sm font-medium leading-6 ">
                    Event description
                </label>
                <div className="mt-2">
                    <textarea

                        name="descript"
                        rows={10}
                        className="text-white p-2 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={event_description}
                        onChange={(e) => setevent_description(e.target.value)}
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">เขียนรายละเอียดเกี่ยวกับตั๋วและโปรโมชั่น</p>
            </div>


            <button onClick={addtodb} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Submit</button>

        </div>
    )
}