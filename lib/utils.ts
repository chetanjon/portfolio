import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  // Parse 'YYYY-MM' / 'YYYY-MM-DD' as a LOCAL date. Passing the raw string to
  // `new Date()` parses it as UTC midnight, which renders as the previous month
  // in negative-offset timezones (e.g. '2025-11' -> "Oct 2025" in Phoenix).
  const [y, m, d] = date.split('-').map(Number);
  const local = new Date(y, (m || 1) - 1, d || 1);
  return local.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function calculateDuration(start: string, end: string | 'Present'): string {
  const startDate = new Date(start);
  const endDate = end === 'Present' ? new Date() : new Date(end);

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo`;
  if (remainingMonths === 0) return `${years} yr`;
  return `${years} yr ${remainingMonths} mo`;
}
