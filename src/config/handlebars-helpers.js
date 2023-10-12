const moment = require("moment/moment");

module.exports = {
    ifeq: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    bar: function () {
        return "BAR!";
    },
    genTime: function (date, format) {
        return moment(date).format(format);

    }
    ,
    extracost: function (value) {
        return 0.2 * value;
    },
    addedWishlist: function (value1, value2) {
        return (value1 === value2) ? "v" : "";
    },
    phoneNumberFormat: function (phoneNumber) {
        // Strip out all non-digit characters
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        // Format as a 7- or 10- digit phone number
        var len = phoneNumber.length;
        if (len == 7)
            phoneNumber = phoneNumber.replace(/([0-9]{3})([0-9]{4})/g, '$1-$2');
        else if (len == 10)
            phoneNumber = phoneNumber.replace(/([0-9]{3})([0-9]{3})([0-9]{4})/g, '($1) $2-$3');
        return phoneNumber;
    },
    beautyNumber: function (number) {
        return Math.floor(number);
    }
}