"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import TextEditor from "@/components/texteditor";
import { DateRangePicker } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { CalendarDate, CalendarDateTime, parseZonedDateTime, ZonedDateTime } from "@internationalized/date";

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

export default function EditEventForm({ eventData, eventType }: EditEventFormProps) {
    const { data: session } = useSession();
    const [event_name, setEventName] = useState("");

    const [eventimageURL, seteventimageURL] = useState(`${eventData.event_images}`);
    const [event_intro, setevent_intro] = useState('');

    const [selectedeventTypeValue, setSelectedEventTypeValue] = useState<string>(eventData?.event_type?.et_id.toString() || "1");
    const [dateRange, setDateRange] = useState({
        start: parseZonedDateTime("2024-04-01T00:45[Asia/Bangkok]"),
        end: parseZonedDateTime("2024-04-08T11:15[Asia/Bangkok]"),
    });


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




    const startDate = new Date(eventData.event_start_date); // Assuming eventData.event_start_date is a valid date string
    startDate.setDate(startDate.getDate() + 1); // Subtract 1 day
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    console.log(formattedStartDate);

    const endDate = new Date(eventData.event_last_date); // Assuming eventData.start is a valid date string
    const formattedLastDate = endDate.toISOString().slice(0, 10);
    console.log(formattedLastDate);
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
                pageBehavior="single"
            />
        </div>
    );
}
