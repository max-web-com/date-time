document.head.insertAdjacentHTML('beforeend', `<template id="time-picker"><style>:host{display:block;width:400px;background:#333;overflow:hidden}:host([hidden]){display:none}table{width:100%}.main{border-collapse:collapse}.sep{background:#444;color:#333;font-size:40px;font-weight:bold;width:10px}*{font-family:Helvetica Neue;font-weight:100;color:white;font-size:25px}[id]{cursor:pointer;padding:10px;text-align:center}[id]:hover{background:#555}header{text-align:center;font-size:30px;padding:7px;font-weight:200}header,footer{background:#444}footer table{width:100%;border-collapse:collapse}footer td{width:50%;text-align:center;font-size:25px}footer #ok{border-right:1px solid #333}.selected{background:#666}#m5,#m35,#m25,#m55{color:#777}#m10,#m40,#m20,#m50{color:#aaa}#h0,#h1,#h2,#h3,#h4,#h5{color:#777}#h18,#h19,#h20,#h21,#h22,#h23{color:#aaa}</style><header></header><table class="main"><tr><td class="hours"></td><td class="sep">:</td><td class="minutes"></td></tr></table><footer><table><td id="ok">OK</td><td id="cancel">Cancel</td></table></footer></template>`);
			window.customElements.define('time-picker', class extends HTMLElement {
				constructor() {
					super();
					this.attachShadow({mode: 'open'}).appendChild(document.querySelector('template#time-picker').content.cloneNode(true));
					
				}
				
				
			 	
	connectedCallback(){
		this.$ = q => this.shadowRoot.querySelector(q);
		// this.$('.main').addEventListener('click',event=>this.setTime2(event.target));
		this.$('.hours').addEventListener('click',event=>this.setTime('hour',event.target.id.substr(1)));
		this.$('.minutes').addEventListener('click',event=>this.setTime('minute',event.target.id.substr(1)));
		this.$('footer').addEventListener('click',event=>this.close(event.target));
		let now = new Date();
		this.hour = now.getHours();
		// now.setMinutes(58);
		this.minute = Math.round(now.getMinutes()/5)*5%60;
		if(now.getMinutes()>57) this.hour++; // 20:58 => 21:00
		this.makeHours();
		this.makeMinutes();
	}
	static get observedAttributes() {
		return ['time'];
	}
	attributeChangedCallback(attr, oldVal, newVal) {
		// console.log(attr, newVal);
		// switch(attr){
		// 	case 'date':
		// 		let D = newVal.split('-');
		// 		this.setDate('year',D[0]);
		// 		this.setDate('month',D[1]);
		// 		this.setDate('day',D[2]);
		// 		break;
		// }
	}
	n2(x){
		return x<10?'0'+x:x;
	}
	makeHours(){
		var html = '<table>';
		var td = x => `<td id="h${x}">${this.n2(x)}</td>`;
		var tr = h => `<tr> ${td(h)} ${td(h+6)} ${td(h+12)} ${td(h+18)} </tr>`;
		for(var i=0; i<6; i++)
			html += tr(i);
		html += '</table>';
		this.$('.hours').innerHTML = html;
		this.setTime('hour',this.hour);
	}
	makeMinutes(){
		var html = '<table>';
		var td = x => `<td id="m${x}">${this.n2(x)}</td>`;
		var tr = m => `<tr> ${td(m)} ${td(m+30)} </tr>`;
		for(var i=0; i<6; i++)
			html += tr(i*5);
		html += '</table>';
		this.$('.minutes').innerHTML = html;
		this.setTime('minute',this.minute);
	}

	setTime(typ, val){
		// console.log('names',this.dayNames);
		try{this.$(`.${typ}s .selected`).classList.remove('selected');}catch(e){}
		this.$(`.${typ}s #${typ[0]}${val}`).classList.add('selected');
		this[typ] = val;
		this.$('header').innerHTML = `${this.n2(this.hour)} : ${this.n2(this.minute)}`;
	}
	close(node){
		if(node.innerText=='OK')
			this.dispatchEvent( new CustomEvent('change', { detail: `${this.year}-${this.month}-${this.day}` }) );
		this.hidden = true;
	}



			});