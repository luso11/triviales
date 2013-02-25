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

//Cargamos el tablero de juego
function cargaTablero() {
    var allHTMLTags = new Array();
    // Creamos un array con todas las etiquetas del HTML
    allHTMLTags=document.getElementsByTagName("*");
    // Las recorremos
    for (i=0; i<allHTMLTags.length; i++) {
        var objetoCanvas = document.getElementById(allHTMLTags[i].id);
        //si saco aquí la creación comun del elemento context no funciona
        if (allHTMLTags[i].className=="ciencia") {
            // Aqui ejecutamos lo que queramos a los elementos
            // que coincidan con la clase.
            if(objetoCanvas.getContext){
                var context = objetoCanvas.getContext('2d');
                context.beginPath();
                context.rect(0, 0, 70, 70);
                context.fillStyle = 'green';
                context.fill();
                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.stroke();
            }
        }else if (allHTMLTags[i].className=="historia") {
            // Aqui ejecutamos lo que queramos a los elementos
            // que coincidan con la clase.
            if(objetoCanvas.getContext){
                var context = objetoCanvas.getContext('2d');
                context.beginPath();
                context.rect(0, 0, 70, 70);
                context.fillStyle = 'yellow';
                context.fill();
                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.stroke();
            }
        }else if (allHTMLTags[i].className=="deportes") {
            // Aqui ejecutamos lo que queramos a los elementos
            // que coincidan con la clase.
            if(objetoCanvas.getContext){
                var context = objetoCanvas.getContext('2d');
                context.beginPath();
                context.rect(0, 0, 70, 70);
                context.fillStyle = 'blue';
                context.fill();
                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.stroke();
            }
        }else if (allHTMLTags[i].className=="literatura") {
            // Aqui ejecutamos lo que queramos a los elementos
            // que coincidan con la clase.
            if(objetoCanvas.getContext){
                var context = objetoCanvas.getContext('2d');
                context.beginPath();
                context.rect(0, 0, 70, 70);
                context.fillStyle = 'brown';
                context.fill();
                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.stroke();
            }
        }else if (allHTMLTags[i].className=="espectaculos") {
            // Aqui ejecutamos lo que queramos a los elementos
            // que coincidan con la clase.
            if(objetoCanvas.getContext){
                var context = objetoCanvas.getContext('2d');
                context.beginPath();
                context.rect(0, 0, 70, 70);
                context.fillStyle = 'pink';
                context.fill();
                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.stroke();
            }
        }else if (allHTMLTags[i].className=="rojo") {
            // Aqui ejecutamos lo que queramos a los elementos
            // que coincidan con la clase.
            if(objetoCanvas.getContext){
                var context = objetoCanvas.getContext('2d');
                context.beginPath();
                context.rect(0, 0, 70, 70);
                context.fillStyle = 'red';
                context.fill();
                context.lineWidth = 2;
                context.strokeStyle = 'black';
                context.stroke();
            }
        }else if (allHTMLTags[i].className=="tiraOtraVez") {
            // Aqui ejecutamos lo que queramos a los elementos
            // que coincidan con la clase.
            if(objetoCanvas.getContext){
                var context = objetoCanvas.getContext('2d');
                context.beginPath();
                context.rect(0, 0, 70, 70);
                context.fillStyle = 'grey';
                context.fill();
                context.lineWidth = 2;
                context.strokeStyle = 'black';
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
