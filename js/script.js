window.addEventListener('DOMContentLoaded', () => {
    $('#start').click();

    function nameStart() {
        const name = document.querySelector('.nameStart').value;
        if (name == '') {
            $('h2').eq(0).html(`Мы не знаем как Вас зовут но уверенны что это предложение Вас заинтересует!`)
        } else {
            $('h2').eq(0).html(`Это предложение именно для вас ${name}!`)
        }
    }
    $('.closeStartModal').click(() => {
        nameStart();
	});

	class Customizator {
		constructor() {
			this.btnBlock = document.createElement('div');
			this.colorPicker = document.createElement('input');
	
			this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
			this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
		}
	
		onScaleChange(e) {
			let scale;
			const body = document.querySelector('body');
			if (e.target.value) {
				scale = +e.target.value.replace(/x/g, '');
			}
	
			function recursy(elem) {
				elem.childNodes.forEach(node => {
					if (node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, '').length > 0) {
						if (!node.parentNode.getAttribute('data-fz')) {
							let value = window.getComputedStyle(node.parentNode, null).fontSize;
							node.parentNode.setAttribute('data-fz', +value.replace(/px/g, ''));
							node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + "px";
						} else {
							node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * scale + "px";
						}
					} else {
						recursy(node);
					}
	
				});
			}
	
	
			recursy(body);
		}
	
		onColorChange(e) {
			const body = document.querySelector('body');
			document.body.style.backgroundImage = 'none';
			body.style.backgroundColor = e.target.value;
			if (body.style.backgroundColor = `rgb(255, 255, 255`) {
				document.body.style.background = `url(/img/123.png)`;
			} else {
			    body.style.backgroundColor = e.target.value;
			    }
			
		}
	
		injectStyle() {
			const style = document.createElement('style');
			style.innerHTML = `
				.panel {
					display: flex;
					justify-content: space-around;
					align-items: center;
					position: fixed;
					top: 10px;
					right: 0;
					border: 1px solid rgba(0,0,0, .2);
					box-shadow: 0 0 20px rgba(0,0,0, .5);
					width: 300px;
					height: 60px;
					background-color: #fff;
				
				}
				
				.scale {
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 150px;
					height: 40px;
				}
				.scale_btn {
					display: block;
					width: 45px;
					height: 40px;
					border: 1px solid rgba(0,0,0, .2);
					border-radius: 4px;
					font-size: 18px;
					margin-right: 0;
					padding: 0;
				}
				.party_btn {
					display: block;
					width: 45px;
					height: 40px;
					border: 1px solid rgba(0,0,0, .2);
					border-radius: 4px;
					font-size: 18px;
				}
				
				.disco {
					background: yellow;
					font-size: 15px;
					margin-right: 0;
					padding: 0;
				}
				
				.color {
					width: 40px;
					height: 40px;
					margin-right: 0;
					padding: 0;
				}
			`;
			document.querySelector('head').appendChild(style);
		}
	
		render() {
			this.injectStyle();
			let scaleInputsS = document.createElement('input'),
				scaleInputsM = document.createElement('input'),
				disco = document.createElement('input'),
				panel = document.createElement('div');
	
			panel.append(this.btnBlock, this.colorPicker);	
	
			scaleInputsS.classList.add('scale_btn');
			scaleInputsM.classList.add('scale_btn');
			disco.classList.add('party_btn', 'disco');
			this.btnBlock.classList.add('scale');
			this.colorPicker.classList.add('color');
	
			scaleInputsS.setAttribute('type', 'button');
			scaleInputsM.setAttribute('type', 'button');
			disco.setAttribute('type', 'button');
			scaleInputsS.setAttribute('value', '1x');
			scaleInputsM.setAttribute('value', '1.5x');
			disco.setAttribute('value', 'party');
			this.colorPicker.setAttribute('type', 'color');
			this.colorPicker.setAttribute('value', '#ffffff');
	
	
	
			this.btnBlock.append(scaleInputsS, scaleInputsM, disco);
	
			panel.classList.add('panel');
			document.querySelector('body').append(panel);
	
			const discoParty = function() {
				document.body.style.backgroundImage = 'none';
				let i = 0;
				let getNum = function() {
					return Math.floor(Math.random() * 256);
				};
				let timer = setTimeout(function color() {
						document.body.style.backgroundColor = 'rgb(' + getNum() + ',' + getNum() + ',' + getNum() + ')';
						timer = setTimeout(color, 300);
					i++
					if(i == 100) {
						clearTimeout(timer);
					}
					}, 300);
				disco.removeEventListener('click', discoParty);
				disco.addEventListener('click', function() {
					clearTimeout(timer);
					document.body.style.background = `url(/img/123.png)`;
					disco.addEventListener('click', discoParty);
					
				});
				
			};
	
			disco.addEventListener('click', discoParty);
			
	
	
		}
	}
	const panel = new Customizator();
	panel.render();

});
