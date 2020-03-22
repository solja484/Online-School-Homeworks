// user-types = ["admin", "teacher", "pupil"];
localStorage.setItem("usertype","pupil");

$("#container").hide();
$("#entrypanel").show();

// $("#entrypanel").hide();
// $("#registrypanel").hide();
// $("#admin_page").hide();
// $("#admin_page_tab").hide();
// $("#subject_page").hide();
// $("#container").show();

shoW('subject_list_page');

function change_entry_type(t) {
    if (t === 0) {
        $('#entryform').css("background", "#fd7172");
        localStorage.setItem("usertype","admin");
    }
    else if (t === 1) {
        $('#entryform').css("background", "#fee96a");
        localStorage.setItem("usertype","teacher");
    }
    else if (t === 2) {
        $('#entryform').css("background", "#7cdeeb");
        localStorage.setItem("usertype","pupil");
    }
}

function change_reg_type(t) {
    if (t === 1) {
        $('#registryform').css("background", "#fee96a");
        localStorage.setItem("usertype","teacher");
        $('#pupil_form').hide();
        $('#teacher_form').show();
    }
    else {
        $('#registryform').css("background", "#7cdeeb");
        localStorage.setItem("usertype","pupil");
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

function checkValidity() {
    if (!validName("reg_lastname") || !validName("reg_firstname") || !validFName("reg_fathername") ||
        !validEmail("reg_email") || !validPass("reg_password") || !validCode("reg_code") || !validPhone("reg_phone")){
        return false
    }
    var cur_user_type = localStorage.getItem("usertype");
    if (cur_user_type === 'teacher') {
        if(!validDocument("reg_teacher_code") || !validEmpty("reg_education")){
            return false;
        }
    } else if (cur_user_type === 'pupil') {
        if(!validClass("reg_class") || !validDocument("reg_student_code") || !validEmpty("reg_birth_date")){
            return false;
        }
    }
    return true;
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
        var cur_user_type = localStorage.getItem("usertype");
        if (cur_user_type === 'teacher') {
            data.education = $("#reg_education").val();
            data.phd = $("#reg_phd").val();
            data.teacher_id = $("#reg_teacher_code").val();
        } else if (cur_user_type === 'pupil') {
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
                localStorage.setItem("authentication", cur_user_type);
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
    var cur_user_type = localStorage.getItem("usertype");
    $.ajax({
        url: 'http://localhost:2303/login'+cur_user_type,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        'accept': "application/json",
        success: function (data) {
            localStorage.setItem('authentication', cur_user_type);
            $("#entrypanel").hide();
            $("#registrypanel").hide();
            if (cur_user_type === 'admin') {
                $("#admin_page").show();
                $("#admin_page_tab").show();
            }
            // else {
            //     $("#admin_page").hide();
            //     $("#admin_page_tab").hide();
            // }
            $("#container").show();
        },
        error: function (data) {
            alert("Переконайтесь в правильності введених даних");
        },
        data: JSON.stringify(data)
    });
}

function exit() {
    localStorage.setItem("usertype","pupil");
    localStorage.removeItem("authentication");
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
