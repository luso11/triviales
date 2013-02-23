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

function pintaTablero(){

}


function volver(){
    //Volvemos al listado de partidas
    history.back(-1);
}
