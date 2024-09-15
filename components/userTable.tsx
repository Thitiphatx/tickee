"use client"

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";
import { Role, User } from "@prisma/client";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "./icons";

interface Selected extends User {
    user_role: Role
}

export default function UserTable({ data }: { data: any }) {
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [editForm, setEditForm] = useState(false);

    const deleteClick = () => {
        setDeleteAlert(true);
    };

    const deleteClose = () => {
        setDeleteAlert(false);
    };

    const editClick = () => {
        setDeleteAlert(true);
    };

    const editClose = () => {
        setDeleteAlert(false);
    };
    return (
        <>
            <Table className="p-8" selectionMode="single" color="default" >
                <TableHeader>
                    <TableColumn align="center">NAME</TableColumn>
                    <TableColumn align="center">EMAIL</TableColumn>
                    <TableColumn align="center">PHONE</TableColumn>
                    <TableColumn align="center">ROLE</TableColumn>
                    <TableColumn align="center">STATUS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Data for Display."}>
                    {data.map((item: any) => (
                        <TableRow key={item.user_id}>
                            {/* <TableCell>{item.user_name} {item.user_surname}</TableCell> */}
                            <TableCell>{item.user_name}</TableCell>
                            <TableCell>{item.user_email}</TableCell>
                            <TableCell>{item.user_phone}</TableCell>
                            <TableCell>{item.user_role.role_name}</TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-2 w-full">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon onClick={editClick}/>
                                    </span>
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon onClick={deleteClick} />
                                    </span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
};
