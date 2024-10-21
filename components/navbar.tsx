"use client";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { signOut, useSession } from "next-auth/react";
import Searchbar from "./searchbar";
import { IconCalendarEventFill, IconDoorOpenFill, IconLogout, IconTicket, IconUser } from "@/styles/icon";
import { useState, useEffect } from 'react'
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";

export const Navbar = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "loading") {
            setLoading(false); 
        }
    }, [status]);

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit uppercase first-letter:text-primary-500 text-2xl">Tickee</p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink color="foreground" href={item.href}>{item.label}</NextLink>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="hidden md:flex space-x-5">
                    {loading ? (
                        // Loading indicator while session is being fetched
                        <div className="animate-pulse">
                            <Button className="bg-gray-200"></Button>
                        </div>
                    ) : session ? (
                        <>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                    >
                                        {session.user.name}
                                    </Button>   
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                    <DropdownItem
                                        description="จัดการบัญชีของฉัน"
                                        startContent={<IconUser width="1.5rem" height="1.5rem" />}
                                        key="profile"
                                        href="/account/profile"
                                    >
                                        Profile
                                    </DropdownItem>
                                    <DropdownItem
                                        key="myticket"
                                        href="/account/myticket"
                                        description="ตั๋วของฉัน"
                                        startContent={<IconTicket width="1.5rem" height="1.5rem" />}
                                    >
                                        My ticket
                                    </DropdownItem>
                                    <DropdownItem
                                        key="event"
                                        href="/event-organizer"
                                        description="จัดการกิจกรรม"
                                        startContent={<IconCalendarEventFill width="1.5rem" height="1.5rem" />}
                                    >
                                        Event
                                    </DropdownItem>
                                    <DropdownItem
                                        key="backend"
                                        description="ระบบหลังบ้าน"
                                        startContent={<IconDoorOpenFill width="1.5rem" height="1.5rem" />}
                                    >
                                        Backend
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        onClick={() => signOut()}
                                        className="text-danger"
                                        color="danger"
                                        description="ออกจากระบบ"
                                        startContent={<IconLogout width="1.5rem" height="1.5rem" />}
                                    >
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>

                    ) : (
                        <Button
                            as={Link}
                            className="text-sm font-normal text-default-600 bg-default-100"
                            href={"/signin"}
                            variant="flat"
                        >
                            Sign In
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link color={"foreground"} href={item.href} size="lg">
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    <Divider />
                    <NavbarMenuItem>
                        <Link color={"danger"} size="lg" onClick={() => signOut()}>
                            Logout
                        </Link>
                    </NavbarMenuItem>
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};