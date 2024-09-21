"use client";
import React, { useState } from 'react';
import { Input, Textarea, Button, DatePicker, DateValue } from '@nextui-org/react';

interface SeatType {
  seat_id: number;
  seat_name: string;
  seat_price: number;
}

interface Event {
  event_id: number;
  event_name: string;
  seat_types: SeatType[]; // Include seat types associated with the event
}

interface PromotionType {
  id: number;
  name: string;
}

interface PromotionFormProps {
  events: Event[];
  promotionTypes: PromotionType[]; // Add promotion types to the props
}

const EditPromotion: React.FC<PromotionFormProps> = ({ events, promotionTypes }) => {
  const [formData, setFormData] = useState({
    seat_type_id: '',
    pro_description: '',
    pro_discount: '',
    pro_start_date: null as DateValue | null,
    pro_last_date: null as DateValue | null,
    event_id: events[0]?.event_id.toString() || '',
    pro_type: promotionTypes[0]?.id.toString() || '', // Default to the first promotion type
  });

  const seatTypes = events[0]?.seat_types || []; // Get seat types from the first event

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name: 'pro_start_date' | 'pro_last_date') => (value: DateValue) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data for submission
    const promotionData = {
      seat_type_id: parseInt(formData.seat_type_id),
      pro_description: formData.pro_description,
      pro_discount: formData.pro_type !== '3' ? parseFloat(formData.pro_discount) : null, // No discount if promotion type is 'free gift'
      pro_start_date: formData.pro_start_date,
      pro_last_date: formData.pro_last_date,
      event_id: parseInt(formData.event_id),
      pro_type: parseInt(formData.pro_type),
    };

    try {
      const response = await fetch('/api/promotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create promotion');
      }

      const result = await response.json();
      console.log('Promotion created successfully:', result);
    } catch (error) {
      console.error('Error creating promotion:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">{events[0]?.event_name}</h2>

      {/* Promotion Description */}
      <Textarea
        name="pro_description"
        label="Promotion Description"
        value={formData.pro_description}
        onChange={handleChange}
        required
      />

      {/* Conditional Rendering for Discount Field */}
      {formData.pro_type !== '3' && ( // Only show if not "free gift"
        <Input
          name="pro_discount"
          label="Promotion Discount"
          type="number"
          value={formData.pro_discount}
          onChange={handleChange}
          required
        />
      )}

      {/* Promotion Type Dropdown */}
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

      {/* Date Pickers */}
      <DatePicker
        name="pro_start_date"
        label="Promotion Start Date"
        onChange={handleDateChange('pro_start_date')}
      />
      <DatePicker
        name="pro_last_date"
        label="Promotion Last Date"
        onChange={handleDateChange('pro_last_date')}
      />

      {/* Seat Type Dropdown */}
      <select
        name="seat_type_id"
        value={formData.seat_type_id}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded p-2"
      >
        <option value="" disabled>Select Seat Type</option>
        {seatTypes.map((seat) => (
          <option key={seat.seat_id} value={seat.seat_id}>
            {seat.seat_name} - ${seat.seat_price}
          </option>
        ))}
      </select>

      <Button type="submit" color="primary">Submit</Button>
    </form>
  );
};

export default EditPromotion;
