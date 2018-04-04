document.head.insertAdjacentHTML('beforeend', `<template id="date-picker"><style>:host{--bg1:#333;--bg2:#444;--bg-hover:#666;--fg1:#fff;--fg2:#aaa;--border:#444;display:block;width:400px;background:var(--bg1);border:2px solid var(--border);overflow:hidden}:host([hidden]){display:none}:host(.light){--bg1:#eee;--bg2:#ddd;--bg-hover:#aaa;--fg1:#000;--fg2:#666;--border:#ddd}*{font-family:Helvetica Neue;font-weight:100;color:var(--fg1);font-size:25px}td,b{padding:10px 0}header{text-align:center;font-size:30px;padding:10px;font-variant:small-caps;font-weight:200;background:var(--bg2)}footer{background:var(--bg2)}footer table{width:100%;border-collapse:collapse}footer td{width:50%;text-align:center;font-size:25px}footer td:first-child{border-right:1px solid var(--bg1)}footer td:hover{background:var(--bg-hover)}main [id] [id]{cursor:pointer}main [id] [id]:hover{background:var(--bg-hover)}#years{overflow-x:scroll;overflow-y:hidden;white-space:nowrap}#years table{display:inline-block;vertical-align:middle}#years td{padding:10px 10px}#years b{font-weight:200;vertical-align:middle;display:inline-block;margin-left:20px}#months{width:100%}#months td{font-variant:small-caps;text-align:center}#days{width:100%}#days td{text-align:center}#days td:nth-child(6){color:var(--fg2)}#days td:nth-child(7){color:var(--fg2)}hr{border:1px solid var(--bg2);margin:0}.selected{background:var(--bg-hover)}
</style><header></header><main><div id="years"></div><hr><table id="months"></table><hr><table id="days"></table></main><footer><table><td id="ok">OK</td><td id="cancel">Cancel</td></table></footer></template>`);
			window.customElements.define('date-picker', class extends HTMLElement {
				constructor() {
					super();
					this.attachShadow({mode: 'open'}).appendChild(document.querySelector('template#date-picker').content.cloneNode(true));
					
				}
				
				
			 	
	connectedCallback(){
		this.hidden = true;
		this.$ = q => this.shadowRoot.querySelector(q);
		this.dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
		this.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
		this.$('#years').addEventListener('click',event=>this.setDate('year',event.target.id.substr(1)));
		this.$('#months').addEventListener('click',event=>this.setDate('month',event.target.id.substr(1)));
		this.$('#days').addEventListener('click',event=>this.setDate('day',event.target.id.substr(1)));
		this.$('footer').addEventListener('click',event=>this.close(event.target));
		let today = new Date();
		this.year = today.getFullYear();
		this.month = today.getMonth()+1;
		this.day = today.getDate();
		this.makeYears();
		this.makeMonths();
		this.makeDays();
	}
	static get observedAttributes() {
		return ['date', 'hidden', 'month-names','day-names','decades'];
	} 
	attributeChangedCallback(attr, oldVal, newVal) {
		// console.log(attr, newVal);
		switch(attr){
			case 'date':
				let D = newVal.split('-');
				this.setDate('year',D[0]);
				this.setDate('month',D[1]);
				this.setDate('day',D[2]);
				break;
			case 'hidden':
				this.showYear(); break;
			case 'month-names':
				this.monthNames = newVal.split(','); break;
			case 'day-names':
				this.dayNames = newVal.split(','); break;
		}
	}

	makeYears(){
		var html = '';
		var td = y => `<td id="y${y}">${y}</td>`;
		var tr = y => `<tr> ${td(y+0)} ${td(y+3)} ${td(y+6)} </tr>`;
		for(var i=190; i<205; i++){
			let y = i*10;
			html += `<b id='y${y}'>${y}</b> <table> ${tr(y+1)} ${tr(y+2)} ${tr(y+3)} </table>`;
		}
		this.$('#years').innerHTML = html;
		this.setDate('year',this.year);
		this.showYear();
	}
	showYear(){
		// this.$('#years').scrollTo(this.$('#years .selected').offsetLeft,0)
		try{this.$('#years .selected').scrollIntoView();}catch(e){}
		// this.$('#years').scrollBy(this.$('#years').offsetWidth/2,0)
		this.$('#years').scrollBy(100,0)
	}
	makeMonths(){
		var td = m => `<td id="m${m}">${this.monthNames[m-1]}</td>`;
		var tr = m => `<tr> ${td(m+0)} ${td(m+3)} ${td(m+6)} ${td(m+9)} </tr>`;
		this.$('#months').innerHTML = tr(1) + tr(2) + tr(3);
		this.setDate('month',this.month);
	}
	makeDays(){
		var td = d => `<td id="d${d}">${d}</td>`;
		var days = new Date(this.year, this.month, 0).getDate();
		let html = '<tr>';
		for(var i=1; i<this.getWeekday(1);i++)
			html += '<td></td>';
		for(var i=1; i<=days; i++){
			html += td(i);
			if(this.getWeekday(i)==7) html += '</tr><tr>'; // line break after sunday
		}
		// html += '</tr>';
		this.$('#days').innerHTML = html + '</tr>';
		this.setDate('day',this.day);
	}
	getWeekday(d){
		return (new Date(this.year,this.month-1,d).getDay() + 6) % 7 + 1 ;
	}

	setDate(typ, val){
		// console.log('names',this.dayNames);
		try{this.$(`#${typ}s .selected`).classList.remove('selected');}catch(e){}
		this.$(`#${typ}s #${typ[0]}${val}`).classList.add('selected');
		this[typ] = val;
		this.$('header').innerHTML = `${this.dayNames[this.getWeekday(this.day)-1]}, ${this.day}. ${this.monthNames[this.month-1]} ${this.year}`;
		if(typ!='day') this.makeDays();
	}
	close(node){
		if(node.id=='ok')
			this.dispatchEvent( new CustomEvent('change', { detail: `${this.year}-${this.month}-${this.day}` }) );
		if(node.id=='cancel')
			this.dispatchEvent( new CustomEvent('cancel') );
		this.hidden = true;
	}

			});