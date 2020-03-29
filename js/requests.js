function addNewCity() {
    if(!validName("new_added_city")){
        return false;
    }
    let data = { "city": $("#new_added_city").val()};
    const notes = $("#new_added_city_notes").val();
    if(notes!=="")
        data['notes'] = notes;
    $.ajax({
        url: 'http://localhost:2303/addCity',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            $("#content").prepend("<div class='alert alert-success alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>Вітаємо</strong> Місто <u>"+city+"</u>додано!" +
                "</div>");
            setClear(["#new_added_city"]);
        },
        data: JSON.stringify(data)
    });

    $("#add_city_modal").modal('hide');
}


function addSubject() {

    if (!validEmpty("new_subject_name") || !validFreeClass("new_subject_class"))
    return false;
    let name=$("#new_subject_name").val();
    $("#teacher_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' data-toggle='list'" +
                "role='tab' onclick='show_subject()'>" + name + "</a>");

    //TODO add new subject to database

    let data = {
        "name": name
    };
    const descr = $("#new_subject_description").val();
    if(descr!==""){
        date['description'] = descr;
    }
    const klass = $("#new_subject_class").val();
    if(klass!==""){
        date['class'] = klass;
    }

    $.ajax({
        url: 'http://localhost:2303/addSchool',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {

        },
        error: function () {

        },
        data: JSON.stringify(data)
    });


    $("#add_subject_modal").modal('hide');



}


function addSchool() {
    if(!validName("input_school_name") || !validFName("input_school_region") ||
        !validName("input_school_street") || !validPhone("input_school_phone") ||
        !validHouse("input_school_house")){
        return false;
    }
    let data = {
        "name": $("#input_school_name").val(),
        "cityid": $("#input_school_city").val(),
        "street": $("#input_school_street").val(),
        "house": $("#input_school_house").val(),
        "phone": $("#input_school_phone").val()
    };
    const notes = $("#input_school_notes").val();
    if(notes!==""){
        data['notes'] = notes;
    }
    const region = $("#input_school_region").val();
    if(notes!==""){
        data['region'] = region;
    }
    $.ajax({
        url: 'http://localhost:2303/addSchool',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#content").prepend("<div class='alert alert-success alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>"+data.code+"</strong> - код нової школи. Вітаємо!" +
                "</div>");
            setClear(["#input_school_name","#input_school_region","#input_school_notes","#input_school_city",
                "#input_school_phone", "#input_school_street", "#input_school_house"]);
        },
        error: function () {
            $("#content").prepend("<div class='alert alert-danger alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>Error!</strong> Не вдалося додати школу </div>");
            setClear(["#input_school_name","#input_school_region","#input_school_notes","#input_school_city",
                "#input_school_phone", "#input_school_street", "#input_school_house"]);
        },
        data: JSON.stringify(data)
    });

    $("#add_school_modal").modal('hide');
}
function setCitiesValueOption() {
    $.ajax({
        url: 'http://localhost:2303/getCities',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var sel = $("#input_school_city");
            for (var i=0; i<data.length; i++){
                sel.append("<option value='"+data[i][0]+"'>"+data[i][1]+"</option>");
            }
            console.log(data);
        }
    });
}

function register() {
    var passSel = $('#reg_password');
    var pass2Sel = $('#reg_password2');
    let pass = passSel.val();
    let pass2 = pass2Sel.val();
    if (checkValidity()) {
        if (pass2 !== pass) {
            pass2Sel.removeClass('is-valid');
            pass2Sel.addClass('is-invalid');
            setClear(["#reg_password2","#reg_password"]);
            return;
        }

        let data = {
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
                setClear(["#reg_password2","#reg_password","#reg_firstname","#reg_lastname","#reg_fathername",
                    "#reg_email", "#reg_phone", "#reg_code","#reg_education","#reg_phd", "#reg_teacher_code",
                    "#reg_birth_date", "#reg_student_code", "#reg_class"]);
            },
            data: JSON.stringify(data)
        });
        gotologin();
    } else {
        setClear(["#reg_password2","#reg_password"]);
    }
}

function login() {
    const data = {
        "login": $("#entry_email").val(),
        "password": $("#entry_password").val()
    };
    const cur_user_type = localStorage.getItem("usertype");
    $.ajax({
        url: 'http://localhost:2303/login' + cur_user_type,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        'accept': "application/json",
        success: function (data) {
            localStorage.setItem('authentication', data.id);
            $("#entrypanel").hide();
            $("#registrypanel").hide();
            if (cur_user_type === 'admin') {
                setCitiesValueOption();
                $("#admin_page").show();
                $("#admin_page_tab").show();
            }
            $("#container").show();
            setClear(["#entry_email", "#entry_password"]);
        },
        error: function () {
            alert("Переконайтесь в правильності введених даних");
            setClear(["#entry_password"]);
        },
        data: JSON.stringify(data)
    });
}

function addAdmin() {
    const logSelector = $("#input_admin_login");
    const login = logSelector.val();
    if (login === "") {
        logSelector.addClass('is-invalid');
        setClear(["#input_admin_password"]);
        return false;
    }
    if (!validEmail("input_admin_email") || !validPass("input_admin_password") ||
        !validName("input_admin_fname") || !validName("input_admin_lname")) {
        return false;
    }
    let data = {
        "login": login,
        "email": $("#input_admin_email").val(),
        "password": $("#input_admin_password").val(),
        "name": $("#input_admin_fname").val(),
        "surname": $("#input_admin_lname").val(),
    };
    const notes = $("#input_admin_notes").val();
    if (notes !== "") {
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
            setClear(["#input_admin_password"]);
        },
        error: function () {
            $("#content").prepend("<div class='alert alert-danger alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                "  <strong>Error!</strong> Не вдалося додати адміністратора" +
                "</div>");
            setClear(["#input_admin_password"]);
        },
        data: JSON.stringify(data)
    });

    $("#add_admin_modal").modal('hide');
}