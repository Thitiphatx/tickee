"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import React from 'react';



const RefundTable = ({ receipts } : { receipts: any }) => {
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableHeader>
                    <TableColumn>Receipt ID</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Quantity</TableColumn>
                    <TableColumn>Seat Type</TableColumn>
                    <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody>
                    {receipts.length > 0 ? (
                        receipts.map(receipt => (
                            <TableRow key={receipt.rec_id}>
                                <TableCell>{receipt.rec_id}</TableCell>
                                <TableCell>{new Date(receipt.rec_date).toLocaleDateString()}</TableCell>
                                <TableCell>{receipt.rec_quantity}</TableCell>
                                <TableCell>{receipt.rec_seat.seat_name}</TableCell>
                                <TableCell>{receipt.rec_status}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="border border-gray-300 p-2 text-center">No refunded receipts found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default RefundTable;
