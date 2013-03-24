/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */
var tiempo;
var posicionActual;

function tirar(){
    //Paramos el timeOut de cambio de imagen del fondo.
    clearTimeout(tiempo);
    //Evitamos que se pueda tirar otra vez
    document.getElementById('dado').onclick=null;
    //Generamos el número que marcará el dado y lo pintamos
    num = Math.floor((Math.random()*6)+1);
    document.getElementById('dado').style.backgroundImage ="url(/static/"+num+".png)";
    //Marcamos las casillas donde podemos ir
    //TODO: calculaPosicion(posicionActual);

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
                context.fillStyle = "#1CB429";
            }else if (quesitos[quesito] == "quesitoEspectaculos"){
                context.fillStyle = "#FF4BD0";
            }else if (quesitos[quesito] == "quesitoDeportes"){
                context.fillStyle = "#34A6E3";
            }else if (quesitos[quesito] == "quesitoLiteratura"){
                context.fillStyle = "#74400C";
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
                    context.fillStyle = "#1CB429";
                }else if (allHTMLTags[i].className=="historia") {
                    context.fillStyle = 'yellow';
                }else if (allHTMLTags[i].className=="deportes") {
                    context.fillStyle = '#34A6E3';
                }else if (allHTMLTags[i].className=="literatura") {
                    context.fillStyle = '#74400C';
                }else if (allHTMLTags[i].className=="espectaculos") {
                    context.fillStyle = '#FF4BD0';
                }else if (allHTMLTags[i].className=="tiraOtraVez") {
                    context.fillStyle = 'FF0101';
                    context.moveTo(0,0);
                    context.lineTo(30,50);
                    context.moveTo(0,50);
                    context.lineTo(30,0);
                    //TODO: Intentar hacer un cubo en 3D con líneas del canvas;
                }
                context.fill();
                context.lineWidth = 3;
                context.stroke();
            }
        }
    }
    document.getElementById('dado').onclick= function(){tirar()};
    if (document.getElementById("turno").value =="True"){
        giraDado();
    }else{
        document.getElementById("dado").hidden = "hidden";
        var elementos = document.getElementsByName('*');
        for (var elem in elementos){
            alert(elem);
            break;
        }
    }
}

function clickTiraOtraVez(){
    document.getElementById('dado').onclick= function(){tirar()};
    giraDado();
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

function giraDado(){
    //TODO: poner que cuando se este girando el dado no se note el click en ningún otro sitio
    num = Math.floor((Math.random()*6));
    document.getElementById('dado').style.backgroundImage ="url("+imagenes[num].src+")";
    tiempo=window.setTimeout('giraDado()',100);
    //cambia la cantidad por el tiempo que quieras que transcurra entre imagen e imagen

}


