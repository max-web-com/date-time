window.customElements.define('date-format', class extends HTMLElement {
	constructor() {
		super();
		this.date = new Date();
		this.format = 'DD. MMM. YYYY';
		// this.update();
	}
	static get observedAttributes() {
		return ['date', 'format'];
	}
	attributeChangedCallback(attr, oldVal, newVal) {
		console.log(attr, newVal);
		this[attr] = newVal;
		this.update();
	}
	update() {
		console.log(this.date, new Date(Date.parse(this.date)));
		if (this.date && this.format)
			this.innerText = new Date(Date.parse(this.date)).format(this.format);
	}
});