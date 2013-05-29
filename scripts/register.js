/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */
function comprobarClave(){
    clave1 = document.forms["f1"].password1.value;
    clave2 = document.forms["f1"].password2.value;

    if ((clave1 != "")){
        if ((clave1 == clave2)){
            document.getElementById("f1").submit();
        }else{
            alert("Las dos claves son distintas.");
            return false
        }
    }else{
        alert("La contraseña no puede estar vacía.");
        return false
    }
}

function comprobar(){
    if (document.forms["f1"].username.value == ""){
        alert("El nombre de usuario no puede estar vacío.");
        return false
    }else{
        comprobarClave();
    }
}
