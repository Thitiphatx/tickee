"use client"
import { getConcertEvent } from "./fetch";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useRouter, notFound } from "next/navigation";

export default async function Concert() {
    // const res = await getConcertEvent();
    // if (!res) {
    //     notFound()
    // }
    // const concertEvent = res;
    const router = useRouter()
    const concertEvent = [
        {
            cover: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/8a6607c038a011ef911101117567899b.png?opt=mild&resize=w200,h290",
            name: "MIND DAY ภูมิคุ้มใจ",
            date: {
                start: "29 SEP",
                end: "",
            },
            location: "SPHERE HALL 5M FLOOR"
        },
        {
            cover: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/8a6607c038a011ef911101117567899b.png?opt=mild&resize=w200,h290",
            name: "MIND DAY ภูมิคุ้มใจ",
            date: {
                start: "29 SEP",
                end: "",
            },
            location: "SPHERE HALL 5M FLOOR"
        },
        {
            cover: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/8a6607c038a011ef911101117567899b.png?opt=mild&resize=w200,h290",
            name: "MIND DAY ภูมิคุ้มใจ",
            date: {
                start: "29 SEP",
                end: "",
            },
            location: "SPHERE HALL 5M FLOOR"
        },
        {
            cover: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/8a6607c038a011ef911101117567899b.png?opt=mild&resize=w200,h290",
            name: "MIND DAY ภูมิคุ้มใจ",
            date: {
                start: "29 SEP",
                end: "",
            },
            location: "SPHERE HALL 5M FLOOR"
        },
        {
            cover: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/8a6607c038a011ef911101117567899b.png?opt=mild&resize=w200,h290",
            name: "MIND DAY ภูมิคุ้มใจ",
            date: {
                start: "29 SEP",
                end: "",
            },
            location: "SPHERE HALL 5M FLOOR"
        }
        ,
        {
            cover: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/8a6607c038a011ef911101117567899b.png?opt=mild&resize=w200,h290",
            name: "MIND DAY ภูมิคุ้มใจ",
            date: {
                start: "29 SEP",
                end: "",
            },
            location: "SPHERE HALL 5M FLOOR"
        }
    ]

    return (
        <div>
            <h1 className="font-bold text-3xl mb-10">Concert</h1>
            <div className="flex w-full flex-wrap justify-start gap-8"
            >
                {concertEvent.map((event, index) => (
                    <Card className="min-w-52 flex-shrink-0" key={index} isPressable onPress={() => router.push(`/event/${index}`)}>
                        <Image alt="Card background" className="object-cover rounded-xl" src={event.cover} width={270} />
                        <CardBody className="overflow-visible py-2">
                            <p className="text-tiny uppercase font-bold">{event.date.start} {event.date.end}</p>
                            <p className="text-tiny uppercase font-bold">{event.name}</p>
                            <small className="text-default-500 truncate">{event.location}</small>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    )
};
