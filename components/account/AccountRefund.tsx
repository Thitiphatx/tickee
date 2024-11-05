"use client"
import { ReceiptStatus } from "@/types/data_type";
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
                    {receipts.filter((rec: any) => (rec.rec_status != ReceiptStatus.Expired) || (rec.rec_status != ReceiptStatus.Success)).map((receipt: any) => (
                        <TableRow key={receipt.rec_id}>
                            <TableCell>{receipt.rec_id}</TableCell>
                            <TableCell>{new Date(receipt.rec_date).toLocaleDateString("th-TH-u-ca-buddhist", { year: 'numeric', month: '2-digit', day: '2-digit' })}</TableCell>
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
