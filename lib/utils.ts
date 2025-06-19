import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (timeString: string | null | undefined) => {
  if (!timeString) {
    return { time: "N/A", period: "" };
  }
  const parts = timeString.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  return {
    time: `${formattedHours}:${minutes}`,
    period,
  };
};
