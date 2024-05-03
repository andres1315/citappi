import { fromZonedTime, getTimezoneOffset } from 'date-fns-tz';

export const getCurrentDateInBogotaTimezone = (date: Date): Date => {
  const timezoneOffset = getTimezoneOffset('America/Bogota');
  const currentDateBogota = fromZonedTime(date, 'America/Bogota');
  currentDateBogota.setTime(currentDateBogota.getTime() + timezoneOffset);
  return currentDateBogota;
};
