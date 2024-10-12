"use server"

import AddEventForm from "@/components/AddEventForm"
import { prisma } from "@/prisma/seed";
import { getCurrentSession } from "@/utils/getCurrentSession";
import { redirect } from "next/navigation";

export default async function Addevent() {
    const session = await getCurrentSession(); // Server Session
    console.log(session)
    if (!session || session.user.role !== "organizer") {
        redirect("/");
    }

    const eventType = await prisma.event_Type.findMany();
    return (

        <div >
            <h1 className="text-2xl font-bold mb-4">Create Event</h1>

            <div className="flex w-full ">
                <div className="flex pr-4 items-center ps-4 border border-gray-200 rounded dark:border-gray-700 ">
                    <input id="bordered-radio-1" onChange={handleChange} type="radio" value="1" name="bordered-radio" className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Concert</label>
                </div>
                <div className="flex pr-4 items-center ml-5 ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input id="bordered-radio-2" onChange={handleChange} type="radio" value="2" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Entertainment</label>
                </div>
                <div className="flex pr-4 items-center ml-5 ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input id="bordered-radio-2" onChange={handleChange} type="radio" value="3" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sport</label>
                </div>
                <div className="flex pr-4 items-center ml-5 ps-4 border border-gray-200 rounded dark:border-gray-700">
                    <input id="bordered-radio-2" onChange={handleChange} type="radio" value="4" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-Sport</label>
                </div>
            </div>


            <div className="mt-2">
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
                <div className="rounded-md border-1 p-4 ring-gray-300">
                    <TextEditor setContent={setevent_intro} />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400 ">เขียนเชิญชวนผู้มาเข้างาน</p>
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
                <label className="block mb-2 text-sm font-medium leading-6 w-40 ">Event location</label>
                <input
                    type="text"
                    className="w-2/4 p-2 border ml-5 border-gray-300 rounded"
                    placeholder="สถานที่จัดงาน"
                    value={event_location.address}
                    onChange={handleChangeAddress}
                    required
                />
                <input
                    type="text"
                    className="w-1/4 p-2 border ml-5 border-gray-300 rounded"
                    placeholder="จังหวัด"
                    value={event_location.city}
                    onChange={handleChangeCity}
                    required
                />
                <input
                    type="text"
                    className="w-2/4 p-2 border ml-5 border-gray-300 rounded"
                    placeholder="ประเทศ"
                    value={event_location.country}
                    onChange={handleChangeCountry}
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
                <div className="rounded-md border-1 p-4 ring-gray-300">
                    <TextEditor setContent={setevent_description} />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">เขียนรายละเอียดเกี่ยวกับตั๋วและโปรโมชั่น</p>
            </div>


            <button onClick={addtodb} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Submit</button>

        </div>
    )
}