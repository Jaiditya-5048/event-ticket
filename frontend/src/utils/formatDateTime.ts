import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format('D MMM, YY'); // e.g., 10 Jan, 25
};

export const formatTime = (dateString: string): string => {
  return dayjs(dateString).format('hh:mm A'); // e.g., 12:00 PM
};

export function toISOStringUTC(date: string, time: string): string {
  return dayjs(`${date}T${time}`).utc().toISOString();
}