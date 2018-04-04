	// setYear(year){
	// 	if(this.year) this.$('#y'+this.year).classList.remove('selected');
	// 	this.$('#y'+year).classList.add('selected');
	// 	this.year = year;
	// 	this.setDate();
	// }
	// setMonth(month){
	// 	if(this.month) this.$('#m'+this.month).classList.remove('selected');
	// 	this.$('#m'+month).classList.add('selected');
	// 	this.month = month;
	// 	this.makeDays();
	// 	this.setDate();
	// }
	// setDay(day){
	// 	if(this.day) this.$('#d'+this.day).classList.remove('selected');
	// 	this.$('#d'+day).classList.add('selected');
	// 	this.day = day;
	// 	this.setDate();
	// }
	// setDate(){
	// 	this.$('header').innerHTML = `${this.day}. ${this.monthNames[this.month-1]} ${this.year}`;
	// }



	// setTime2(node){
	// 	let val = node.id.substr(1);
	// 	let typ = node.parentElement.parentElement.parentElement.getAttribute('class');
	// 	// event=>this.setTime('hour',event.target.id.substr(1))

	// 	// console.log('names',this.dayNames);
	// 	try{this.$(`#${typ}s .selected`).classList.remove('selected');}catch(e){}
	// 	this.$(`#${typ}s #${typ[0]}${val}`).classList.add('selected');
	// 	this[typ] = val;
	// 	this.$('header').innerHTML = `${this.n2(this.hour)} : ${this.n2(this.minute)}`;
	// }
	// makeHours(){
	// 	var html = '<table>';
	// 	var td = x => `<td id="h${x}">${this.n2(x)}</td>`;
	// 	var tr = h => `<tr> ${td(h)} ${td(h+1)} ${td(h+2)} ${td(h+3)} </tr>`;
	// 	for(var i=0; i<6; i++)
	// 		html += tr(i*4);
	// 	html += '</table>';
	// 	this.$('#hours').innerHTML = html;
	// 	this.setTime('hour',this.hour);
	// }
	// makeMinutes(){
	// 	var html = '<table>';
	// 	var td = x => `<td id="m${x}">${this.n2(x)}</td>`;
	// 	var tr = m => `<tr> ${td(m)} ${td(m+5)} </tr>`;
	// 	for(var i=0; i<6; i++)
	// 		html += tr(i*10);
	// 	html += '</table>';
	// 	this.$('#minutes').innerHTML = html;
	// 	this.setTime('minute',this.minute);
	// }
