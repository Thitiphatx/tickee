"use client"

import { Button } from "@nextui-org/button";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import React from "react";

export default function AddEventForm() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <div className="flex flex-wrap gap-3">
                <Button variant="flat" color="warning" onPress={onOpen} className="capitalize">
                    open
                </Button>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <Input label="Event name" />
                                <DateRangePicker label="Date"/>
                                <Textarea label="Event detail"></Textarea>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

}
