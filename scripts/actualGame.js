/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */
var tiempo;
var arrayQuesitosID = [1,8,15,22,29];
var elementoMayor;
var elementoMenor;

function pintaPosicionesPosibles(posicionMayor, posicionMenor){
    if (arrayQuesitosID.indexOf(posicionMayor) > -1){
        var context1 = document.getElementById(posicionMayor).firstElementChild.getContext('2d');
        elementoMayor = document.getElementById(posicionMayor).firstElementChild;
        elementoMayor.onclick = function(){
            if (elementoMayor.className != "tiraOtraVez"){
                clickado(posicionMayor,elementoMayor.className);
            }else{
                clickTiraOtraVez(posicionMayor);
            }
        }
    }else{
        var context1 = document.getElementById(posicionMayor).getContext('2d');
        elementoMayor = document.getElementById(posicionMayor);
        elementoMayor.onclick = function(){
            if (elementoMayor.className != "tiraOtraVez"){
                clickado(posicionMayor,elementoMayor.className);
            }else{
                clickTiraOtraVez(posicionMayor);
            }
        }
    }
    if (arrayQuesitosID.indexOf(posicionMenor) > -1){
        var context2 = document.getElementById(posicionMenor).firstElementChild.getContext('2d');
        document.getElementById(posicionMenor).firstElementChild.onclick = function(){
            if (document.getElementById(posicionMenor).firstElementChild.className != "tiraOtraVez"){
                clickado(posicionMenor,document.getElementById(posicionMenor).firstElementChild.className);
            }else{
                clickTiraOtraVez(posicionMenor);
            }
        }
    }else{
        var context2 = document.getElementById(posicionMenor).getContext('2d');
        document.getElementById(posicionMenor).onclick = function(){
            if (document.getElementById(posicionMenor).className != "tiraOtraVez"){
                clickado(posicionMenor,document.getElementById(posicionMenor).className);
            }else{
                clickTiraOtraVez(posicionMenor);
            }
        }
    }
    context1.fillStyle = 'white';
    context1.fill();
    context1.lineWidth = 3;
    context1.stroke();
    context2.fillStyle = 'white';
    context2.fill();
    context2.lineWidth = 3;
    context2.stroke();
}

function calculaPosicion(tirada){
    var posicionActualUsuario = parseInt(document.getElementById('posicionActualUsuario').value);
    //Calculamos la primera posición posible de movimiento
    if (posicionActualUsuario - parseInt(tirada) > parseInt("0")){
        posicionMenor = posicionActualUsuario - parseInt(tirada);
    }else{
        posicionMenor = parseInt("35") + posicionActualUsuario - parseInt(tirada);
    }
    //Calculamos la segunda posición posible de movimiento
    if (posicionActualUsuario + parseInt(tirada) <= parseInt("35")){
        posicionMayor = posicionActualUsuario + parseInt(tirada);
    }else{
        posicionMayor = posicionActualUsuario + parseInt(tirada) - parseInt("35");
    }
    pintaPosicionesPosibles(posicionMayor, posicionMenor);
}

function tirar(){
    //Paramos el timeOut de cambio de imagen del fondo.
    clearTimeout(tiempo);
    //Evitamos que se pueda tirar otra vez
    document.getElementById('dado').onclick=null;
    //Generamos el número que marcará el dado y lo pintamos
    num = Math.floor((Math.random()*6)+1);
    document.getElementById('dado').style.backgroundImage ="url(/static/"+num+".png)";
    //Marcamos las casillas donde podemos ir
    calculaPosicion(num);
}

function cargaQuesitos(){
    var quesitos = ["quesitoHistoria", "quesitoCiencia", "quesitoEspectaculos", "quesitoDeportes", "quesitoLiteratura"]
    for (var quesito in quesitos){
        var objetoCanvas = document.getElementById(quesitos[quesito]);
        if(objetoCanvas.getContext){
            var context = objetoCanvas.getContext('2d');
            context.beginPath();
            var text;
            //Nos colocamos en el centro del canvas
            context.rect(0,0,60,60)
            if (quesitos[quesito] == "quesitoHistoria"){
                context.fillStyle = "yellow";
                text = "Historia";
            }else if (quesitos[quesito] == "quesitoCiencia"){
                context.fillStyle = "#1CB429";
                text = "Ciencia";
            }else if (quesitos[quesito] == "quesitoEspectaculos"){
                context.fillStyle = "#FF4BD0";
                text = "Espectaculos";
            }else if (quesitos[quesito] == "quesitoDeportes"){
                context.fillStyle = "#34A6E3";
                text = "Deportes";
            }else if (quesitos[quesito] == "quesitoLiteratura"){
                context.fillStyle = "#74400C";
                text = "Literatura";
            }
            context.fill()
            var x = 10; // Posición en el eje X donde empezar a dibujar.
            var y = 10; // Posición en el eje Y donde empezar a dibujar.
            context.fillStyle = 'white'; // Color del texto
            context.textBaseline = "top"; // Línea base del texto
            context.font = '10px Verdana'; // Tamaño y estilo de la fuente

            context.fillText(text , x, y); // Pintamos el texto.
            context.lineWidth = 3
            context.strokeStyle = "black"
            context.stroke();
        }
    }
}

function cargaCasillas(){
    // Creamos un array con todas las etiquetas del HTML
    allHTMLTags = document.getElementsByTagName("canvas");
    // Las recorremos
    for (i=0; i<allHTMLTags.length; i++) {
        var casillaActual = allHTMLTags[i];
        if(casillaActual.id.indexOf("quesito")== -1){
            //Si no es un quesito
            if(document.getElementById(allHTMLTags[i].id).getContext){
                var context = document.getElementById(casillaActual.id).getContext('2d');
                context.rect(0,0,30,50)
                context.clearRect();
                //si saco aquí la creación comun del elemento context no funciona
                if (allHTMLTags[i].className=="Ciencia") {
                    context.fillStyle = "#1CB429";
                }else if (allHTMLTags[i].className=="Historia") {
                    context.fillStyle = 'yellow';
                }else if (allHTMLTags[i].className=="Deportes") {
                    context.fillStyle = '#34A6E3';
                }else if (allHTMLTags[i].className=="Literatura") {
                    context.fillStyle = '#74400C';
                }else if (allHTMLTags[i].className=="Espectaculos") {
                    context.fillStyle = '#FF4BD0';
                }else if (allHTMLTags[i].className=="tiraOtraVez") {
                    context.fillStyle = 'FF0101';
                    //TODO: Intentar hacer un cubo en 3D con líneas del canvas;
                    context.moveTo(10,10);
                    context.lineTo(20,10);
                    context.lineTo(20,20);
                    context.lineTo(10,20);
                    context.lineTo(10,10);
                }
                context.fill();
                context.lineWidth = 3;
                context.stroke();
            }
        }
    }
}

//Cargamos el tablero de juego
window.onload=function() {
    var allHTMLTags = new Array();
    var allCanvas = new Array();
    cargaQuesitos();
    cargaCasillas();
    pintaPosicionOponente();
    pintaNuevaPosicion();
    if (document.getElementById("turno").value =="True"){
        girarDado();
    }else{
        document.getElementById("dado").hidden = "hidden";
        quitaClicks();
    }
}

function clickTiraOtraVez(id){
    cargaCasillas();
    cargaQuesitos();
    actualizaPosicion(id);
    pintaPosicionOponente();
    pintaNuevaPosicion();
    girarDado();
}

function actualizaPosicion(id){
    document.getElementById('posicionActualUsuario').value = id;
}

var imagenes=new Array()

imagenes[0]= new Image(100,100);
imagenes[0].src = "/static/1.png";

imagenes[1]= new Image(100,100);
imagenes[1].src = "/static/2.png";

imagenes[2]= new Image(100,100);
imagenes[2].src = "/static/3.png";

imagenes[3]= new Image(100,100);
imagenes[3].src = "/static/4.png";

imagenes[4]= new Image(100,100);
imagenes[4].src = "/static/5.png";

imagenes[5]= new Image(100,100);
imagenes[5].src = "/static/6.png";

function quitaClicks(){
    allCanvasTags = document.getElementsByTagName("canvas");
    for (i=0; i<allCanvasTags.length; i++) {
        document.getElementById(allCanvasTags[i].id).onclick = null;
    }
}

function girarDado(){
    //Activamos el onclick y lo ponemos a girar.
    document.getElementById('dado').onclick= function(){tirar()};
    quitaClicks();
    giraDado();
}

function giraDado(){
    num = Math.floor((Math.random()*6));
    document.getElementById('dado').style.backgroundImage ="url("+imagenes[num].src+")";
    tiempo=window.setTimeout('giraDado()',100);
    //cambia la cantidad por el tiempo que quieras que transcurra entre imagen e imagen
}

function quitaLightbox(respuesta){
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
    document.getElementById('respuesta'+respuesta).style.background= '#66add6';
    for (i = 1; i < 5; i++){
        document.getElementById('respuesta'+i).innerHTML="";
    }
}

function pintaNuevaPosicion(){
    if (arrayQuesitosID.indexOf(parseInt(document.getElementById('posicionActualUsuario').value)) > -1){
        var contexto = document.getElementById(document.getElementById('posicionActualUsuario').value).firstElementChild.getContext('2d');
    }else{
        var contexto = document.getElementById(document.getElementById('posicionActualUsuario').value).getContext('2d');
    }
    contexto.fillStyle= 'black';
    contexto.fill();
}

function pintaPosicionOponente(){
    if (arrayQuesitosID.indexOf(parseInt(document.getElementById('posicionActualOtro').value)) > -1){
        var contexto = document.getElementById(document.getElementById('posicionActualOtro').value).firstElementChild.getContext('2d');
    }else{
        var contexto = document.getElementById(document.getElementById('posicionActualOtro').value).getContext('2d');
    }
    contexto.fillStyle= '';
    contexto.fill();
}
