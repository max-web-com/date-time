var test = /** @class */ (function () {
    function test() {
        var _this = this;
        this.hidden = true;
        this.$ = function (q) { return _this.shadowRoot.querySelector(q); };
        if (!this.dayNames)
            this.dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.$('#years').addEventListener('click', function (event) { return _this.setDate('year', event.target.id.substr(1)); });
        this.$('#months').addEventListener('click', function (event) { return _this.setDate('month', event.target.id.substr(1)); });
        this.$('#days').addEventListener('click', function (event) { return _this.setDate('day', event.target.id.substr(1)); });
        this.$('footer').addEventListener('click', function (event) { return _this.close(event.target); });
        var today = new Date();
        this.year = today.getFullYear();
        this.month = today.getMonth() + 1;
        this.day = today.getDate();
        this.makeYears();
        this.makeMonths();
        this.makeDays();
    }
    Object.defineProperty(test, "observedAttributes", {
        get: function () {
            return ['date', 'hidden', 'month-names', 'day-names'];
        },
        enumerable: true,
        configurable: true
    });
    test.prototype.attributeChangedCallback = function (attr, oldVal, newVal) {
        // console.log(attr, newVal);
        switch (attr) {
            case 'date':
                var D = newVal.split('-');
                this.setDate('year', D[0]);
                this.setDate('month', D[1]);
                this.setDate('day', D[2]);
                break;
            case 'hidden':
                this.showYear();
                break;
            case 'month-names':
                this.monthNames = newVal.split(',');
                break;
            case 'day-names':
                this.dayNames = newVal.split(',');
                break;
        }
    };
    test.prototype.makeYears = function () {
        var html = '';
        var td = function (y) { return "<td id=\"y" + y + "\">" + y.toString().substr(2) + "</td>"; };
        var tr = function (y) { return "<tr> " + td(y + 0) + " " + td(y + 3) + " " + td(y + 6) + " </tr>"; };
        for (var i = 190; i < 205; i++) {
            var y = i * 10;
            html += "<b id='y" + y + "'>" + y + "</b> <table> " + tr(y + 1) + " " + tr(y + 2) + " " + tr(y + 3) + " </table>";
        }
        this.$('#years').innerHTML = html;
        this.setDate('year', this.year);
        this.showYear();
    };
    test.prototype.showYear = function () {
        // this.$('#years').scrollTo(this.$('#years .selected').offsetLeft,0)
        try {
            this.$('#years .selected').scrollIntoView();
        }
        catch (e) { }
        // this.$('#years').scrollBy(this.$('#years').offsetWidth/2,0)
        this.$('#years').scrollBy(100, 0);
    };
    test.prototype.makeMonths = function () {
        var _this = this;
        var td = function (m) { return "<td id=\"m" + m + "\">" + _this.monthNames[m - 1] + "</td>"; };
        var tr = function (m) { return "<tr> " + td(m + 0) + " " + td(m + 3) + " " + td(m + 6) + " " + td(m + 9) + " </tr>"; };
        this.$('#months').innerHTML = tr(1) + tr(2) + tr(3);
        this.setDate('month', this.month);
    };
    test.prototype.makeDays = function () {
        var td = function (d) { return "<td id=\"d" + d + "\">" + d + "</td>"; };
        var days = new Date(this.year, this.month, 0).getDate();
        var html = '<tr>';
        for (var i = 1; i < this.getWeekday(1); i++)
            html += '<td></td>';
        for (var i = 1; i <= days; i++) {
            html += td(i);
            if (this.getWeekday(i) == 7)
                html += '</tr><tr>'; // line break after sunday
        }
        html += '</tr>';
        this.$('#days').innerHTML = html;
        this.setDate('day', this.day);
    };
    test.prototype.getWeekday = function (d) {
        return (new Date(this.year, this.month - 1, d).getDay() + 6) % 7 + 1;
    };
    test.prototype.setDate = function (typ, val) {
        // console.log('names',this.dayNames);
        try {
            this.$("#" + typ + "s .selected").classList.remove('selected');
        }
        catch (e) { }
        this.$("#" + typ + "s #" + typ[0] + val).classList.add('selected');
        this[typ] = val;
        this.$('header').innerHTML = this.dayNames[this.getWeekday(this.day) - 1] + ", " + this.day + ". " + this.monthNames[this.month - 1] + " " + this.year;
        if (typ != 'day')
            this.makeDays();
    };
    test.prototype.close = function (node) {
        if (node.id == 'ok')
            this.dispatchEvent(new CustomEvent('change', { detail: this.year + "-" + this.month + "-" + this.day }));
        if (node.id == 'cancel')
            this.dispatchEvent(new CustomEvent('cancel'));
        this.hidden = true;
    };
    return test;
}());
