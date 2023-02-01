let div = null;//global decleration

window.onload = () =>{
    main();
}
function main (){
    const root = document.getElementById('root');
    const btn = document.getElementById('change-btn');
    const output = document.getElementById('output');
    const output2 = document.getElementById('output2');
    const copybtn = document.getElementById('copy-btn');
    const copybtn2 = document.getElementById('copy-btn2');



    btn.addEventListener('click',function(){
        const color = generateDecimalColor();
        const hex = generateHexColor(color);
        const rgb = generateRGBcolor(color);
        root.style.backgroundColor = hex;
        output.value = hex.substring(1);
        output2.value = rgb;
    })

    copybtn.addEventListener('click',function(){
        navigator.clipboard.writeText(`#${output.value}`);
        copybtn.innerHTML = "code copied";
        if (div !== null){
			div.remove();
			div = null;
		}
        if(isValidHex(output.value)){
            generateTostmessage(`#${output.value} copied`);
        }else{
       alert('invalid color code');     
        }
		
    })
    copybtn2.addEventListener('click',function(){
        navigator.clipboard.writeText(`#${output2.value}`);
        copybtn.innerHTML = "code copied";
        if (div !== null){
			div.remove();
			div = null;
		}
        if(isValidHex(output.value)){
            generateTostmessage(`${output2.value} copied`);
        }else{
       alert('invalid color code');     
        }
		
    })
    output.addEventListener('keyup',function(e){
        const color = e.target.value;
        if(color){
            output.value = color.toUpperCase()
            if(isValidHex(color)) {
                root.style.backgroundColor = `#${color}`; 
                output2.value = HexTorgb(color);
            }
        }

    })
}


//function-1
function generateDecimalColor (){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    
    return {
        red,
        green,
        blue,
    };
}


//function-2
function generateHexColor ({red, green, blue}) {
    const getTwocode = (value) => {
        const hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    };
    return `#${getTwocode(red)}${getTwocode(green)}${getTwocode(blue)}` .toUpperCase();
}


//function-3
function generateRGBcolor({red, green, blue}){
    return `rgb(${red}, ${green}, ${blue})`;
}

function HexTorgb (hex) {
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue =parseInt(hex.slice(4), 16);

    return `(${red}, ${green}, ${blue})`;
}


function generateTostmessage (message){
    div = document.createElement('div');
    div.innerText = message;
    div.className = 'toast-message toast-message-slide-in';

	div.addEventListener('click', function () {
		div.classList.remove('toast-message-slide-in');
		div.classList.add('toast-message-slide-out');

		div.addEventListener('animationend', function () {
			div.remove();
			div = null;
		})
	})
    document.body.appendChild(div);
}

function isValidHex (color) {
if(color.length !== 6 ) return false;

return /^[0-9A-Fa-f]{6}$/i.test(color);
}