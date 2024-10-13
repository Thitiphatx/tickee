"use client"

import { User } from "@prisma/client";
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { motion } from 'framer-motion'
import { RadioGroup, Radio } from "@nextui-org/radio";
import { RoleAvailable } from "@/types/data_type";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";

interface EditUserModalProps {
    data: User | null;
    role: string;
    editForm: boolean;
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditUserModal({ data, role, editForm, setEditForm }: EditUserModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [mapData, setMapData] = useState<User | null>();
    const [outputName, setOutputName] = useState<string>("");
    const [outputEmail, setOutputEmail] = useState<string>("");
    const [outputRole, setOutputRole] = useState<string>("");
    const [onLoad, setOnLoad] = useState<boolean>(true);
    const [display, setDisplay] = useState<boolean>(false);

    if (data && onLoad) {
        setOnLoad(false)
        setOutputRole(role)
        setMapData(data)
    }

    if (editForm && !display) {
        setMapData(data)
        setOutputRole(role)
        setOutputEmail(data?.email || "")
        setOutputName(data?.name || "")
        setDisplay(true)
        onOpen()
    }
    const closeDisplay = () => {
        setEditForm(false)
        setDisplay(false)
        setMapData(null)
        onClose()
    };

    const returnID = () => {
        if (data) {
            return data.id.toString()
        }
        return ""
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        let user_id: string = returnID();
        try {
            const res = await fetch('/api/admin/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, outputName, outputEmail, outputRole }),
            });

        } catch (error) {
            console.error('Error creating user:', error);
        }
        closeDisplay()
    };

    return (
        <>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={closeDisplay}>
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
                                                <Radio value={item}>{item}</Radio>
                                            ))}
                                        </RadioGroup>
                                        <p className="text-default-500 text-small">New Role : {outputRole}</p>
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
        </>
    )
};
