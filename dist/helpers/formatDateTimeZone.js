"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDateInBogotaTimezone = void 0;
const date_fns_tz_1 = require("date-fns-tz");
const getCurrentDateInBogotaTimezone = (date) => {
    const timezoneOffset = (0, date_fns_tz_1.getTimezoneOffset)('America/Bogota');
    const currentDateBogota = (0, date_fns_tz_1.fromZonedTime)(date, 'America/Bogota');
    currentDateBogota.setTime(currentDateBogota.getTime() + timezoneOffset);
    return currentDateBogota;
};
exports.getCurrentDateInBogotaTimezone = getCurrentDateInBogotaTimezone;
//# sourceMappingURL=formatDateTimeZone.js.map