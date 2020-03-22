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
// shoW('subject_list_page');

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
            localStorage.setItem('authentication', data.id);
            $("#entrypanel").hide();
            $("#registrypanel").hide();
            if (cur_user_type === 'admin') {
                $("#admin_page").show();
                $("#admin_page_tab").show();
            }
            $("#container").show();
        },
        error: function () {
            alert("Переконайтесь в правильності введених даних");
        },
        data: JSON.stringify(data)
    });
}
function addAdmin() {
    var logSelector = $("#input_admin_login");
    var login = logSelector.val();
    if(login===""){
        logSelector.addClass('is-invalid');
        return false;
    }
    if(!validEmail("input_admin_email") || !validPass("input_admin_password") ||
        !validName("input_admin_fname") || !validName("input_admin_lname")){
        return false;
    }
    var data = {
        "login": login,
        "email": $("#input_admin_email").val(),
        "password": $("#input_admin_password").val(),
        "name": $("#input_admin_fname").val(),
        "surname": $("#input_admin_lname").val(),
    };
    var notes = $("#input_admin_notes").val();
    if(notes!==""){
        data['notes'] = notes;
    }
    $.ajax({
        url: 'http://localhost:2303/registeradmin',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        "accept": 'application/json',
        success: function () {
            $("#content").prepend("<div class='alert alert-success alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                "  <strong>Success!</strong> Новий адміністратор створений" +
                "</div>");
        },
        error: function () {
            $("#content").prepend("<div class='alert alert-danger alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                "  <strong>Error!</strong> Не вдалося додати адміністратора" +
                "</div>");
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
