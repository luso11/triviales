/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */

function enviar(){
    document.getElementById("f1").submit();
}

function comprobarLogin(){
    if (document.forms["f1"].username == ""){
        alert("El nombre de usuario no puede estar vacío.");
        return false
    }else if (document.forms["f1"].password == ""){
        alert("La clave no puede ser un campo vacío.");
        return false
    }else{
        enviar()
    }
}
