"use client"
import { useEffect, useState } from "react"
import { DateRangePicker } from "@nextui-org/date-picker";
import { CalendarDate, CalendarDateTime, parseZonedDateTime, ZonedDateTime } from "@internationalized/date";
import TextEditor from "@/components/texteditor";
import { Select, SelectItem } from "@nextui-org/select";
import { Event_Type } from "@prisma/client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { DeleteIcon } from "./icons";
import { useSession } from "next-auth/react";


export default function AddEventForm({ eventType }: { eventType: Event_Type[] }) {
    const { data: session } = useSession();
    const [event_name, setevent_name] = useState('');
    const [event_intro, setevent_intro] = useState('');
    const [event_description, setevent_description] = useState('');
    const [eventimageURL, seteventimageURL] = useState('');


    const [dateRange, setDateRange] = useState({
        start: parseZonedDateTime("2024-04-01T00:45[Asia/Bangkok]"),
        end: parseZonedDateTime("2024-04-08T11:15[Asia/Bangkok]"),
    });


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
        setInvalidSeatName([...invalidSeatName, true]); // เพิ่มค่า true สำหรับที่นั่งใหม่
        setSeatNameErrorMessages([...seatNameErrorMessages, 'ต้องการอักษระ 1-30 ตัวขึ้นไปสำหรับชื่อที่นั่ง']); // เพิ่ม error message สำหรับที่นั่งใหม่

        setInvalidseatprice([...invalidSeatName, true]);
        setSeatpriceErrorMessages([...seatpriceErrorMessages, 'ต้องเป็นตัวเลขหรือทศนิยม'])

        setInvalidseatMax([...invalidseatMax, true]);
        setSeatMaxErrorMessages([...seatMaxErrorMessages, 'ต้องเป็นตัวเลข'])


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

        if (field === 'seat_name') {
            const newInvalidSeatName = [...invalidSeatName];
            const newSeatNameErrorMessages = [...seatNameErrorMessages];

            if (!eventseatnameReg.test(e.target.value)) {
                newInvalidSeatName[index] = true;
                newSeatNameErrorMessages[index] = 'ต้องการอักษระ 1-30 ตัวขึ้นไปสำหรับชื่อที่นั่ง';
            } else {
                newInvalidSeatName[index] = false;
                newSeatNameErrorMessages[index] = '';
            }

            setInvalidSeatName(newInvalidSeatName);
            setSeatNameErrorMessages(newSeatNameErrorMessages);
        }
        else if (field === 'seat_price') {
            const newInvalidSeatprice = [...invalidseatprice];
            const newSeatpriceErrorMessages = [...seatpriceErrorMessages];

            if (!eventseatpriceReg.test(e.target.value)) {
                newInvalidSeatprice[index] = true;
                newSeatpriceErrorMessages[index] = 'ต้องเป็นตัวเลข';
            } else {
                newInvalidSeatprice[index] = false;
                newSeatpriceErrorMessages[index] = '';
            }

            setInvalidseatprice(newInvalidSeatprice);
            setSeatpriceErrorMessages(newSeatpriceErrorMessages);
        }
        else if (field === 'seat_max') {
            const newInvalidSeatMax = [...invalidseatMax];
            const newSeatMaxErrorMessages = [...seatMaxErrorMessages];

            if (!eventseatMaxReg.test(e.target.value)) {
                newInvalidSeatMax[index] = true;
                newSeatMaxErrorMessages[index] = 'ต้องเป็นตัวเลข';
            } else {
                newInvalidSeatMax[index] = false;
                newSeatMaxErrorMessages[index] = '';
            }

            setInvalidseatMax(newInvalidSeatMax);
            setSeatMaxErrorMessages(newSeatMaxErrorMessages);
        }


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
        if (!eventlocationAddressReg.test(e.target.value)) {
            setiseventA_Invalid(true);
            setEvent_AerrorMessage('ต้องการอักษระ 5 ตัวขึ้นไปสำหรับสถานที่และไม่ใช่ตัวเลข');

        } else {
            setiseventA_Invalid(false);
            setEvent_AerrorMessage('');

        }
        setevent_location((prev) => ({
            ...prev,
            address: e.target.value,
        }));
    };

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!eventlocationProvinceReg.test(e.target.value)) {
            setiseventlocationProvince_Invalid(true);
            setEvent_PerrorMessage('ต้องการอักษระ 4 ตัวขึ้นไปสำหรับจังหวัดและไม่ใช่ตัวเลข');

        } else {
            setiseventlocationProvince_Invalid(false);
            setEvent_PerrorMessage('');

        }

        setevent_location((prev) => ({
            ...prev,
            city: e.target.value,
        }));
    };

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!eventlocationcountryReg.test(e.target.value)) {
            setiseventlocationcountryReg_Invalid(true);
            setEvent_CerrorMessage('ต้องการอักษระ 4 ตัวขึ้นไปสำหรับประเทศและไม่ใช่ตัวเลข');

        } else {
            setiseventlocationcountryReg_Invalid(false);
            setEvent_CerrorMessage('');

        }

        setevent_location((prev) => ({
            ...prev,
            country: e.target.value,
        }));
    };
    const handleDateChange = (range: any) => {
        // อัปเดตสถานะเมื่อมีการเลือกวันที่ใหม่
        setDateRange(range);
    };

    const addtodb = async () => {

        console.log("name :", event_name)
        console.log("intro :", event_intro)
        console.log("image :", eventimageURL)
        console.log("location :", event_location)
        console.log("seat :", seat)
        console.log("des:", event_description)
        const startDateTimeISO = dateRange.start.toDate().toISOString();
        const endDateTimeISO = dateRange.end.toDate().toISOString();


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


    const eventnameReg = /^[\wก-๙#\[\]\{\}: ]{10,100}$/;
    const [isInvalid, setIsInvalid] = useState(true); // สถานะความถูกต้องของ input
    const [errorMessage, setErrorMessage] = useState('กรุณาใส่ตัวเลขหรืออักษรภาษาไทยอังกฤษ { } [ ] # :และช่องว่างเท่านั้นความยาว 10 ตัวอักษร'); // ข้อความแสดงข้อผิดพลาด

    const eventlocationAddressReg = /^[^0-9]{5,100}$/;
    const [iseventA_Invalid, setiseventA_Invalid] = useState(true); // สถานะความถูกต้องของ input
    const [Event_AerrorMessage, setEvent_AerrorMessage] = useState('ต้องการอักษระ 5 ตัวขึ้นไปสำหรับสถานที่และไม่ใช่ตัวเลข'); // ข้อความแสดงข้อผิดพลาด

    const eventlocationProvinceReg = /^[^0-9]{4,100}$/;
    const [iseventlocationProvince_Invalid, setiseventlocationProvince_Invalid] = useState(true); // สถานะความถูกต้องของ input
    const [Event_PerrorMessage, setEvent_PerrorMessage] = useState('ต้องการอักษระ 4 ตัวขึ้นไปสำหรับจังหวัดและไม่ใช่ตัวเลข'); // ข้อความแสดงข้อผิดพลาด

    const eventlocationcountryReg = /^[^0-9]{4,100}$/;
    const [iseventlocationcountryReg_Invalid, setiseventlocationcountryReg_Invalid] = useState(true); // สถานะความถูกต้องของ input
    const [Event_CerrorMessage, setEvent_CerrorMessage] = useState('ต้องการอักษระ 4 ตัวขึ้นไปสำหรับประเทศและไม่ใช่ตัวเลข'); // ข้อความแสดงข้อผิดพลาด

    const eventseatnameReg = /^.{1,30}$/;
    const [invalidSeatName, setInvalidSeatName] = useState<boolean[]>([true]);
    const [seatNameErrorMessages, setSeatNameErrorMessages] = useState<string[]>(['ต้องการอักษระ 1-30 ตัวขึ้นไปสำหรับชื่อที่นั่ง']);

    const eventseatpriceReg = /^[0-9]*.[0-9]*$/;
    const [invalidseatprice, setInvalidseatprice] = useState<boolean[]>([true]);
    const [seatpriceErrorMessages, setSeatpriceErrorMessages] = useState<string[]>(['ต้องเป็นตัวเลขหรือทศนิยม']);

    const eventseatMaxReg = /^[^0][0-9]+$/;
    const [invalidseatMax, setInvalidseatMax] = useState<boolean[]>([true]);
    const [seatMaxErrorMessages, setSeatMaxErrorMessages] = useState<string[]>(['ต้องเป็นตัวเลขเท่านั้น']);


    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isValid =
            event_name &&
            event_location.address &&
            event_location.city &&
            event_location.country &&
            seat.every(item => item.seat_name && item.seat_price > 0 && item.seat_max > 0);

        setIsFormValid(isValid); // อัปเดตค่าของ isFormValid
    }, [event_name, event_location, seat]); // ตรวจสอบการเปลี่ยนแปลงในค่าต่างๆ



    return (

        <div className="space-y-8">
            <Select
                label="Event category"
                labelPlacement="outside"
                placeholder="เลือกประเภทของกิจกรรม"
                selectedKeys={[selectedeventTypeValue]}
                onChange={handleChange}
            >

                {eventType.map((type, index) => (
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
                onChange={(e) => {
                    // ตรวจสอบว่า input ตรงกับ regular expression หรือไม่
                    if (!eventnameReg.test(e.target.value)) {
                        setIsInvalid(true);
                        setErrorMessage('กรุณาใส่ตัวเลขหรืออักษรภาษาไทยอังกฤษ { } [ ] # :และช่องว่างเท่านั้นความยาว 10 ตัวอักษร');

                    } else {
                        setIsInvalid(false);
                        setErrorMessage('');

                    }
                    setevent_name(e.target.value);

                }}
                isInvalid={isInvalid}
                errorMessage={errorMessage}
                required
            />

            <div>
                <label className="block mb-2 text-sm font-medium leading-6 ">
                    Introduction
                </label>
                <TextEditor setContent={setevent_intro} maxLength={1000} />
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
                    onChange={handleDateChange}
                    defaultValue={dateRange}
                />
            </div>

            <label>Event location</label>
            <div className="flex flex-row gap-5">
                <Input
                    type="text"
                    placeholder="สถานที่จัดงาน"
                    value={event_location.address}
                    onChange={handleChangeAddress}
                    isInvalid={iseventA_Invalid}
                    errorMessage={Event_AerrorMessage}
                    required
                />
                <Input
                    type="text"
                    placeholder="จังหวัด"
                    value={event_location.city}
                    onChange={handleChangeCity}
                    isInvalid={iseventlocationProvince_Invalid}
                    errorMessage={Event_PerrorMessage}
                    required
                />
                <Input
                    type="text"
                    placeholder="ประเทศ"
                    value={event_location.country}
                    onChange={handleChangeCountry}
                    isInvalid={iseventlocationcountryReg_Invalid}
                    errorMessage={Event_CerrorMessage}
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
                                isInvalid={invalidSeatName[index] || false}
                                errorMessage={seatNameErrorMessages[index] || ''}
                                placeholder="ชื่อที่นั่งหรือประเภท"
                            />

                            <Input
                                type="number"
                                onChange={(e) => handleseatInputChange(e, index, 'seat_price')}
                                isInvalid={invalidseatprice[index] || false}
                                errorMessage={seatpriceErrorMessages[index] || ''}
                                placeholder="ราคา"
                            />

                            <Input
                                type="number"
                                onChange={(e) => handleseatInputChange(e, index, 'seat_max')}
                                isInvalid={invalidseatMax[index] || false}
                                errorMessage={seatMaxErrorMessages[index] || ''}
                                placeholder="จำนวนที่เปิดขาย"
                            />


                        </div>

                        {
                            index > 0 && (
                                <Button className="mb-auto ml-4" isIconOnly color="danger" type="button" onClick={() => removeSeat(index)}>
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
            <TextEditor setContent={setevent_description} maxLength={30000} />
            <p className="mt-3 text-sm leading-6 text-gray-400">เขียนรายละเอียดเกี่ยวกับตั๋วและโปรโมชั่น</p>

            {isFormValid && (<Button className="bg-sky-500 hover:bg-sky-700 rounded-large text-white font-bold" onClick={addtodb} disabled={!isFormValid} >Submit</Button>)}


            {!event_name && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">กรุณากรอกชื่อ event</span>
                    </div>
                </div>
            )}

            {!event_location.address && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">กรุณากรอกสถานที่จัดงาน</span>
                    </div>
                </div>
            )}

            {!event_location.city && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">กรุณากรอกเมืองที่จัดงาน</span>
                    </div>
                </div>
            )}

            {!event_location.country && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">กรุณากรอกประเทศที่จัดงาน</span>
                    </div>
                </div>
            )}

            {seat.some(item => !item.seat_name || item.seat_price <= 0 || item.seat_max <= 0) && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">กรุณากรอกข้อมูลที่นั่งให้ครบถ้วน (ชื่อที่นั่ง, ราคา, จำนวนสูงสุด)</span>
                    </div>
                </div>
            )}

        </div>
    )
}