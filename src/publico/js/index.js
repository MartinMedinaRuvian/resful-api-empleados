var aux = 0;

setInterval('contador_bienvenida()', 1000);
setInterval('contador_yolenith()', 2000);
setInterval('contador_titulo()', 1000);




function contador(titulo, color1, color2){
   if(aux % 2 !== 0){
    titulo.style.color=color1;
   }else{
    titulo.style.color=color2;
   }
   aux ++;
   console.log(aux)
}

function contador_bienvenida(){
    var titulo = document.querySelector('#lbltitulo_bienvenida');
    var color1 = "#448AFF";
    var color2 = "#00C853";
    contador(titulo, color1, color2);
}

function contador_yolenith(){
    var titulo = document.querySelector('#lbltitulo_yolenith');
    var color1 = "#000";
    var color2 = "#448AFF";
    contador(titulo, color1, color2);
}

function contador_titulo(){
    var titulo = document.querySelector('#lbltitulo');
    var color1 = "#000";
    var color2 = "#448AFF";
    contador(titulo, color1, color2);
}

//Modal Popup Controller
function toggle_visibility(id){
    var e = document.getElementById(id);

if(e.style.display == 'block')
    e.style.display = 'none';
else 
    e.style.display = 'block';
}