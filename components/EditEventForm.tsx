"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import TextEditor from "@/components/texteditor";
import { Button, DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { CalendarDate, CalendarDateTime, parseZonedDateTime, ZonedDateTime } from "@internationalized/date";
import { DeleteIcon } from "./icons";
import { useRouter } from "next/navigation";

interface EventData {
    event_id: number;
    event_name: string;
    event_intro: string;
    event_description: string;
    event_images: string;
    event_start_date: string;
    event_last_date: string;
    event_location: string;
    event_type: {
        et_id: number;
        et_name: string;
    }
    Seat_Type: Array<{
        seat_id: number;
        seat_name: string;
        seat_price: number;
        seat_create_date: Date;
        seat_due_date: Date;
        event_seat_id: number;
        Seat_Dispatch: {
            st_di: number;
            seat_type_id: number;
            sd_max: number;
            sd_current: number;
        }
    }>;
}

interface Event_Type {
    et_id: number;
    et_name: string;
}

interface EditEventFormProps {
    eventData: EventData;
    eventType: Event_Type[];
}

interface EventLocation {
    address: string;
    city: string;
    country: string;
}

export default function EditEventForm({ eventData, eventType }: EditEventFormProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [event_name, setEventName] = useState("");

    const [eventimageURL, seteventimageURL] = useState(`${eventData.event_images}`);
    const [event_intro, setevent_intro] = useState(`${eventData.event_intro}`);

    ///experiment only

    const startDate1 = new Date(eventData.event_start_date); // Assuming eventData.event_start_date is a valid date string
    const aew = startDate1.setDate(startDate1.getDate() + 1); // Subtract 1 day
    const formattedStartDate1 = startDate1.toISOString().slice(0, 10);
    console.log("First of all ", formattedStartDate1);
    const defaultTime = "T00:45[Asia/Bangkok]";
    const defaultTime2 = "T11:15[Asia/Bangkok]";

    const endDate1 = new Date(eventData.event_last_date); // Assuming eventData.event_start_date is a valid date string
    const aew2 = endDate1.setDate(endDate1.getDate()); // Subtract 1 day
    const formattedEndDate1 = endDate1.toISOString().slice(0, 10);
    console.log("Second of all of all ", formattedEndDate1);

    // 
    
    const [selectedeventTypeValue, setSelectedEventTypeValue] = useState<string>(eventData?.event_type?.et_id.toString() || "1");
    const [dateRange, setDateRange] = useState({
        start: parseZonedDateTime(`${formattedStartDate1}${defaultTime}`),
        end: parseZonedDateTime(`${formattedEndDate1}${defaultTime2}`),
    });
    const [event_description, setevent_description] = useState(`${eventData.event_description}`);

    const parsedEventLocation: EventLocation = JSON.parse(eventData.event_location);

    const [event_location, setEventLocation] = useState<EventLocation>(parsedEventLocation);

    useEffect(() => {
        if (eventData) {

            setSelectedEventTypeValue(eventData.event_type.et_id.toString());
            setEventName(eventData.event_name);

        }
    }, [eventData]);

    // Adjust the handler for SharedSelection type
    const handleSelectChange = (keys: any) => {
        const selectedValue = Array.from(keys)[0] as string;  // Extract the first selected key from keys
        setSelectedEventTypeValue(selectedValue);
    };
    const handleDateChange = (range: any) => {
        // อัปเดตสถานะเมื่อมีการเลือกวันที่ใหม่
        setDateRange(range);
    };

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventLocation((prev) => ({
            ...prev,
            address: e.target.value,
        }));
    };

    const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventLocation((prev) => ({
            ...prev,
            city: e.target.value,
        }));
    };

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventLocation((prev) => ({
            ...prev,
            country: e.target.value,
        }));
    };


    interface seatdata {
        seat_id?: number;
        seat_name: string;
        seat_price: number;
        seat_max: number;
    }




    const [seat, setseat] = useState<seatdata[]>(
        eventData.Seat_Type.map((s) => ({
            seat_id: s.seat_id,
            seat_name: s.seat_name,
            seat_price: s.seat_price,
            seat_max: s.Seat_Dispatch.sd_max,
        }))
    );

    const removeSeat = (indexToRemove: number) => {
        const updatedSeats = [...seat];
        updatedSeats.splice(indexToRemove, 1);
        setseat(updatedSeats);
    };

    const addseatfields = () => {
        setseat([
            ...seat,
            {
                seat_name: "",
                seat_price: 0,
                seat_max: 0,
            }
        ]);
    };

    const handleseatInputChange = (e, index, field) => {
        let value = field === 'seat_price' || field === 'seat_max' ? parseInt(e.target.value) : e.target.value;

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
        const startDateTimeISO = dateRange.start.toDate();
        const endDateTimeISO = dateRange.end.toDate();


        const data = {
            event_id: eventData.event_id,
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
                method: 'PUT',
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


            const eventId = result.event_id;
            await Promise.all(
                seat.map(async (seatItem) => {
                    const seatData = {
                        seat_id: seatItem.seat_id,
                        seat_name: seatItem.seat_name,
                        seat_price: seatItem.seat_price,
                        seat_max: seatItem.seat_max,
                        seat_create_date: startDateTimeISO,
                        seat_due_date: endDateTimeISO,
                        event_seat_id: eventData.event_id
                    };
                    // Send a POST request to insert the seat into the seat table
                    const seatResponse = await fetch('/api/addseat', {
                        method: 'PUT',
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
            router.push("/event-organizer")

        } catch (error) {
            console.error('Error creating eventandseat:', error);
        }
    }




    const startDate = new Date(eventData.event_start_date); // Assuming eventData.event_start_date is a valid date string
    startDate.setDate(startDate.getDate() + 1); // Subtract 1 day
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    console.log(formattedStartDate);

    const endDate = new Date(eventData.event_last_date); // Assuming eventData.start is a valid date string
    endDate.setDate(endDate.getDate() + 1)
    const formattedLastDate = endDate.toISOString().slice(0, 10);
    console.log(formattedLastDate);

    console.log(eventData)
    return (
        <div className="space-y-8">
            <Select
                label="Event category"
                labelPlacement="outside"
                placeholder="เลือกประเภทของกิจกรรม"
                selectedKeys={new Set([selectedeventTypeValue])}
                onSelectionChange={handleSelectChange}  // Use onSelectionChange for Next UI Select
            >
                {eventType.map((type) => (
                    <SelectItem key={type.et_id.toString()} value={type.et_id.toString()}>
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
                onChange={(e) => setEventName(e.target.value)}
                required
            />
            <div>
                <label className="block mb-2 text-sm font-medium leading-6">
                    Introduction
                </label>
                {/* Pass event_intro as a prop to TextEditor */}
                <TextEditor setContent={setevent_intro} initialContent={eventData?.event_intro || ""} />
                <p className="mt-3 text-sm leading-6 text-gray-400">
                    เขียนเชิญชวนผู้มาเข้างาน
                </p>
            </div>
            <div>
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 ">
                    Event photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-foreground-200 px-6 py-6" >
                    {eventData?.event_images ? (
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
            <DateRangePicker
                label="Stay duration"
                isRequired
                defaultValue={{
                    start: parseDate(`${formattedStartDate}`),
                    end: parseDate(`${formattedLastDate}`),
                }}
                visibleMonths={2}
                onChange={handleDateChange}
                pageBehavior="single"
            />
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
                                value={seat[index].seat_price.toString()}
                                onChange={(e) => handleseatInputChange(e, index, 'seat_price')}
                                placeholder="ราคา"
                            />
                            <Input
                                type="number"
                                value={seat[index].seat_max.toString()}
                                onChange={(e) => handleseatInputChange(e, index, 'seat_max')}
                                placeholder="จำนวนที่เปิดขาย"
                            />
                        </div>
                        
                    </div>
                ))}
                
            </div>
            <label className="block mb-2 text-sm font-medium leading-6 ">
                Event description
            </label>
            <TextEditor setContent={setevent_description} initialContent={eventData?.event_description || ""}/>
            <p className="mt-3 text-sm leading-6 text-gray-400">เขียนรายละเอียดเกี่ยวกับตั๋วและโปรโมชั่น</p>

            <Button onClick={addtodb}>Submit</Button>
        </div>
    );
}
