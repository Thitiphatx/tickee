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
import { IconAccount } from "@/styles/icon";
import {useState, useEffect} from 'react'

export const Navbar = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "loading") {
            setLoading(false); // Session data is loaded
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
                <Searchbar />
                <NavbarItem className="hidden md:flex space-x-5">
                    {loading ? (
                        // Loading indicator while session is being fetched
                        <div className="animate-pulse">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        </div>
                    ) : session ? (
                        <Dropdown placement="bottom-end" backdrop="blur">
                            <DropdownTrigger>
                                <Link isBlock color="foreground" className="cursor-pointer"><IconAccount />{session.user?.name}</Link>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" href="/account/profile">Profile</DropdownItem>
                                <DropdownItem key="settings" href="/account/myticket">My Ticket</DropdownItem>
                                <DropdownItem key="logout" color="danger" onClick={() => signOut()}>Log Out</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
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
                            <Link color={"foreground"} href="#" size="lg">
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
