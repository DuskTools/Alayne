"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(date) {
    const [month, day, year] = date.split('/').map((string) => Number(string));
    return new Date(2000 + year, month - 1, day);
}
exports.formatDate = formatDate;
