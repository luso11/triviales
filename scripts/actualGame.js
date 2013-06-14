/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */
var tiempo;
var arrayQuesitosID = [1,8,15,22,29];
var canvasPosicionMayor = null;
var canvasPosicionMenor = null;

var imagenes=new Array();

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

function pintaPosicionesPosibles(posicionMayor, posicionMenor){
    if (arrayQuesitosID.indexOf(posicionMayor) > -1){
        var context1 = document.getElementById(posicionMayor).firstElementChild.getContext('2d');
        document.getElementById(posicionMayor).firstElementChild.onclick = function(){
            if (document.getElementById(posicionMayor).firstElementChild.className != "tiraOtraVez"){
                clickado(posicionMayor,document.getElementById(posicionMayor).firstElementChild.className);
            }else{
                clickTiraOtraVez(posicionMayor);
            }
        }
        canvasPosicionMayor = document.getElementById(posicionMayor).firstElementChild;
    }else{
        var context1 = document.getElementById(posicionMayor).getContext('2d');
        document.getElementById(posicionMayor).onclick = function(){
            if (document.getElementById(posicionMayor).className != "tiraOtraVez"){
                clickado(posicionMayor,document.getElementById(posicionMayor).className);
            }else{
                clickTiraOtraVez(posicionMayor);
            }
        }
        canvasPosicionMayor = document.getElementById(posicionMayor);
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
        canvasPosicionMenor = document.getElementById(posicionMenor).firstElementChild;
    }else{
        var context2 = document.getElementById(posicionMenor).getContext('2d');
        document.getElementById(posicionMenor).onclick = function(){
            if (document.getElementById(posicionMenor).className != "tiraOtraVez"){
                clickado(posicionMenor,document.getElementById(posicionMenor).className);
            }else{
                clickTiraOtraVez(posicionMenor);
            }
        }
        canvasPosicionMenor = document.getElementById(posicionMenor);
    }

    context1.beginPath();
    context1.arc(15, 20, 10, 0, 2 * Math.PI, false);
    context1.fillStyle = 'white';
    context1.fill();
    context1.lineWidth = 3
    context1.strokeStyle = "blue"
    context1.stroke();

    context2.beginPath();
    context2.arc(15, 20, 10, 0, 2 * Math.PI, false);
    context2.fillStyle = 'white';
    context2.fill();
    context2.lineWidth = 3
    context2.strokeStyle = "blue"
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
    var num = Math.round((Math.random()*6)+1);
    document.getElementById('dado').style.backgroundImage ="url("+imagenes[num-1].src+")";
    //Marcamos las casillas donde podemos ir
    calculaPosicion(num);
}

function cargaQuesitos(){
    var quesitos = ["quesitoHistoria", "quesitoCiencia", "quesitoEspectaculos", "quesitoDeportes", "quesitoLiteratura"];
    for (var quesito in quesitos){
        var objetoCanvas = document.getElementById(quesitos[quesito]);
        if(objetoCanvas.getContext){
            var context = objetoCanvas.getContext('2d');
            context.clearRect(0, 0, 60, 60);
            context.beginPath();
            context.rect(0,0,60,60);
            if (quesitos[quesito] == "quesitoHistoria"){
                context.fillStyle = "yellow";
            }else if (quesitos[quesito] == "quesitoCiencia"){
                context.fillStyle = "#1CB429";
            }else if (quesitos[quesito] == "quesitoEspectaculos"){
                context.fillStyle = "#FF4BD0";
            }else if (quesitos[quesito] == "quesitoDeportes"){
                context.fillStyle = "#34A6E3";
            }else if (quesitos[quesito] == "quesitoLiteratura"){
                context.fillStyle = "#74400C";
            }
            context.fill();
            context.lineWidth = 3
            context.strokeStyle = "black"
            context.stroke();
        }
    }
}

function cargaCasillas(){
    //limpiamos los canvas de las posiciones anteriores
    if ((canvasPosicionMayor != null) && (canvasPosicionMenor != null)) {
        canvasPosicionMayor.width = canvasPosicionMayor.width;
        canvasPosicionMenor.width = canvasPosicionMenor.width;
    }
    // Creamos un array con todas las etiquetas canvas del HTML
    allHTMLTags = document.getElementsByTagName("canvas");
    // Las recorremos
    for (i=0; i<allHTMLTags.length; i++) {
        var casillaActual = allHTMLTags[i];
        if(casillaActual.id.indexOf("quesito")== -1 && casillaActual.id.indexOf("pieza")== -1){
            //Si no es un quesito
            if(document.getElementById(allHTMLTags[i].id).getContext){
                var context = document.getElementById(casillaActual.id).getContext('2d');
                context.rect(0,0,30,50);
                context.clearRect(0, 0, document.getElementById(casillaActual.id).width,
                    document.getElementById(casillaActual.id).height);
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
                    context.fillStyle = '#FF0101';
                    context.moveTo(10,10);
                    context.lineTo(20,10);
                    context.lineTo(20,20);
                    context.lineTo(10,20);
                    context.lineTo(10,10);
                }
                context.fill();
                context.lineWidth = 3
                context.strokeStyle = "black"
                context.stroke();
            }
        }
    }
}

//Cargamos el tablero de juego
window.onload=function() {
    cargaQuesitos();
    cargaCasillas();
    pintaPosicionOponente();
    pintaNuevaPosicion();
    pintaFichas();
    if (document.getElementById("turno").value =="True"){
        girarDado();
    }else{
        document.getElementById("dado").hidden = "hidden";
        quitaClicks();
    }
}

function clickTiraOtraVez(id){
    cargaCasillas();
    actualizaPosicion(id);
    pintaPosicionOponente();
    pintaNuevaPosicion();
    girarDado();
}

function actualizaPosicion(id){
    document.getElementById('posicionActualUsuario').value = id;
}

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
        var obj = document.getElementById(document.getElementById('posicionActualUsuario').value).firstElementChild;
    }else{
        var obj = document.getElementById(document.getElementById('posicionActualUsuario').value).parentNode;
    }
    var style = window.getComputedStyle(obj);
    var arriba = style.getPropertyValue('top');
    var izquierda = style.getPropertyValue('left');

    if (document.getElementById('posicionActualUsuario').value != 1){
        var arribaModificado = (parseInt(arriba.substr(0,3))-30).toString()+"px";
    }else{
        var arribaModificado = (parseInt(arriba.substr(0,2))-30).toString()+"px";
    }

    document.getElementById("piezaJugador").firstElementChild.style.top = arribaModificado;
    document.getElementById("piezaJugador").firstElementChild.style.left = izquierda;
}

function pintaPosicionOponente(){
    if (arrayQuesitosID.indexOf(parseInt(document.getElementById('posicionActualOtro').value)) > -1){
        var obj = document.getElementById(document.getElementById('posicionActualOtro').value).firstElementChild;
    }else{
        //El div es el padre del que tiene el id, y es a su vez el que tiene la posición.
        var obj = document.getElementById(document.getElementById('posicionActualOtro').value).parentNode;
    }
    var style = window.getComputedStyle(obj);
    var arriba = style.getPropertyValue('top');
    var izquierda = style.getPropertyValue('left');
    if (document.getElementById('posicionActualOtro').value != 1){
        var arribaModificado = (parseInt(arriba.substr(0,3))-30).toString()+"px";
    }else{
        var arribaModificado = (parseInt(arriba.substr(0,2))-30).toString()+"px";
    }
    document.getElementById("piezaRival").firstElementChild.style.top = arribaModificado;
    document.getElementById("piezaRival").firstElementChild.style.left = izquierda;
}

function pintaFichaOponente(datos){
    var data = JSON.parse(datos);
    for (var i = 0; i < 5; i++){
        if (i==0){
            var contexto = document.getElementById("piezaRemotaRombitoHistoria").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "yellow";
            if (data.Historia == 1){
                contexto.fillStyle = "yellow";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==1){
            var contexto = document.getElementById("piezaRemotaRombitoCiencia").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#1CB429";
            if (data.Ciencia == 1){
                contexto.fillStyle = "#1CB429";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==2){
            var contexto = document.getElementById("piezaRemotaRombitoEspectaculos").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#FF4BD0";
            if (data.Espectaculos == 1){
                contexto.fillStyle = "#FF4BD0";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==3){
            var contexto = document.getElementById("piezaRemotaRombitoDeportes").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#34A6E3";
            if (data.Deportes == 1){
                contexto.fillStyle = "#34A6E3";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==4){
            var contexto = document.getElementById("piezaRemotaRombitoLiteratura").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#74400C";
            if (data.Literatura == 1){
                contexto.fillStyle = "#74400C";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
    }
}

function pintaFichaUsuario(datos){
    var data = JSON.parse(datos);
    for (var i = 0; i < 5; i++){
        if (i==0){
            var contexto = document.getElementById("piezaLocalRombitoHistoria").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "yellow";
            if (data.Historia == 1){
                contexto.fillStyle = "yellow";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==1){
            var contexto = document.getElementById("piezaLocalRombitoCiencia").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#1CB429";
            if (data.Ciencia == 1){
                contexto.fillStyle = "#1CB429";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==2){
            var contexto = document.getElementById("piezaLocalRombitoEspectaculos").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#FF4BD0";
            if (data.Espectaculos == 1){
                contexto.fillStyle = "#FF4BD0";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==3){
            var contexto = document.getElementById("piezaLocalRombitoDeportes").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#34A6E3";
            if (data.Deportes == 1){
                contexto.fillStyle = "#34A6E3";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
        if (i==4){
            var contexto = document.getElementById("piezaLocalRombitoLiteratura").getContext("2d");
            contexto.beginPath();
            //Nos colocamos en el centro del canvas
            contexto.moveTo(10,0);
            contexto.lineTo(0,20);
            contexto.lineTo(10,40);
            contexto.lineTo(20,20);
            contexto.lineTo(10,0);
            contexto.lineWidth = 5;
            contexto.strokeStyle = "#74400C";
            if (data.Literatura == 1){
                contexto.fillStyle = "#74400C";
            }else{
                contexto.fillStyle = "grey";
            }
            contexto.stroke();
            contexto.fill();
        }
    }
}

function finPartida(){
    quitaClicks();
    document.getElementById("dado").setAttribute();
}
