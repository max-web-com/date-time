Date.prototype.format = function(format,locale) {
    if(!locale)locale = 'lookup';
    var L = function(c){return this.toLocaleString(locale, c);}.bind(this);
    var n = 'numeric';
    var d = '2-digit';
    var formats = {
        DDDD: L({weekday:'long'}),
        DDD: L({weekday:'short'}),
        DD: L({day:d}),
        '!D': L({day:n}),
        MMMM: L({month:'long'}),
        MMM: L({month:'short'}),
        MM: L({month:d}),
        '!M': L({month:n}),
        YYYY: L({year:n}),
        YY: L({year:d}), 
        hh: L({hour:d,hour12:false}),
        '!h': L({hour:n,hour12:false}),
        mm: L({minute:d}),
        '!m': L({minute:n}),
        ss: L({second:d}),
        '!s': L({second:n}),
    };
    for (var typ in formats)
        format = format.replace(typ, formats[typ]);
    return format;
}