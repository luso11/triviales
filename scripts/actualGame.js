/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */
var tiempo;

function tirar(){
    //Paramos el timeOut de cambio de imagen del fondo.
    clearTimeout(tiempo);
    //Evitamos que se pueda tirar otra vez
    document.getElementById('dado').onclick=null;
    //Generamos el número que marcará el dado y lo pintamos
    num = Math.floor((Math.random()*6)+1);
    document.getElementById('dado').style.backgroundImage ="url(/static/"+num+".jpg)";
    //Marcamos las casillas donde podemos ir


    //TODO: descomentar el onclick y giraDado()
    //Volvemos a colocar el dado como clickable
    //document.getElementById('dado').onclick= function(){tirar()};
    //volvemos a tirar el dado
    //giraDado();
}

function volver(){
    //Volvemos al listado de partidas
    history.back(-1);
}

function cargaQuesitos(){
    var quesitos = ["quesitoHistoria", "quesitoCiencia", "quesitoEspectaculos", "quesitoDeportes", "quesitoLiteratura"]
    for (var quesito in quesitos){
        var objetoCanvas = document.getElementById(quesitos[quesito]);
        if(objetoCanvas.getContext){
            var context = objetoCanvas.getContext('2d');
            context.beginPath();
            //Nos colocamos en el centro del canvas
            context.rect(0,0,60,60)
            if (quesitos[quesito] == "quesitoHistoria"){
                context.fillStyle = "yellow";
            }else if (quesitos[quesito] == "quesitoCiencia"){
                context.fillStyle = "green";
            }else if (quesitos[quesito] == "quesitoEspectaculos"){
                context.fillStyle = "pink";
            }else if (quesitos[quesito] == "quesitoDeportes"){
                context.fillStyle = "blue";
            }else if (quesitos[quesito] == "quesitoLiteratura"){
                context.fillStyle = "brown";
            }
            context.fill()
            context.lineWidth = 3
            context.strokeStyle = "black"
            context.stroke();
        }
    }
}

//Cargamos el tablero de juego
window.onload=function() {
    var allHTMLTags = new Array();
    var allCanvas = new Array();
    cargaQuesitos();
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
            //si saco aquí la creación comun del elemento context no funciona
                if (allHTMLTags[i].className=="ciencia") {
                    context.fillStyle = "green";
                }else if (allHTMLTags[i].className=="historia") {
                    context.fillStyle = 'yellow';
                }else if (allHTMLTags[i].className=="deportes") {
                    context.fillStyle = 'blue';
                }else if (allHTMLTags[i].className=="literatura") {
                    context.fillStyle = 'brown';
                }else if (allHTMLTags[i].className=="espectaculos") {
                    context.fillStyle = 'pink';
                }else if (allHTMLTags[i].className=="rojo") {
                    context.fillStyle = 'red';
                }else if (allHTMLTags[i].className=="tiraOtraVez") {
                    context.fillStyle = 'grey';
                }
                context.fill();
                context.lineWidth = 3;
                context.stroke();
            }
        }
    }
    document.getElementById('dado').onclick= function(){tirar()};
    giraDado();
}

function clickHistoria(){
    //Request de historia
    alert("historia!")
}
function clickCiencia(){
    //Request de ciencia
    alert("ciencia!")
}
function clickDeportes(){
    //Request de deportes
    alert("deportes!")
}
function clickEspectaculos(){
    //Request de espectaculos
    alert("espectaculos!")
}
function clickLiteratura(){
    //Request de literatura
    alert("literatura!")
}
function clickRojo(){
    alert("rojo!")
}
function clickTiraOtraVez(){
    document.getElementById('dado').onclick= function(){tirar()};
    giraDado();
}

var imagenes=new Array()

imagenes[0]= new Image(100,100);
imagenes[0].src = "/static/1.jpg";

imagenes[1]= new Image(100,100);
imagenes[1].src = "/static/2.jpg";

imagenes[2]= new Image(100,100);
imagenes[2].src = "/static/3.jpg";

imagenes[3]= new Image(100,100);
imagenes[3].src = "/static/4.jpg";

imagenes[4]= new Image(100,100);
imagenes[4].src = "/static/5.jpg";

imagenes[5]= new Image(100,100);
imagenes[5].src = "/static/6.jpg";

function giraDado(){
    num = Math.floor((Math.random()*6));
    document.getElementById('dado').style.backgroundImage ="url("+imagenes[num].src+")";
    tiempo=window.setTimeout('giraDado()',100);
//cambia la cantidad por el tiempo que quieras que transcurra entre imagen e imagen
}

