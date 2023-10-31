import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAlphanumericOrSpaceKey = (key: string) => {
  return /^[a-zA-Z0-9]$/.test(key) || key === " ";
};
