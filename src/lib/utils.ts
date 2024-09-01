import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}
export function convertAmountFromMiliunits(amount: number) {
  return Math.round(amount / 1000);
}

export function formateCurrency(value: number) {
  // const finalValue = (value = convertAmountFromMiliunits(value));
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "IND",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function calculculatePercentChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }
  return ((current - previous) / previous) * 100;
}

export const minimalDate = (date: Date): string => {
  const newDate = new Date(date);
  return newDate.toLocaleString("en-US", { month: "short", day: "numeric" });
};
