"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import React from 'react';

const RefundTable = ({ receipts }: any) => {
  const getStatusMessage = (status: number) => {
    switch (status) {
      case 3:
        return 'กำลังดำเนินการ'; // "In Progress"
      case 2:
        return 'ปฏิเสธดำเนินการ'; // "Operation Denied"
      case 4:
        return 'คืนเงินเสร็จสิ้น'; // "Refund Completed"
      default:
        return 'Unknown Status'; // Fallback for any other status
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Receipt ID</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Seat Type</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {receipts.length > 0 ? (
            receipts.map((receipt:any) => (
              <tr key={receipt.rec_id}>
                <td className="border border-gray-300 p-2">{receipt.rec_id}</td>
                <td className="border border-gray-300 p-2">{new Date(receipt.rec_date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{receipt.rec_quantity}</td>
                <td className="border border-gray-300 p-2">{receipt.rec_seat.seat_name}</td>
                <td className="border border-gray-300 p-2">{getStatusMessage(receipt.rec_status)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border border-gray-300 p-2 text-center">No refunded receipts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RefundTable;
