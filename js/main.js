let usertypes = ["admin", "teacher", "pupil"];
let usertype = 0;

function change_entry_type(t) {
    if (t === 0) {
        $('#entryform').css("background", "#fd7172");
        usertype = 0;
    }
    else if (t === 1) {
        $('#entryform').css("background", "#fee96a");
        usertype = 1;
    }
    else if (t === 2) {
        $('#entryform').css("background", "#7cdeeb");
        usertype = 2;
    }
}

function change_reg_type(t) {

    if (t === 1) {
        $('#registryform').css("background", "#fee96a");
        usertype = 1;
    }
    else {
        $('#registryform').css("background", "#7cdeeb");
        usertype = 2;
    }
}

function shoW(except) {
    $("#admin_page").hide();
    $("#cabinet_page").hide();
    $("#subject_page").hide();
    $("#" + except).show();
}


let authentication = false;
$("#entrypanel").show();
$("#registrypanel").hide();
$("#admin_page").hide();
$("#admin_page_tab").hide();
$("#container").hide();


function register() {
    console.log("try");
    var pass = $('#reg_password').val();
    var pass2 = $('#reg_password2').val();
    if (!validName("reg_lastname") || !validName("reg_firstname") ||
        !validPass("reg_password")) {
        return;
    }
    if (pass2 != pass) {
        $('#reg_password2').css("background-color", "rgba(253, 113, 114, 0.5)");
        return;
    }
    var data = {
        "name": $("#reg_firstname").val(),
        "surname": $("#reg_lastname").val(),
        "patronymic": $("#reg_fathername").val(),
        "email": $("#reg_email").val(),
        "password": $("#reg_password").val(),
        "phone": $("#reg_phone").val(),
        "birth_date": $("#reg_birth_date").val(),
        "class": $("#reg_class").val(),
        "school_id": $("#reg_code").val()
    };
    $.ajax({
        url: 'http://localhost:2303/registerpupil',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data, status) {
            alert(data.error);
        },
        data: JSON.stringify(data)
    });


}

function login() {
    authentication = true;
    $("#entrypanel").hide();
    $("#registrypanel").hide();
    $("#container").show();
    if (usertype == 0) {
        $("#admin_page").show();
        $("#admin_page_tab").show();
    } else {
        $("#admin_page").hide();
        $("#admin_page_tab").hide();
    }
    $("#container").show();
}

function exit() {
    authentication = false;
    $("#container").hide();
    $("#entrypanel").show();
}

function gotoregistration() {
    $("#registrypanel").show();
    $("#entrypanel").hide();
    $("#container").hide();
}

function gotologin() {
    $("#registrypanel").hide();
    $("#entrypanel").show();
    $("#container").hide();
}
