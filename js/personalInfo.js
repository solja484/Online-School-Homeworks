//ADMIN SECTION
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

function fillAdminInfo(id) {
    //Повертає: login, email, password, notes, name, surname
    $.ajax({
        url: 'http://localhost:2303/getadmininfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            fillAdminFields(data, id);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}

function fillAdminFields(data, id) {
    $("#admin_login").text(data.login);
    $("#admin_email").text(data.email);
    $("#admin_notes").text(data.notes);
    $("#admin_pib").text(data.surname + " " + data.name);

    $("#new_admin_login").val(data.login);
    $("#new_admin_email").val(data.email);
    $("#new_admin_notes").text(data.notes);
    $("#new_admin_name").val(data.name);
    $("#new_admin_surname").val(data.surname);
    $("#edit_admin_button").attr('onclick', 'editAdmin(' + id + ')');
}

function editAdmin(id) {
    if (validName("new_admin_name") && validName("new_admin_surname") &&
        validEmail("new_admin_email")) {

        let data = {
            "id": id,
            "name": $("#new_admin_name").val(),
            "surname": $("#new_admin_surname").val(),
            "email": $("#new_admin_email").val(),
            "notes": $("#new_admin_notes").val()
        };
        $.ajax({
            url: 'http://localhost:2303/editadmininfo',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                fillAdminFields(data, id);
                $("#edit_admin_modal").modal('hide');
            },
            error: function (data) {
                alert(data.error);
            },
            data: JSON.stringify(data)

        });
    }
}

//PUPIL SECTION
function fillPupilInfo(id) {
//Повертає: name , surname, patronymic, email, phone, class, birthdate, schoolid, notes, schoolname
    $.ajax({
        url: 'http://localhost:2303/getpupilinfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            sessionStorage.setItem("schoolcode", data.schoolid);
            $("#pupil_school_link").text(data.schoolname);
            fillPupilSubjects(id);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}

function fillPupilFields(data, id) {
    $("#pupil_pib").text(data.surname + ' ' + data.name + ' ' + data.patronymic);
    $("#pupil_email").text(data.email);
    if (data.phone === "")
        $("#pupil_phone").text("не вказано");
    else
        $("#pupil_phone").text(data.phone);
    $("#pupil_class").text(data.class);
    if (data.birthdate === "")
        $("#pupil_bday").text("не вказано");
    else
        $("#pupil_bday").text(data.birthdate);

    $("#pupil_notes").text(data.notes);
    $("#pupil_pupilcode").text(id);

    $("#new_pupil_name").val(data.name);
    $("#new_pupil_surname").val(data.surname);
    $("#new_pupil_fathername").val(data.patronymic);
    $("#new_pupil_email").val(data.email);
    $("#new_pupil_phone").val(data.phone);
    $("#new_pupil_class").val(data.class);
    $("#new_pupil_notes").val(data.notes);
    $("#edit_pupil_button").attr('onclick', 'editPupil(' + id + ')');
}

function editPupil(id) {
    if (validName("new_pupil_name") && validName("new_pupil_surname") &&
        validFName("new_pupil_fathername") && validEmail("new_pupil_email") &&
        validPhone("new_pupil_phone") && validClass("new_pupil_class")) {

        let data = {
            "id": id,
            "name": $("#new_pupil_name").val(),
            "surname": $("#new_pupil_surname").val(),
            "patronymic": $("#new_pupil_fathername").val(),
            "email": $("#new_pupil_email").val(),
            "phone": $("#new_pupil_phone").val(),
            "class": $("#new_pupil_class").val(),
            "notes": $("#new_pupil_notes").val()
        };
        $.ajax({
            url: 'http://localhost:2303/editpupilinfo',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data2) {
                fillPupilFields(data2, id);
                $("#edit_pupil_modal").modal('hide');
            },
            error: function (data2) {
                alert(data2.error);
            },
            data: JSON.stringify(data)
        });
    }
}

//TEACHER SECTION
function fillTeacherInfo(id) {
//# Повертає: name 0, surname 1 , patronymic 2, email 3,  phone 4, education 5, phd 6, schoolid 7, notes 8, teacherid 9
    $.ajax({
        url: 'http://localhost:2303/getteacherinfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            fillTeacherFields(data, id);
            sessionStorage.setItem("schoolcode", data.schoolid);
            fillTeacherSubjects(id);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillTeacherFields(data, id) {
    $("#teacher_school_link").text(data.schoolname);
    $("#teacher_pib").text(data.name + ' ' + data.surname + ' ' + data.patronymic);
    $("#teacher_email").text(data.email);
    if (data.phone === "")
        $("#teacher_phone").text("не вказано");
    else
        $("#teacher_phone").text(data.phone);
    $("#teacher_education").text(data.education);
    if (data.phd)
        $("#teacher_phd").show();
    else
        $("#teacher_phd").hide();
    if (data[6])
        $("#new_teacher_phd").attr("checked", "checked");

    $("#teacher_notes").text(data.notes);
    $("#teacher_teachercode").text(id);
    $("#new_teacher_name").val(data.name);
    $("#new_teacher_surname").val(data.surname);
    $("#new_teacher_fathername").val(data.patronymic);
    $("#new_teacher_email").val(data.email);
    $("#new_teacher_phone").val(data.phone);
    $("#new_teacher_education").val(data.education);
    $("#new_teacher_notes").val(data.notes);
    $("#edit_teacher_button").attr('onclick', 'editTeacher(' + id + ')');
}

function editTeacher(id) {
    if (validName("new_teacher_name") && validName("new_teacher_surname") &&
        validFName("new_teacher_fathername") && validEmail("new_teacher_email") &&
        validPhone("new_teacher_phone") && validEmpty("new_teacher_education")) {

        let data = {
            "id": id,
            "name": $("#new_teacher_name").val(),
            "surname": $("#new_teacher_surname").val(),
            "patronymic": $("#new_teacher_fathername").val(),
            "email": $("#new_teacher_email").val(),
            "phone": $("#new_teacher_phone").val(),
            "education": $("#new_teacher_education").val(),
            "phd": $("#new_teacher_phd").val(),
            "notes": $("#new_teacher_notes").val()
        };

        $.ajax({
            url: 'http://localhost:2303/editteacherinfo',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data2) {
                fillTeacherFields(data2, id);
                $("#edit_teacher_modal").modal('hide');

            },
            error: function (data2) {
                alert(data2.error);
            },
            data: JSON.stringify(data)
        });
    }
}

//SCHOOL SECTION
function fillSchoolInfo() {
//# Повертає: name, city, region, street, house, phone, notes
    $.ajax({
        url: 'http://localhost:2303/getschoolinfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#school_name").text(data.name);
            $("#school_city").text(data.city);
            $("#school_address").text(data.region + ' р-н вул. ' + data.street + ' ' + data.house);
            $("#school_phone").text("Телефон: +38 " + data.phone);
            $("#school_notes").text(data.notes);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": sessionStorage.getItem("schoolcode")
        })
    });
}

function addSchool() {
    if (!validName("input_school_name") || !validFName("input_school_region") ||
        !validName("input_school_street") || !validPhone("input_school_phone") ||
        !validHouse("input_school_house")) {
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
    if (notes !== "") {
        data['notes'] = notes;
    }
    const region = $("#input_school_region").val();
    if (notes !== "") {
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
                " <strong>" + data.code + "</strong> - код нової школи. Вітаємо!" +
                "</div>");
            setClear(["#input_school_name", "#input_school_region", "#input_school_notes", "#input_school_city",
                "#input_school_phone", "#input_school_street", "#input_school_house"]);
            $("#add_school_modal").modal('hide');
        },
        error: function () {
            $("#content").prepend("<div class='alert alert-danger alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>Error!</strong> Не вдалося додати школу </div>");
            setClear(["#input_school_name", "#input_school_region", "#input_school_notes", "#input_school_city",
                "#input_school_phone", "#input_school_street", "#input_school_house"]);
        },
        data: JSON.stringify(data)
    });
}

//SUBJECT SECTION
function addSubject() {
    if (!validEmpty("new_subject_name") || !validFreeClass("new_subject_class"))
        return false;

    const data = {
        "title": $("#new_subject_name").val(),
        "notes": $("#new_subject_description").val(),
        "class_num": $("#new_subject_class").val(),
        "teacher_id": localStorage.getItem("authentication")
    };
    $.ajax({
        url: 'http://localhost:2303/addsubject',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            //TODO @solja return subject code
            const code = data2.code;
            $("#teacher_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' data-toggle='list'" +
                " role='tab' onclick='show_subject()'>" + data.name + "</a>");
            $("#add_subject_modal").modal('hide');
            setClear(["new_subject_name", "new_subject_description", "new_subject_class"]);
        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}
function fillTeacherSubjects(id) {
    const teachListSel = $("#teacher_list");
    teachListSel.empty();
    $.ajax({
        url: 'http://localhost:2303/getteachersubjects',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            datas.forEach(data => teachListSel.append("<a href='#' class='list-group-item list-group-item-action " +
                "list-group-item-light' data-toggle='list' role='tab' id='sj" + data.id + "' onclick='show_subject(" +
                JSON.stringify(data) + ");'>" + data.title + "</a>"))
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });

}
