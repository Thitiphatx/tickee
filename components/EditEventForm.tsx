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
import { kMaxLength } from "buffer";

interface EventData {
    event_id: number;
    event_name: string;
    event_intro: string;
    event_description: string;
    event_images: string;
    event_start_date: Date;
    event_last_date: Date;
    event_location: string;
    event_seat_per_order:number;
    event_type: {
        et_id: number;
        et_name: string;
    }
    Seat_Type: {
        seat_id: number;
        seat_name: string;
        seat_price: number;
        seat_create_date: Date;
        seat_due_date: Date;
        event_seat_id: number;
        Seat_Dispatch: {
          st_id: number; // Change st_di to st_id here
          seat_type_id: number;
          sd_max: number;
          sd_current: number;
        } | null;
      }[];
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
    const [eventMaxbuy, seteventMaxbuy] = useState(eventData.event_seat_per_order);


    const [isLoading, setIsLoading] = useState(false); // Add loading state
    ///experiment only

    const startDate1 = new Date(eventData.event_start_date); // Assuming eventData.event_start_date is a valid date string
    const aew = startDate1.setDate(startDate1.getDate() + 1); // Subtract 1 day
    const formattedStartDate1 = startDate1.toISOString().slice(0, 10);
    
    const defaultTime = "T00:45[Asia/Bangkok]";
    const defaultTime2 = "T11:15[Asia/Bangkok]";

    const endDate1 = new Date(eventData.event_last_date); // Assuming eventData.event_start_date is a valid date string
    const aew2 = endDate1.setDate(endDate1.getDate()); // Subtract 1 day
    const formattedEndDate1 = endDate1.toISOString().slice(0, 10);
    



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
        seat_create_date?: Date;  // Add this
        seat_due_date?: Date;     // Add this
    }




    const [seat, setseat] = useState<seatdata[]>(
        eventData.Seat_Type.map((s) => ({
          seat_id: s.seat_id,
          seat_name: s.seat_name,
          seat_price: s.seat_price,
          seat_max: s.Seat_Dispatch?.sd_max || 0,
          seat_create_date: s.seat_create_date,
          seat_due_date: s.seat_due_date,
          Seat_Dispatch: s.Seat_Dispatch
            ? {
                st_di: s.Seat_Dispatch.st_id, // Renaming st_id to st_di here
                seat_type_id: s.Seat_Dispatch.seat_type_id,
                sd_max: s.Seat_Dispatch.sd_max,
                sd_current: s.Seat_Dispatch.sd_current,
              }
            : null,
        }))
      );


    const handleseatInputChange = (e:any, index:any, field:any) => {
        let value = field === 'seat_price' || field === 'seat_max' ? parseInt(e.target.value) : e.target.value;

        const updatedSeats = [...seat];
        updatedSeats[index] = { ...updatedSeats[index], [field]: value };

        setseat(updatedSeats);
    };


    const addtodb = async () => {

        setIsLoading(true);
        
        
        
        
        
        
        const startDateTimeISO = dateRange.start.toDate();
        const endDateTimeISO = dateRange.end.toDate();
        


        const data = {
            event_id: eventData.event_id,
            event_name: event_name,
            event_intro: event_intro,
            event_description: event_description,
            event_images: eventimageURL,
            event_start_date: startDateTimeISO.toISOString(),
            event_last_date: endDateTimeISO.toISOString(),
            event_location: JSON.stringify(event_location),
            event_seat_per_order: eventMaxbuy,
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
            


            const eventId = result.event_id;
            await Promise.all(
                seat.map(async (seatItem,index) => {

                    const seatData = {
                        seat_id: seatItem.seat_id,
                        seat_name: seatItem.seat_name,
                        seat_price: seatItem.seat_price,
                        seat_max: seatItem.seat_max,
                        seat_create_date: seatDateRanges[index].start.toDate().toISOString(),
                        seat_due_date: seatDateRanges[index].end.toDate().toISOString(),
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
                    
                })
            );
            router.push("/event-organizer")

        } catch (error) {
            console.error('Error creating eventandseat:', error);
        }
        finally {
            setIsLoading(false); // Hide loading modal and revert button label
        }
    }




    const startDate = new Date(eventData.event_start_date); // Assuming eventData.event_start_date is a valid date string
    startDate.setDate(startDate.getDate() + 1); // Subtract 1 day
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    

    const endDate = new Date(eventData.event_last_date); // Assuming eventData.start is a valid date string
    endDate.setDate(endDate.getDate() + 1)
    const formattedLastDate = endDate.toISOString().slice(0, 10);
    

    const formattedSeats2 = eventData.Seat_Type.map((seat, index) => {
        // Create a date object for the event start date
        const startDate1 = new Date(eventData.Seat_Type[index].seat_create_date); // Assuming eventData.event_start_date is a valid date string
        startDate1.setDate(startDate1.getDate() +1); // Subtract 1 day
        const formattedStartDate1 = startDate1.toISOString().slice(0, 10);
        

        const endDate1 = new Date(eventData.Seat_Type[index].seat_due_date); // Assuming eventData.start is a valid date string
        endDate1.setDate(endDate1.getDate() +1)
        const formattedLastDate1 = endDate1.toISOString().slice(0, 10);
        


        return {
            seat_id: seat.seat_id,
            seat_name: seat.seat_name,
            seat_price: seat.seat_price,
            seat_create_date: formattedStartDate1, // YYYY-MM-DD format
            seat_due_date: formattedLastDate1,       // YYYY-MM-DD format
            event_seat_id: seat.event_seat_id,
            Seat_Dispatch: seat.Seat_Dispatch,
            seat_max: seat.Seat_Dispatch?.sd_max
        };
    });
    const [seatDateRanges, setSeatDateRanges] = useState(
        formattedSeats2.map(seat => ({
            start: parseZonedDateTime(`${seat.seat_create_date}${defaultTime}`),
            end: parseZonedDateTime(`${seat.seat_due_date}${defaultTime}`),
        }))
    );

    const handleSeatDateChange = (range: any, seatIndex: number) => {
        // Assuming you have a state variable to hold the date ranges for each seat
        const newSeatDateRanges = [...seatDateRanges]; // Create a copy of the current date ranges
    
        // Update the date range for the specific seat
        newSeatDateRanges[seatIndex] = range;
    
        // Update the state with the new date ranges
        setSeatDateRanges(newSeatDateRanges);
    };

    // Log the new array to see the result
    

    // 
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
                <TextEditor setContent={setevent_intro} contents={eventData?.event_intro || ""} maxLength={5000}/>
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
                            <DateRangePicker
                                label="Stay duration"
                                isRequired
                                defaultValue={{
                                    start: parseDate(formattedSeats2[index].seat_create_date),
                                    end: parseDate(formattedSeats2[index].seat_due_date),
                                }}
                                visibleMonths={2}
                                onChange={(range) => handleSeatDateChange(range, index)} // Pass the index of the seat
                                pageBehavior="single"
                            />
                        </div>

                    </div>
                ))}

            </div>

            <div>
                <p className="font-bold mb-4 text-sm leading-6 ">
                    จำนวนการซื้อสูงสุดแต่ละรอบ
                </p>
                <Input
                    type="number"
                    style={{ width: '400px' }}
                    placeholder="จำนวนการซื้อสูงสุดแต่ละรอบ (ไม่ใส่ = 5)"
                    value={eventMaxbuy.toString()}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        seteventMaxbuy(value < 1 ? 1 : value); // Set to 1 if value is below 1
                    }}
                />
            </div>



            <label className="block mb-2 text-sm font-medium leading-6 ">
                Event description
            </label>
            <TextEditor setContent={setevent_description} contents={eventData?.event_description || ""} maxLength={50000}/>
            <p className="mt-3 text-sm leading-6 text-gray-400">เขียนรายละเอียดเกี่ยวกับตั๋วและโปรโมชั่น</p>

            <Button className="bg-sky-500 hover:bg-sky-700 rounded-large text-white font-bold" onClick={addtodb}  > {isLoading ? <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
             : "Submit"} </Button>
        </div>
    );
}
