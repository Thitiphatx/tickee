"use client"

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table";

import { Pagination } from "@nextui-org/pagination";
import { motion } from 'framer-motion'
import { User } from "@prisma/client";
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/button'
import { DeleteIcon, EditIcon } from "../icons";
import { RoleAvailable } from "@/types/data_type";
import { useSession } from "next-auth/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Input } from '@nextui-org/input'
import AdminSearchbar from "./adminSearchbar";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

export default function UserTable() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isOpen2, setOpen2] = useState<boolean>(false);
    const [roleType, setRoleType] = useState<string>(RoleAvailable.User);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [usersData, setUsersData] = useState<User[] | null>(null);
    const [allUser, setAllUser] = useState<User[] | null>(null);
    const [mapData, setMapData] = useState<User | null>();
    const [outputRole, setOutputRole] = useState<string>("");
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const [outputName, setOutputName] = useState<string>("");
    const [outputEmail, setOutputEmail] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const { data: session, status } = useSession();
    const rowsPerPage = 20;

    useEffect(() => {
        const fetchData = async () => {
            setOnLoad(true)
            try {
                setAllUser(null)
                const res = await fetch('/api/admin/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ searchText: search }),
                });
                const output = await res.json();
                setAllUser(output)
            } catch (error) {
                console.error('Error GET user:', error);
            }
        };
        fetchData();
    }, [search]);

    const changePage = (input: number) => {
        if (allUser != null) {
            const start = (input - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            setPage(input)
            setUsersData(allUser.slice(start, end))
        }
    }

    const roleSelection = (role: string) => {
        if (allUser != null && allUser) {
            const filtered = allUser.filter((item: User) => (item.role == role && session?.user.id != item.id))
            const dataLength = filtered.length
            const start = 0;
            const end = start + rowsPerPage;
            setPage(1)
            setUsersData(filtered.slice(start, end))

            setLastPage(Math.ceil(dataLength / rowsPerPage));
            setRoleType(role)
        }
    };


    if (allUser && allUser != null && onLoad) {
        roleSelection(RoleAvailable.User)
        setOnLoad(false)
    }

    const onOpen2 = () => {
        setOpen2(true)
    };

    const onClose2 = () => {
        setOpen2(false)
    };

    const deleteClick = (item: User) => {
        setMapData(item)
        onOpen()
    };

    const editClick = (item: User) => {
        setMapData(item)
        setOutputRole(item.role)
        setOutputName(item.name || "")
        setOutputEmail(item.email || "")
        onOpen2()
    };

    const returnID = () => {
        if (mapData) {
            return mapData.id.toString()
        }
        return ""
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        let user_id: string = returnID();
        try {
            const res = await fetch('/api/admin/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user_id, outputName, outputEmail, outputRole }),
            });

        } catch (error) {
            console.error('Error creating user:', error);
        }
        onClose2()
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let user_id: string = mapData?.id || "";
        console.log(user_id, mapData?.id, "userTable")
        try {
            const res = await fetch('/api/admin/user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user_id }),
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
        onClose()
    };

    return (
        <div className="flex flex-col w-full items-end gap-5">

            <Modal backdrop={"blur"} isOpen={isOpen2} onClose={onClose2}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Edit</ModalHeader>
                        <Divider />
                        <form onSubmit={handleEdit}>
                            <ModalBody className="px-5 py-6 gap-3">
                                <motion.div className="space-y-2"
                                    initial={{ y: 200, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                >
                                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputEmail(e.target.value)} defaultValue={mapData?.email || ""} type="email" label="Email" />
                                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutputName(e.target.value)} defaultValue={mapData?.name || ""} type="text" label="Name" />
                                    <div className="flex flex-col gap-3 p-5">
                                        <RadioGroup
                                            label="Role"
                                            value={outputRole}
                                            onValueChange={setOutputRole}
                                        >
                                            {Object.values(RoleAvailable).map((item: string) => (
                                                <Radio value={item} className="uppercase">{item}</Radio>
                                            ))}
                                        </RadioGroup>
                                        <p className="text-default-500 text-small">New Role : <span className="uppercase">{outputRole}</span></p>
                                    </div>
                                </motion.div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' variant='shadow' className="uppercase w-full" radius="full" type="submit">confirm</Button>
                            </ModalFooter>
                        </form>
                    </>
                </ModalContent>
            </Modal>

            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-2xl text-center ">Delete</ModalHeader>
                            <Divider />
                            <ModalBody className="px-10 py-6 gap-3">
                                <span className="uppercase font-semibold text-danger text-lg">Are You Sure ?</span>
                                <p className="text-md capitalize">
                                    <span>To Delete </span>
                                    <span className="underline underline-offset-2 text-danger">{mapData?.name}</span>
                                    <span> from User</span>
                                </p>
                                <p className="text-md capitalize">
                                    <span>No Return after this point</span>
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" variant='solid' onClick={(e) => handleDelete(e)}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {!onLoad && usersData != null && (
                <>
                    <div className="flex justify-between items-center w-2/3 gap-5 px-10">
                        <AdminSearchbar searchText={search} setSearchText={setSearch} />

                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="px-8 uppercase"
                                >
                                    {roleType}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Year Selection"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                onAction={(key) => { roleSelection(key.toString()) }}
                            >
                                {Object.values(RoleAvailable).map((item: string) => (
                                    <DropdownItem key={item} className="uppercase">{item}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                    <Table
                        className="p-8"
                        selectionMode="single"
                        color="default"
                        aria-label="Table"
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={lastPage}
                                    onChange={(page) => changePage(page)}
                                />
                            </div>
                        }
                    >
                        <TableHeader>
                            <TableColumn align="center">NAME</TableColumn>
                            <TableColumn align="center">EMAIL</TableColumn>
                            <TableColumn align="center">PHONE</TableColumn>
                            <TableColumn align="center">ROLE</TableColumn>
                            <TableColumn align="center">STATUS</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No Data for Display."}>
                            {usersData.map((item: User) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell className="uppercase">{item.role}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-center gap-2 w-full">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon onClick={() => editClick(item)} />
                                            </span>
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <DeleteIcon onClick={() => deleteClick(item)} />
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </div>

    )
};
