import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface signUpType {
    email?: string,
    password?: string,
    repass?: string,
    name?: string,
}

export interface signInType {
    email?: string,
    password?: string
}