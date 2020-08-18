export default {
    formatDateToUiDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;

        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('-');
    },
    formatDateForApi(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;

        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },
    dateAddDays(date, days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    }
}
