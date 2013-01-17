/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */
function comprobarClave(){
    clave1 = document.f1.password1.value
    clave2 = document.f1.password2.value

    if ((clave1 == clave2)&& (clave1 != "")){
        document.f1.submit()
    }else{
        alert("Las dos claves son distintas.")
        return false
    }
}

function validarCorreo(correo){
    if (/\S+@\S+\.\S+/.test(correo.value)){
        return true
    } else {
        alert("La dirección de correo es incorrecta.");
        return false
    }
}

function comprobar(){
    if (document.f1.username == ""){
        alert("El nombre de usuario no puede estar vacío.");
        return false
    }else if (validarCorreo(document.f1.correo) && (document.f1.username != "") ){
        comprobarClave();
    }
}