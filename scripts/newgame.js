/**
 * Created with PyCharm.
 * User: luis
 * Date: 12/01/13
 * Time: 17:08
 * To change this template use File | Settings | File Templates.
 */

function porUsuario(){
    $("#usuario").css('visibility', 'visible');
    $("#crear").css('visibility', 'visible');
    $("#mail").css('visibility', 'hidden');
}

function porMail(){
    $("#mail").css('visibility', 'visible');
    $("#crear").css('visibility', 'visible');
    $("#usuario").css('visibility', 'hidden');

}

function crear(){
    alert("joa");
    if ($("#mail").value != ""){
        var postdata={
            'username':username,
            'mail': $("#mail").value,
            'csrfmiddlewaretoken': "{{ csrf_token }}"
        }
        $.ajax({
            type: "POST",
            url: "newgame",
            data: postdata,
            success: function(data) {
                alert("partida creada con "+data);
            }
        });
    }else if ($("#usuario").value != ""){
        var postdata={
            'username':$("#usuario").value,
            'mail': "",
            'csrfmiddlewaretoken': "{{ csrf_token }}"
        }
        $.ajax({
            type: "POST",
            url: "newgame",
            data: postdata,
            success: function(data) {
                alert("partida creada con "+data);
            }
        });
    }else{

    }
}