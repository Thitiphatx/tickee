export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Next.js + NextUI",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Concert",
            href: "/concert",
        },
        {
            label: "Entertainment",
            href: "/entertainment",
        },
        {
            label: "Sport",
            href: "/sport",
        },
        {
            label: "E-Sport",
            href: "/e-sport",
        }
    ],
    navMenuItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Concert",
            href: "/concert",
        },
        {
            label: "Entertainment",
            href: "/entertainment",
        },
        {
            label: "Sport",
            href: "/sport",
        },
        {
            label: "E-Sport",
            href: "/e-sport",
        }
    ],
    links: {
        github: "https://github.com/nextui-org/nextui",
        twitter: "https://twitter.com/getnextui",
        docs: "https://nextui.org",
        discord: "https://discord.gg/9b6yyZKmH4",
        sponsor: "https://patreon.com/jrgarciadev",
    },
    navAccountItems: [
        {
            label: "Profile",
            href: "/account/profile"
        },
        {
            label: "My ticket",
            href: "/account/myticket"
        }
    ]
};
