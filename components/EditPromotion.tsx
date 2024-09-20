"use client";
import React, { useState } from 'react';
import { Input, Textarea, Button, DatePicker, DateValue } from '@nextui-org/react';

interface PromotionFormProps {
  events: { event_id: number; event_name: string; }[]; // Update this type as needed
}

const EditPromotion: React.FC<PromotionFormProps> = ({ events }) => {
  const [formData, setFormData] = useState({
    seat_type_id: '',
    pro_description: '',
    pro_discount: '',
    pro_start_date: null as DateValue | null,
    pro_last_date: null as DateValue | null,
    event_id: '' // Use event_id instead of pro_type_id
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name: 'pro_start_date' | 'pro_last_date') => (value: DateValue) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, event_id: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data for submission
    const promotionData = {
      seat_type_id: formData.seat_type_id,
      pro_description: formData.pro_description,
      pro_discount: parseFloat(formData.pro_discount), // Ensure it's a number
      pro_start_date: formData.pro_start_date,
      pro_last_date: formData.pro_last_date,
      event_id: parseInt(formData.event_id), // Ensure it's a number
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
      <Textarea
        name="pro_description"
        label="Promotion Description"
        value={formData.pro_description}
        onChange={handleChange}
        required
      />
      <Input
        name="pro_discount"
        label="Promotion Discount"
        type="number"
        value={formData.pro_discount}
        onChange={handleChange}
        required
      />
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
      <select
        name="event_id"
        value={formData.event_id}
        onChange={handleSelectChange}
        required
        className="border border-gray-300 rounded p-2"
      >
        <option value="" disabled>Select Event</option>
        {events.map((event) => (
          <option key={event.event_id} value={event.event_id.toString()}>
            {event.event_name}
          </option>
        ))}
      </select>
      <Button type="submit" color="primary">Submit</Button>
    </form>
  );
};

export default EditPromotion;
