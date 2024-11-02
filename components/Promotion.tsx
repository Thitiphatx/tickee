"use client";
import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from "@nextui-org/image";
import { useRouter } from 'next/navigation';

interface Event {
  event_id: number;
  event_name: string;
  event_intro: string;
  event_images: string;
  event_start_date: Date;
  event_last_date: Date;
  event_location: string; // Adjust if needed
}

interface PromotionProps {
  events: Event[];
}

const Promotion: React.FC<PromotionProps> = ({ events }) => {
  const router = useRouter();
  
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {events.map((detail) => (
        <Card
          className="min-w-52 flex-shrink-0 h-200 w-60 overflow-hidden" // Set height and width
          key={detail.event_id}
          isPressable
          onPress={() => router.push(`/promotion/${detail.event_id}`)}
        >
          <Image
            alt={`Image for ${detail.event_name}`}
            src={detail.event_images}
            width={270}
            className="object-cover rounded-xl"
            style={{ height: '300px', objectFit: 'cover' }} // Set consistent height for the image
          />
          <CardBody className="overflow-visible py-2 flex-1 flex flex-col justify-between"> {/* Ensure card body takes remaining space */}
            <p>Event Id {detail?.event_id}</p>
            <p className="text-tiny uppercase font-bold">{detail.event_name}</p>
            <small className="text-default-500 truncate">{JSON.parse(detail.event_location).address}</small>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Promotion;
