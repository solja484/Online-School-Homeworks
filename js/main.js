// user-types = ["admin", "teacher", "pupil"];
let usertype = 2;

function change_entry_type(t) {
    if (t === 0) {
        $('#entryform').css("background", "#fd7172");
        usertype = 0;
    }
    else if (t === 1) {
        $('#entryform').css("background", "#fee96a"); //teacher
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
        $('#pupil_form').hide();
        $('#teacher_form').show();
    }
    else {
        $('#registryform').css("background", "#7cdeeb");
        usertype = 2;
        $('#pupil_form').show();
        $('#teacher_form').hide();
    }
}


function shoW(except) {
    $("#admin_page").hide();
    $("#cabinet_page").hide();
    $("#subject_list_page").hide();
    $("#subject_page").hide();
    $("#teacher_page").hide();
    $("#" + except).show();
}


function show_subject() {
    shoW('subject_list_page');
    $("#subject_list_page").hide();
    $("#subject_page").show();
}

let authentication = false;
$("#entrypanel").hide();
$("#registrypanel").hide();
$("#admin_page").hide();
$("#admin_page_tab").hide();
$("#subject_page").hide();
$("#container").show();

shoW('subject_list_page');

function checkValidity() {
    let res = [];
    res.push(validName("reg_lastname"));
    res.push(validName("reg_firstname"));
    res.push(validFName("reg_fathername"));

    res.push(validEmail("reg_email"));
    res.push(validPass("reg_password"));
    res.push(validCode("reg_code"));
    res.push(validPhone("reg_phone"));
    if (usertype === 1) {
        res.push(validDocument("reg_teacher_code"));
        res.push(validEmpty("reg_education"));
    } else if (usertype === 2) {
        res.push(validClass("reg_class"));
        res.push(validDocument("reg_student_code"));
        res.push(validEmpty("reg_birth_date"));
    }
    let success = true;
    for (a of res)
        if (!a) success = false;
    return success;

}

function register() {
    let pass = $('#reg_password').val();
    let pass2 = $('#reg_password2').val();

    if (checkValidity()) {
        if (pass2 !== pass) {
            document.getElementById('reg_password2').classList.remove('is-valid');
            document.getElementById('reg_password2').classList.add('is-invalid');
            return;
        }
        var data = {
            "name": $("#reg_firstname").val(),
            "surname": $("#reg_lastname").val(),
            "patronymic": $("#reg_fathername").val(),
            "email": $("#reg_email").val(),
            "password": pass,
            "phone": $("#reg_phone").val(),
            "school_id": $("#reg_code").val()
        };
        if (usertype === 1) {
            data.education = $("#reg_education").val();
            data.phd = $("#reg_phd").val();
            data.teacher_id = $("#reg_teacher_code").val();
        } else if (usertype === 2) {
            data.birth_date = $("#reg_birth_date").val();
            data.class = $("#reg_class").val();
            data.student_id = $("#reg_student_code").val();
        }
        $.ajax({
            url: 'http://localhost:2303/registerpupil',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                alert(data.error);
                authentication = true;
                $("#registrypanel").hide();
                $("#admin_page").hide();
                $("#admin_page_tab").hide();
                $("#entrypanel").hide();
                $("#container").show();
            },
            data: JSON.stringify(data)
        });
        gotologin();
    }
}


function login() {
    var data = {
        "login": $("#entry_email").val(),
        "password": $("#entry_password").val()
    };
    $.ajax({
        url: 'http://localhost:2303/loginpupil',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            authentication = true;
            $("#entrypanel").hide();
            $("#registrypanel").hide();
            if (usertype === 0) {
                $("#admin_page").show();
                $("#admin_page_tab").show();
            } else {
                $("#admin_page").hide();
                $("#admin_page_tab").hide();
            }
            $("#container").show();
        },
        error: function () {
            alert("Переконайтесь в правильності введених даних");
        },
        data: JSON.stringify(data)
    });
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
