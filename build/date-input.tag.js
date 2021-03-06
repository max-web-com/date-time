document.head.insertAdjacentHTML('beforeend', `<template id="date-input"><style>*{font-family:"Helvetica Neue";font-weight:100;font-size:25px;cursor:pointer}#placeholder{color:#aaa;font-style:italic}#fog{position:fixed;left:0;right:0;top:0;bottom:0;background:#eee;opacity:0.9}date-picker{position:fixed;left:0;right:0;margin:0 auto;z-index:100}
</style><div id="placeholder"></div><date-format hidden></date-format><div id="fog" hidden></div><date-picker class="light2"></date-picker></template>`);
			window.customElements.define('date-input', class extends HTMLElement {
				constructor() {
					super();
					this.attachShadow({mode: 'open'}).appendChild(document.querySelector('template#date-input').content.cloneNode(true));
					
				}
				
				
			 	
	connectedCallback(){ 
		this.$ = q => this.shadowRoot.querySelector(q);
		this.$("#placeholder").addEventListener('click',this.open.bind(this));
		this.$("date-format").addEventListener('click',this.open.bind(this));
		this.$("date-picker").addEventListener('change',this.close.bind(this));
		this.$("date-picker").addEventListener('cancel',this.close.bind(this));
		this.$("#fog").addEventListener('click',this.close.bind(this));
	}
	open(event){
		this.$('#fog').hidden = false;
		this.$("date-picker").hidden = false;
	}
	close(event){
		if(event.type=='change'){
			this.$("date-format").setAttribute("date",event.detail);
			this.setAttribute('value',event.detail);
			this.$("date-format").hidden = false;
			this.$("#placeholder").hidden = true;
		}
		this.$('#fog').hidden = true;
		this.$('date-picker').hidden = true;
	}

	static get observedAttributes() {
		return ['value','format','placeholder'];
	}
	attributeChangedCallback(attr, oldVal, newVal) {
		switch(attr){
			case 'format':
				this.$("date-format").setAttribute('format',newVal);
				break;
			case 'placeholder':
				this.$('#placeholder').innerHTML = newVal;
				break;
		}
	}
// 	*{font-family: Helvetica Neue; font-weight: 100; font-size: 25px; cursor: pointer;}
// #placeholder{color: #aaa; font-style: italic;}
// #fog{position: fixed; left:0; right:0; top:0; bottom:0; background:#eee; opacity: 0.9;}
// date-picker{position: fixed; left:0; right:0; margin: 0 auto; z-index: 100;}


			});