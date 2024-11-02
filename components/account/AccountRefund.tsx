"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
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
                <Table aria-label="Example table with dynamic content">
                    <TableHeader>
                        <TableColumn>Id</TableColumn>
                        <TableColumn>Date</TableColumn>
                        <TableColumn>Quantity</TableColumn>
                        <TableColumn>Seat Type</TableColumn>
                        <TableColumn>Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {receipts.map((receipt: any) => (
                            <TableRow key={receipt.rec_id}>
                                <TableCell>{receipt.rec_id}</TableCell>
                                <TableCell>{new Date(receipt.rec_date).toLocaleDateString()}</TableCell>
                                <TableCell>{receipt.rec_quantity}</TableCell>
                                <TableCell>{receipt.rec_seat.seat_name}</TableCell>
                                <TableCell>{getStatusMessage(receipt.rec_status)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </div>
    );
};

export default RefundTable;
