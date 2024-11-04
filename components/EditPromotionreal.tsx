"use client";
import React, { useEffect, useState } from 'react';
import { Input, Textarea, Button, DatePicker, DateValue } from '@nextui-org/react';
import { now, parseAbsoluteToLocal } from "@internationalized/date";
import { useRouter } from 'next/navigation'; // Import useRouter

interface SeatType {
  seat_id: number;
  seat_name: string;
  seat_price: number;
}

interface Event {
  event_id: number;
  event_name: string;
  pro_desc: string; // Make optional
  pro_disc?: number; // Make optional
  start: string;
  end: string;
  seat_types: {
    seat_id: number;
    seat_name: string;
    seat_price: number;
  }[];
}

interface PromotionType {
  id: number;
  name: string;
}

interface PromotionFormProps {
  events: Event[];
  promotionTypes: PromotionType[];
  promotionId?: number; // Make promotionId optional
}

const EditPromotionreal: React.FC<PromotionFormProps> = ({ events, promotionTypes, promotionId }) => {
  const router = useRouter();
  const initialPromotionType = promotionTypes.length > 0 ? promotionTypes[0].id.toString() : '';

  const initialStartDate = events[0].start // Use null if undefined
  const initialEndDate = events[0].end // Use null if undefined


  const [formData, setFormData] = useState({
    seat_type_id: '',
    pro_description: events[0]?.pro_desc || '',
    pro_discount: Number(events[0]?.pro_disc) || 0,
    pro_start_date: parseAbsoluteToLocal(initialStartDate),
    pro_last_date: parseAbsoluteToLocal(initialEndDate),
    event_id: events[0]?.event_id?.toString() || '',
    pro_type: promotionTypes[0]?.id?.toString() || '',
  });


  useEffect(() => {
    // If the promotion type is 'Free Gift' (id: 3), set discount to 0 and disable the input
    if (formData.pro_type === '3') {
      setFormData((prev) => ({ ...prev, pro_discount: 0 }));
    }
  }, [formData.pro_type]);


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'pro_discount' ? parseFloat(value) : value, // Convert to number if it's pro_discount
    }));
  };

  


  const handleDateChange = (name: 'pro_start_date' | 'pro_last_date') => (value: DateValue) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const promotionData = {
      promotionId: promotionId, // Include the promotion ID here
      seat_type_id: parseInt(formData.seat_type_id),
      pro_description: formData.pro_description,
      pro_discount: formData.pro_discount,
      pro_start_date: formData.pro_start_date,
      pro_last_date: formData.pro_last_date,
      event_id: parseInt(formData.event_id),
      pro_type: parseInt(formData.pro_type),
    };

    try {
      const response = await fetch(`/api/promotion`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotionData),
      });

      if (!response.ok) {
        throw new Error('Failed to update promotion');
      }

      const result = await response.json();
      console.log('Promotion updated successfully:', result);
      window.location.href = `/editpromotion/${formData.event_id}`;
    } catch (error) {
      console.error('Error updating promotion:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      {promotionId ? (
        <>
          <h2 className="text-xl font-bold">Editing Promotion ID: {promotionId}</h2>
        </>
      ) : (
        <h2 className="text-xl font-bold text-red-500">No Promotion ID Available</h2>
      )}

      <h3 className="text-lg">{events[0]?.event_name}</h3>

      <Textarea
        name="pro_description"
        label="Promotion Description"
        value={formData.pro_description}
        onChange={handleChange}
        required
      />

      {formData.pro_type !== '1' && (
        <Input
          name="pro_discount"
          label="Promotion Discount"
          type="number"
          value={formData.pro_discount.toString()} // Convert number to string
          onChange={handleChange}
          required
        />
      )}

      <select
        name="pro_type"
        value={formData.pro_type}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded p-2"
      >
        <option value="" disabled>Select Promotion Type</option>
        {promotionTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>

      <DatePicker
        name="pro_start_date"
        label="Promotion Start Date"
        value={formData.pro_start_date} // Ensure it can be null
        onChange={handleDateChange('pro_start_date')}
      />
      <DatePicker
        name="pro_last_date"
        label="Promotion Last Date"
        value={formData.pro_last_date} // Ensure it can be null
        onChange={handleDateChange('pro_last_date')}
      />


      <select
        name="seat_type_id"
        value={events[0]?.seat_types[0]?.seat_id}
        disabled
        className="border border-gray-300 rounded p-2"
      >
        {events[0]?.seat_types.map((seat) => (
          <option key={seat.seat_id} value={seat.seat_id}>
            {seat.seat_name} - ${seat.seat_price}
          </option>
        ))}
      </select>

      <Button type="submit" color="primary">Update Promotion</Button>
    </form>
  );
};

export default EditPromotionreal;
