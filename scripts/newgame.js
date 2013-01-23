/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */

function conDatosUsuario(){
    document.f1.elements['eleccion'].value="user";
    conDatos();
}

function conDatosMail(){
    document.f1.elements['eleccion'].value="mail";
    conDatos();
}

function conDatos(){
    document.f1.elements['datos'].style.visibility= "visible";
    $("#crearPartida").css('visibility', 'visible');
}

function crear(){
   document.f1.submit();
}