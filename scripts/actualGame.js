/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */

function tirar(){
    //Generamos el número que marcará el dado y lo devolvemos
    num = Math.floor((Math.random()*6)+1);
    alert(num);
    return num;
}

function volver(){
    //Volvemos al listado de partidas
    history.back(-1);
}

function cargaQuesitos(){
    var quesitos = ["quesitoHistoria", "quesitoCiencia", "quesitoEspectaculos", "quesitoDeportes", "quesitoLiteratura"]
    for (var quesito in quesitos){
        var objetoCanvas = document.getElementById(quesitos[quesito]);
        var context = objetoCanvas.getContext('2d');
        if(objetoCanvas.getContext){
            if (quesitos[quesito] == "quesitoHistoria"){
                context.beginPath();
                context.rect(0,0,40,60)
                context.fillStyle = "yellow"
                context.fill()
                context.lineWidth = 2
                context.strokeStyle = "black"
                context.stroke();
            }else if (quesitos[quesito] == "quesitoCiencia"){
                context.beginPath();
                context.rect(0,0,60,40)
                context.fillStyle = "green"
                context.fill()
                context.lineWidth = 2
                context.strokeStyle = "black"
                context.stroke();
            }else if (quesitos[quesito] == "quesitoEspectaculos"){
                context.beginPath();
                context.rect(0,0,60,42)
                context.fillStyle = "pink"
                context.fill()
                context.lineWidth = 2
                context.strokeStyle = "black"
                context.stroke();
            }else if (quesitos[quesito] == "quesitoDeportes"){
                context.beginPath();
                context.rect(0,0,60,50)
                context.fillStyle = "blue"
                context.fill()
                context.lineWidth = 2
                context.strokeStyle = "black"
                context.stroke();
            }else if (quesitos[quesito] == "quesitoLiteratura"){
                context.beginPath();
                //Nos colocamos en el centro del canvas
                context.rect(0,0,60,40)
                context.fillStyle = "brown"
                context.fill()
                context.lineWidth = 2
                context.strokeStyle = "black"
                context.stroke();
            }
        }
    }
}

//Cargamos el tablero de juego
function cargaTablero() {
    var allHTMLTags = new Array();
    var allCanvas = new Array();
    cargaQuesitos();
    // Creamos un array con todas las etiquetas del HTML
    allHTMLTags = document.getElementsByTagName("canvas");
    // Las recorremos
    for (i=0; i<allHTMLTags.length; i++) {
        if(allHTMLTags[i].id.indexOf("quesito")== -1){
            if(document.getElementById(allHTMLTags[i].id).getContext){
                var context = document.getElementById(allHTMLTags[i].id).getContext('2d');
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
                context.stroke();
            }
        }
    }
}

function clickHistoria(){
    //Request de historia
    alert("historia!")
}
function clickCiencia(){
    //Request de historia
    alert("ciencia!")
}
function clickDeportes(){
    //Request de historia
    alert("deportes!")
}
function clickEspectaculos(){
    //Request de historia
    alert("espectaculos!")
}
function clickLiteratura(){
    //Request de historia
    alert("literatura!")
}
function clickRojo(){
    //Request de historia
    alert("rojo!")
}
function clickTiraOtraVez(){
    //Request de historia
    alert("tiraOtraVez!")
}
