Date.prototype.format = function(format) {
    var MON4 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MON3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var DAY4 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var DAY3 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var M = this.getMonth() + 1;
    var D = this.getDate();
    var h = this.getHours();
    var m = this.getMinutes();
    var s = this.getSeconds();
    var formats = {
        DDDD: DAY4[(this.getDay() + 6) % 7],
        DDD: DAY3[(this.getDay() + 6) % 7],
        DD: (D < 10 ? ('0' + D) : ('' + D)),
        '!D': D,
        MMMM: MON4[M - 1],
        MMM: MON3[M - 1],
        MM: (M < 10 ? ('0' + M) : ('' + M)),
        '!M': M,
        YYYY: this.getFullYear(),
        YY: (this.getFullYear().toString().substr(2) * 1),
        hh: (h < 10 ? ('0' + h) : ('' + h)),
        //        h: h,
        mm: (m < 10 ? ('0' + m) : ('' + m)),
        //        m: m,
        ss: (s < 10 ? ('0' + s) : ('' + s)),
        //        s: s,
    };
    for (var typ in formats)
        format = format.replace(typ, formats[typ]);
    //            format = format.replace(typ, "<span class='" + typ + "'>" + formats[typ] + "</span>");
    return format;
}