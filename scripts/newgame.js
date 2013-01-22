/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */

function porUsuario(){
    $("#otroUsuario").css('visibility', 'visible');
    $("#crear").css('visibility', 'visible');
    $("#mail").css('visibility', 'hidden');
}

function porMail(){
    $("#mail").css('visibility', 'visible');
    $("#crear").css('visibility', 'visible');
    $("#otroUsuario").css('visibility', 'hidden');

}
