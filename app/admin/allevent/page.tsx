import { Button } from "@nextui-org/button";
import { getSelectedEvent } from "./fetch";
import { notFound } from "next/navigation";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { DeleteIcon } from "@/components/icons";

export default async function AllEvent() {
    let input = ""
    const res = await getSelectedEvent(input);
    if (!res) {
        notFound()
    }
    const foundedEvent = res

    return (
        <div className="flex flex-wrap h-2/3">
            {foundedEvent.map((event) => (
                <Card className="w-72 flex-shrink-0 overflow-hidden" key={event.event_id}>
                    <span className="absolute right-5 bottom-5 z-10 text-3xl rounded-3xl p-2 bg-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                    </span>
                    <Image alt="Card background" className="object-cover w-full z-0" src={event.event_images} height={250} />
                    <CardBody className="overflow-visible py-2">
                        <p className="text-medium uppercase font-bold">
                            {event.event_start_date.getDate() + "-"}
                            {event.event_start_date.getMonth() + "-"}
                            {event.event_start_date.getFullYear() + " - "}

                            {event.event_last_date.getDate() + "-"}
                            {event.event_last_date.getMonth() + "-"}
                            {event.event_last_date.getFullYear()}
                        </p>
                        <p className="text-lg uppercase font-bold">{event.event_name}</p>
                        <small className="text-default-500 truncate">{event.event_location?.toString()}</small>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}