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
            //setClear(["#input_admin_password"]);
            $("add_admin_modal").modal('hide');
            removeValid("add_admin_form");
            clearForm("add_admin_form");
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
                removeValid("edit_admin_form");
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
            fillPupilFields(data, id);
            sessionStorage.setItem("schoolcode", data.schoolid);
            fillPupilSubjects(id);
        },
        error: function (data) {
            alert(data.error + " fillPupilInfo()");
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
    $("#edit_pupil_button").attr('onclick', 'editPupil("' + id + '")');
    $("#pupil_school_link").text(data.schoolname);
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
                removeValid("edit_pupil_form");
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
            alert(data.error + " fillTeacherInfo()");
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
                removeValid("edit_teacher_form");

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
            alert(data.error + " fillSchoolInfo()");
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

            removeValid("add_school_form");
            clearForm("add_school_form");
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
            data['id'] = data2.code;
            $("#teacher_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' data-toggle='list'" +
                " role='tab' onclick='show_subject(" + JSON.stringify(data) + ")'>" + data.title + "</a>");
            $("#add_subject_modal").modal('hide');

            removeValid("add_subject_form");
            clearForm("add_subject_form");
        },
        error: function (data2) {
            alert(data2.error + " addSubject()");
        },
        data: JSON.stringify(data)
    });
}

function deleteSubject() {
    let id = sessionStorage.getItem("subject");
    $.ajax({
        url: 'http://localhost:2303/deletesubject',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#sj" + id).remove();
            $("#delete_sj_modal").modal('hide');
            showPage("teacher_list_page");
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillSubjectFields(data) {
    $("#subject_title").text(data.title + " " + data.class_num);
    $("#subject_descr").text(data.notes + "");

    $("#edit_subject_name").val(data.title);
    $("#edit_subject_description").text(data.notes);
    $("#edit_subject_class").val(data.class_num);
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
                JSON.stringify(data) + ");'>" + data.title + "</a>"));
            fillTeacherOlympiads(id);

        },
        error: function (data) {
            alert(data.error + " fillTeacherSubjects()");
        },
        data: JSON.stringify({
            "id": id
        })
    });


}

function fillPupilSubjects(id) {
    const subListSel = $("#subject_list");
    subListSel.empty();
    $.ajax({
        url: 'http://localhost:2303/getpupilsubjects',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            datas.forEach(data => subListSel.append("<a href='#' class='list-group-item list-group-item-action " +
                "list-group-item-light' data-toggle='list' role='tab' onclick='show_subject(" + JSON.stringify(data)
                + ");'>" + data.title + "</a>"));
            fillPupilOlympiads(id);
        },
        error: function (data) {
            alert(data.error + " fillPupilSubjects()");
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function editSubject() {
    if (!validEmpty("edit_subject_name") || !validFreeClass("edit_subject_class"))
        return false;

    const data = {
        "id": sessionStorage.getItem("subject"),
        "title": $("#edit_subject_name").val(),
        "class_num": $("#edit_subject_class").val(),
        "notes": $("#edit_subject_description").val()
    };

    $.ajax({
        url: 'http://localhost:2303/editsubject',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            fillSubjectFields(data2);
            $("#edit_sj_modal").modal('hide');
            removeValid("edit_subject_form");

        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}


//HOME TASKS SECTION
function fillTeacherHometasks(subject_data) {
    const hwListSel = $("#hometasks_list");
    hwListSel.empty();
    const subject_id = subject_data.id;
    $.ajax({
        url: 'http://localhost:2303/getsubjecthometasks',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            $("#edit_subject_modal_button").show();
            $("#delete_subject_modal_button").show();
            $("#add_hometask_modal_button").show();
            fillSubjectFields(subject_data);
            //datas = [{id, title, content, deadline, active, notes, remaining_time}, {...}, ...]
            sessionStorage.setItem("subject", subject_id);
            datas.forEach(data => hwListSel.append("<div id='blockhw" + data.id + "' class='hw-active col-md-12 row'>" +
                "<a id='hw" + data.id + "' class='hw_link col-md-7 ' onclick='showHometask(" + data.id +
                ")' href='#hometask_page'>" + data.title + "</a><span class='col-md-3'>" + data.deadline +
                "</span><button class='btn btn-outline-danger bg-hover-red' data-target='#delete_hw_modal' " +
                "onclick='addHwDelButton(" + data.id + ")' data-toggle='modal'>Видалити</button></div>"));
        },
        error: function (datas) {
            alert(datas.error + " fillTeacherHometasks()");
        },
        data: JSON.stringify({
            "id": subject_id
        })
    });


}

function fillPupilHometasks(subject_data) {
    const hwListSel = $("#hometasks_list");
    const subject_id = subject_data.id;
    hwListSel.empty();

    $.ajax({
        url: 'http://localhost:2303/getsubjecthometasks',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            $("#edit_subject_modal_button").hide();
            $("#delete_subject_modal_button").hide();
            $("#add_hometask_modal_button").hide();
            $("#subject_title").text(subject_data.name + " " + subject_data.class);
            $("#subject_descr").text(subject_data.descr + "");
            sessionStorage.setItem("subject", subject_id);
            //fillSubjectFields(subject_data);

            datas.forEach(data => {
                if (data.active)
                    hwListSel.append(" <div class='hw-active col-md-12 row'><a id='hw" + data.id +
                        "' class='hw_link col-md-7 ' onclick='showHometask(" + data.id + ")' " +
                        "href='#hometask_page'>" + data.title + "</a><span class='col-md-3'>"
                        + data.deadline + "</span></div>");
                else
                    hwListSel.append(" <div class='hw-disabled col-md-12 row'><a id='hw" + data.id +
                        "' class='hw_link col-md-7 ' href='#hometask_page' onclick='showHometask(" + data.id +
                        ")'>" + data.title + "</a><span class='col-md-3'>" + data.deadline + "</span>" +
                        "</div>")
            });
        },
        error: function (datas) {
            alert(datas.error + " fillPupilHometasks()");
        },
        data: JSON.stringify({
            "id": subject_id
        })
    });


}

function fillHometask(id) {
    $.ajax({
        url: 'http://localhost:2303/gethometaskinfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {

            $("#hw_title").text(data.hw_title);
            $("#hw_task").text(data.content);
            const linkSel = $("#hw_links");
            linkSel.empty();
            data.hyperlinks.forEach(link => linkSel.append("<a class='italic' href='" + link + "'>" + link + " </a><br>"));
            $("#hw_notes").text(data.notes);

            //TODO @solja gethometaskinfo
            if (localStorage.getItem("usertype") === "pupil") {
                $("#edit_hometask_modal_button").hide();
            } else if (localStorage.getItem("usertype") === "teacher") {
                $("#edit_hometask_modal_button").show();
                fillHometaskFields(data);

            }
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillHometaskFields(data) {

    removeValid("edit_hw_form");

    $("#edit_hw_title").attr("value", data.hw_title);
    $("#edit_hw_content").text(data.content);
    $("#edit_hw_deadline").attr("value", data.deadline);
    $("#edit_hw_notes").text(data.notes);

    const linkSel = $("#edit_hw_links");
    linkSel.empty();
    for (let i in data.hyperlinks) {
        linkSel.append("<input type='text' id='edit_hw_link" + i +
            "' value='" + data.hyperlinks[i] + "' class='form-control col-md-11' max='255'>" +
            "<button class='btn btn-outline-light col-md-1' id='edit_hyperlink_field_del" + i + "' onclick='deleteEditHyperlinkField(" + i + ")'>❌</button>");
    }
    linkSel.append("<button id='edit_hyperlink_field_button' class='btn btn-dark float-left' onclick='editHyperlinkField("
        + data.hyperlinks.length + ")'> + </button>");

    $("#edit_hw_button").attr('onclick', 'editHomework(' + data.hw_id + ')');


}

function addHomework() {

    if (!validEmpty('new_hw_title') || !validEmpty('new_hw_content') || !validEmpty("new_hw_deadline"))
        return false;

    let id = sessionStorage.getItem("subject");

    let links = [];
    $.each($('input', '#add_hw_links'), function () {
        if ($(this).val() != "")
            links.push($(this).val());
    });


    let data = {
        "title": $("#new_hw_title").val(),
        "content": $("#new_hw_content").val(),
        "deadline": $("#new_hw_deadline").val(),
        "notes": $("#new_hw_notes").val(),
        "hyperlinks": links,
        "id": id
    };
    //TODO @natasha повертає error і на сервері 400
    $.ajax({
        url: 'http://localhost:2303/addhometask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            $("#add_hometask_modal").modal('hide');
            showHometask(data2.hw_id);
            removeValid("add_hw_form");
            clearForm("add_hw_form"); //я не можу зрозуміти чи це у мене ця штука яка паролі зберігає автоматично заповняє фоорму
                                      // чи це ми її не чистимо, тому чищу ще раз
        },
        error: function (data2) {
            console.log(data2);
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}

function deleteHometask(hw_id) {
    $.ajax({
        url: 'http://localhost:2303/deletehometask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#blockhw" + hw_id).remove();
            $("#delete_hw_modal").modal('hide');
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": hw_id
        })
    });
}

function addHwDelButton(hw_id) {
    $("#delete_hw_button").attr('onclick', 'deleteHometask(' + hw_id + ')');
}

function editHomework(hw_id) {

    if (!validEmpty('edit_hw_title') || !validEmpty('edit_hw_content') || !validEmpty("edit_hw_deadline"))
        return false;

    let links = [];
    $.each($('input', '#edit_hw_links'), function () {
        if ($(this).val() != "")
            links.push($(this).val());
    });

    const data = {
        "id": hw_id,
        "hw_title": $("#edit_hw_title").val(),
        "content": $("#edit_hw_content").val(),
        "notes": $("#edit_hw_notes").val(),
        "deadline": $("#edit_hw_deadline").val(),
        "links": links
    };
//TODO @natasha повертає error і на сервері ошибка 404
    $.ajax({
        url: 'http://localhost:2303/edithometask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#hw_title").text(data.hw_title);
            $("#hw_task").text(data.content);
            const linkSel = $("#hw_links");
            linkSel.empty();
            data.hyperlinks.forEach(link => linkSel.append("<a class='italic' href='" + link + "'>" + link + " </a><br>"));
            $("#hw_notes").text(data.notes);


            removeValid("edit_hw_form");
            fillHometaskFields(data);


        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}


//OLYMPIADS SECTION
function deleteOlympiad() {
    let id = sessionStorage.getItem("olympiad");
    $.ajax({
        url: 'http://localhost:2303/deleteolympiad', //TODO @natasha deleteolympiad перейменуй метод під той який на сервері
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#ol" + id).remove();
            $("#delete_olympiad_modal").modal('hide');
            showPage("teacher_olympiads_page");
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function addOlympiad(id) {
    if (!validEmpty("new_olympiad_name") || !validEmpty("new_olympiad_discipline") || !validFreeClass("new_olympiad_class"))
        return false;

    const data = {
        "title": $("#new_subject_name").val(),
        "discipline": $("#new_olympiad_discipline").val(),
        "notes": $("#new_olympiad_notes").val(),
        "class_num": $("#new_olympiad_class").val(),
        "teacher_id": localStorage.getItem("authentication")
    };
    $.ajax({
        url: 'http://localhost:2303/addolympiad',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            data['id'] = data2.code;
            $("#teacher_olympiads_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' data-toggle='list'" +
                " role='tab' onclick='show_olympiad(" + JSON.stringify(data) + ")'>" + data.title + "</a>");
            $("#add_olympiad_modal").modal('hide');

            removeValid("add_olympiad_form");
            clearForm("add_olympiad_form");
        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}

function editOlympiad() {
    if (!validEmpty("edit_olympiad_name") || !validEmpty("edit_olympiad_discipline") || !validFreeClass("edit_olympiad_class"))
        return false;
    const data = {
        "id": sessionStorage.getItem("olympiad"),
        "title": $("#edit_olympiad_name").val(),
        "con_id": 5,                                             //TODO конкурси
        "discipline": $("#edit_olympiad_discipline").val(),
        "class_num": $("#edit_olympiad_class").val(),
        "notes": $("#edit_olympiad_notes").val()
    };

    fillOlympiadFields(data);
    $("#edit_olympiad_modal").modal('hide');
    removeValid("edit_olympiad_form");

    $.ajax({
        url: 'http://localhost:2303/editolympiad', //TODO @natasha назва метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            fillOlympiadFields(data2);
            $("#edit_olympiad_modal").modal('hide');
            removeValid("edit_olympiad_form");

        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}

function fillTeacherOlympiads(id) {

    let datas = [
        {
            id: 1,
            title: 'Районна олімпіада з математики',
            con_id: 2,
            discipline: 'Математика',
            class_num: 11,
            notes: 'нотатки'
        },
        {
            id: 2,
            title: 'конкурс ім. Петра Яцика',
            con_id: 5,
            discipline: 'Українська мова та література',
            class_num: 10,
            notes: 'нотатки'
        }
    ];

    $("#add_olympiad_button").attr("onclick", "addOlympiad(" + id + ")");
    const teachListSel = $("#teacher_olympiads_list");
    teachListSel.empty();

    datas.forEach(data => teachListSel.append("<a href='#' class='list-group-item list-group-item-action " +
        "list-group-item-light ' data-toggle='list' role='tab' id='ol" + data.id + "' onclick='show_olympiad(" +
        JSON.stringify(data) + ");'>" + data.title + "</a>"));

    $.ajax({
        url: 'http://localhost:2303/getteacherolympiads', //TODO natasha поміняй якщо потрібно назву метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            datas.forEach(data => teachListSel.append("<a href='#' class='list-group-item list-group-item-action " +
                "list-group-item-light' data-toggle='list' role='tab' id='ol" + data.id + "' onclick='show_olympiad(" +
                JSON.stringify(data) + ");'>" + data.title + "</a>"));
        },
        error: function (data) {
            alert(data.error + " fillTeacherOlympiads()");
        },
        data: JSON.stringify({
            "id": id
        })
    });

}

function fillTeacherOlympiadTasks(ol_data) {
    const hwListSel = $("#olympiad_tasks_list");
    hwListSel.empty();
    const ol_id = ol_data.id;


    $("#edit_olympiad_modal_button").show();
    $("#delete_olympiad_modal_button").show();
    $("#add_task_modal_button").show();
    fillOlympiadFields(ol_data);
    fillSources(ol_id);

    //TODO видалити після того як буде метод на сервері
    let datas = [
        {
            id: 1,
            task_caption: "Завдання 1",
            content: "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \\nВизначити наявні інформаційні ресурси та стан їх вразливостей \\nНадати розширений звіт аудиту безпеки ",
            deadline: '23.04.2020 23:55',
            source_id: sessionStorage.getItem("olympiad"),
            links: ['https://distedu.ukma.edu.ua']
        }
    ];
    sessionStorage.setItem("olympiad", ol_id);
    datas.forEach(data => hwListSel.append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
        "<a id='task" + data.id + "' class='hw_link col-md-8' onclick='showOlympiadTask(" + data.id +
        ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3 text-14'>" + data.deadline +
        "</span><button class='btn btn-light col-md-1 text-14 pd-0' data-target='#delete_task_modal' " +
        "onclick='addTaskDelButton(" + data.id + ")' data-toggle='modal'>❌</button></div>"));
    fillCompetition(ol_id);

    /*TODO розкоментити після того як буде метод на сервері
        $.ajax({
            url: 'http://localhost:2303/getolympiadtasks', //TODO @natasha назва метода
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json',
            success: function (datas) {

                sessionStorage.setItem("olympiad", ol_id);
              datas.forEach(data => hwListSel.append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
            "<a id='task" + data.id + "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + data.id +
            ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline +
            "</span><button class='btn btn-outline-danger bg-hover-red col-md-3' data-target='#delete_task_modal' " +
            "onclick='addTaskDelButton(" + data.id + ")' data-toggle='modal'>Видалити</button></div>"));

                    fillCompetition(ol_id);
                      fillSources(ol_id);
            },
            error: function (datas) {
              //  alert(datas.error);
            },
            data: JSON.stringify({
                "id": ol_id
            })
        });
    */

}

function addTaskDelButton(ol_id) {
    $("#delete_task_button").attr('onclick', 'deleteOlympiadTask(' + ol_id + ')');
}

function fillOlympiadFields(ol_data) {
    $("#ol_title").text(ol_data.title);
    $("#ol_discipline").text(ol_data.discipline + " " + ol_data.class_num + " клас");

    sessionStorage.setItem("olympiad", ol_data.id);

    $("#edit_olympiad_name").attr("value", ol_data.title);
    $("#edit_olympiad_discipline").attr("value", ol_data.discipline);
    $("#edit_olympiad_class").attr("value", ol_data.class_num);
    $("#edit_olympiad_notes").text(ol_data.notes);
    $("#edit_olympiad_button").attr("onclick", "editOlympiad(" + ol_data.id + ")");
}

function fillPupilOlympiads(id) {
    const subListSel = $("#pupil_olympiads_list");
    subListSel.empty();

    let datas = [
        {
            id: 1,
            title: 'Районна олімпіада з математики',
            con_id: 2,
            discipline: 'Математика',
            class_num: 11,
            notes: 'нотатки'
        },
        {
            id: 2,
            title: 'конкурс ім. Петра Яцика',
            con_id: 5,
            discipline: 'Українська мова та література',
            class_num: 10,
            notes: 'нотатки'
        }
    ];

    datas.forEach(data => subListSel.append("<a href='#' class='list-group-item list-group-item-action " +
        "list-group-item-light' data-toggle='list' role='tab' onclick='show_olympiad(" + JSON.stringify(data)
        + ");'>" + data.title + "</a>"));

    $.ajax({
        url: 'http://localhost:2303/getpupilolympiads', //TODO @natasha назва метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            datas.forEach(data => subListSel.append("<a href='#' class='list-group-item list-group-item-action " +
                "list-group-item-light' data-toggle='list' role='tab' onclick='show_olympiad(" + JSON.stringify(data)
                + ");'>" + data.title + "</a>"));
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillPupilOlympiadTasks(ol_data) {
    const hwListSel = $("#olympiad_tasks_list");
    hwListSel.empty();
    const ol_id = ol_data.id;


    $("#edit_olympiad_modal_button").hide();
    $("#delete_olympiad_modal_button").hide();
    $("#add_task_modal_button").hide();

    $("#ol_title").text(ol_data.title);
    $("#ol_discipline").text(ol_data.discipline + " " + ol_data.class_num + " клас");


    //TODO видалити після того як буде метод на сервері
    sessionStorage.setItem("olympiad", ol_id);

    let datas = [
        {
            id: 1,
            task_caption: "Завдання 1",
            content: "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \\nВизначити наявні інформаційні ресурси та стан їх вразливостей \\nНадати розширений звіт аудиту безпеки ",
            deadline: '23.04.2020 23:55',
            source_id: sessionStorage.getItem("olympiad"),
            links: ['https://distedu.ukma.edu.ua']
        }
    ];

    datas.forEach(data => hwListSel.append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
        "<a id='task" + data.id + "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + data.id +
        ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline +
        "</span></div>"));

    fillCompetition(ol_id);
    fillSources(ol_id);

    $.ajax({
        url: 'http://localhost:2303/getolympiadtasks', //TODO @natasha назва методу
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {

            sessionStorage.setItem("olympiad", ol_id);
            fillCompetition(ol_id);
            //у завданнях немає атрибуту активний але є дедлайн
            //або додаємо атрибут або не помічаємо сірим завдання у яких вийшов дедлайн
            //якщо додаємо атрибут то цей кусок коду, інакше той що вверху
            datas.forEach(data => {
                if (!data.active)
                    hwListSel.append(" <div id='blocktask" + data.id + "' class='hw-disabled  row'><a id='task" + data.id +
                        "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + data.id + ")' " +
                        "href='#content'>" + data.task_caption + "</a><span class='col-md-3'>"
                        + data.deadline + "</span></div>");
                else
                    hwListSel.append(" <div id='blocktask" + data.id + "' class='hw-active row'><a id='task" + data.id +
                        "' class='hw_link col-md-9 ' href='#content' onclick='showOlympiadTask(" + data.id +
                        ")'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline + "</span>" +
                        "</div>")
            });
            fillSources(ol_id);
        },
        error: function (datas) {
            alert(datas.error + " fillOlympiadTasks()");
        },
        data: JSON.stringify({
            "id": ol_id
        })
    });

}

// OLYMPIAD TASKS FIELD
function fillCompetition(ol_id) {
    let data = {
        "id": 1,
        "title": "Олімпіада з математики",
        "stage": "2 етап",
        "remain_time": "45днів",
        "ev_date": "12.12.2020",
        "place": 'Ліцей "Лідер"'
    };

    $("#competition_title").text(data.title);
    $("#competition_stage").text(data.stage);

    $("#competition_date").text(data.ev_date);
    $("#competition_place").text(data.place);
    $("#competition_time").text(data.remain_time);

    $.ajax({
        url: 'http://localhost:2303/getcompetitioninfo', //TODO @natasha назва методу
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#competition_title").text(data.title);
            $("#competition_stage").text(data.stage);

            $("#competition_date").text(data.ev_date);
            $("#competition_place").text(data.place);
            $("#competition_time").text(data.remain_time);


        },
        error: function (datas) {
            alert(datas.error);
        },
        data: JSON.stringify({
            "id": ol_id
        })
    });
}

function addTask() {
//TODO @natasha addTask() пропиши сюди код ідентичний до addHometask(), коли пофіксиш addHometask
    if (!validEmpty('new_task_title') || !validEmpty('new_task_content') || !validEmpty("new_task_deadline"))
        return false;

    let id = sessionStorage.getItem("olympiad");

    let links = [];
    $.each($('input', '#add_task_links'), function () {
        if ($(this).val() != "")
            links.push($(this).val());
    });


    let data = {
        "task_caption": $("#new_task_title").val(),
        "content": $("#new_task_content").val(),
        "deadline": $("#new_task_deadline").val(),
        "notes": $("#new_task_notes").val(),
        "hyperlinks": links,
        "source_id": id
    };


}

function editTask(id) {

    if (!validEmpty('edit_task_title') || !validEmpty('edit_task_content') || !validEmpty("edit_task_deadline"))
        return false;

    let links = [];
    $.each($('input', '#edit_task_links'), function () {
        if ($(this).val() != "")
            links.push($(this).val());
    });

    const data = {
        "id": hw_id,
        "task_caption": $("#edit_task_title").val(),
        "content": $("#edit_task_content").val(),
        "notes": $("#edit_task_notes").val(),
        "deadline": $("#edit_task_deadline").val(),
        "links": links
    };
//TODO @natasha editTask() пропиши сюди код іддентичний до editHometask(), коли пофіксиш editHometask

}

function deleteOlympiadTask(id) {
    $.ajax({
        url: 'http://localhost:2303/deletehometask', //TODO @natasha назва метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#blocktask" + id).remove();
            $("#delete_task_modal").modal('hide');
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillOlympiadTask(task_id) {

    $.ajax({
        url: 'http://localhost:2303/gethometaskinfo', //TODO @natasha назва метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {

            $("#task_title").text(data.task_caption);
            $("#task_task").text(data.content);
            const linkSel = $("#task_links");
            linkSel.empty();
            data.hyperlinks.forEach(link => linkSel.append("<a class='italic' href='" + link + "'>" + link + " </a><br>"));
            $("#task_notes").text(data.notes);

            //TODO @solja gethometaskinfo
            if (localStorage.getItem("usertype") === "pupil") {
                $("#edit_task_modal_button").hide();
                $("#mark_task_modal_button").hide();
            } else if (localStorage.getItem("usertype") === "teacher") {
                $("#edit_task_modal_button").show();
                $("#mark_task_modal_button").show();
                fillTaskFields(data);
            }
            fillAnswerFields(data);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": task_id
        })
    });

}

function fillTaskFields(data) {

    removeValid("edit_task_form");

    $("#edit_task_title").attr("value", data.task_caption);
    $("#edit_task_content").text(data.content);
    $("#edit_task_deadline").attr("value", data.deadline);
    $("#edit_task_notes").text(data.notes);

    const linkSel = $("#edit_task_links");
    linkSel.empty();
    for (let i in data.hyperlinks) {
        linkSel.append("<input type='text' id='edit_task_link" + i +
            "' value='" + data.hyperlinks[i] + "' class='form-control col-md-11' max='255'>" +
            "<button class='btn btn-outline-light col-md-1' id='edit_task_hyperlink_field_del" + i + "' onclick='deleteEditTaskHyperlinkField(" + i + ")'>❌</button>");
    }
    linkSel.append("<button id='edit_task_hyperlink_field_button' class='btn btn-dark float-left' onclick='editTaskHyperlinkField("
        + data.hyperlinks.length + ")'> + </button>");

    $("#edit_task_button").attr('onclick', 'editTask(' + data.task_id + ')');
}

function fillAnswerFields(task_data) { //TODO передається вся інфа по завданню (замість об'єкту task який я ручками написала)
    let str = "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \n" +
        "Визначити наявні інформаційні ресурси та стан їх вразливостей\n" +
        "Надати розширений звіт аудиту безпеки ";
    let task = {
        "id": "1",
        "title": "Розділ 22",
        "content": str,
        "active": true,
        "deadline": "5.04.2020 23:55",
        "remain_time": "3д 5год 36хв",//"",
        "notes": "notesnotesnotesnotes",
        "link": "www.cisco.com"

    };
    let answer = {
        "id": "3",
        "text": "aoaoaoaoaooao oa oa oao oaooao o aoo oooaoaoaooao",
        "hyperlink": "www.distedu.ukma.edu.ua",
        "response": "looks good",
        "mark": "11/12"
    };

    $("#answer_deadline").text(task.deadline);


    const answerSel = $("#answer_status");
    if (answer.text === "") { //нічого не здано
        answerSel.text("Нічого не здано");
        answerSel.removeClass("table-success");
        $("#answer_container").empty();
        $("#answer_link_container").empty();
    } else {
        answerSel.text("Здано на оцінення");
        answerSel.addClass("table-success");
        $("#answer_container").empty().text(answer.text);
        $("#answer_link_container").empty().append(" <a id='answer_link' href='" + answer.hyperlink + "'>" + answer.hyperlink + "</a>")

    }
    if (task.remain_time == "") {
        $("#submit_answer_button").attr("disabled", "disabled");
        $("#edit_answer_button").attr("disabled", "disabled");
        $("#answer_timeleft").addClass("table-danger").text("Час вичерпано");
    } else {

        $("#submit_answer_button").removeAttr("disabled");
        $("#edit_answer_button").removeAttr("disabled");
        $("#answer_timeleft").removeClass("table-danger").text(task.remain_time);
    }


    if (localStorage.getItem("usertype") === "pupil") {
        $("#edit_task_modal_button").hide();
        $("#submit_mark_button").hide();
        $("#edit_mark_button").hide();
        $("#submit_answer_button").show();
        $("#edit_answer_button").show();


        if (answer.text === "") { //нічого не здано

            $("#submit_answer_button").show().attr("onclick", "submitAnswer(" + answer.id + ")");
            $("#edit_answer_button").hide();
            $("#answer_container").append(" <textarea id='answer_area' class='text-break form-control' rows='6'>" +
                +"</textarea>");
            $("#answer_link_container").append("<input type='text' class='form-control' id='answer_link_input'>");

        } else { //здано

            $("#submit_answer_button").hide();
            $("#edit_answer_button").show().attr("onclick", "editAnswer(" + JSON.stringify(answer) + ")");
        }
        if (answer.mark === "") {
            $("#answer_mark_container").empty().append("<p>Не оцінено</p>");
        } else {
            $("#answer_mark_container").empty().append("<p>" + answer.mark + "</p>");
        }

        $("#answer_comment_container").empty().append("<p>" + answer.response + "</p>");


    } else if (localStorage.getItem("usertype") === "teacher") {
        $("#edit_task_modal_button").show();
        $("#submit_mark_button").hide().attr('onclick', 'submitMark(' + answer.id + ')');
        $("#edit_mark_button").show().attr('onclick', 'editMark(' + JSON.stringify(answer) + ')');
        $("#submit_answer_button").hide();
        $("#edit_answer_button").hide();
        $("#answer_mark_container").empty().append("<p>" + answer.mark + "</p>");
        $("#answer_comment_container").empty().text(answer.response);
    }


}


//SOURCES BLOCK
function fillSources(ol_id) {
    $("#additional_sources_block").empty();

    //TODO сюди мають прилітати всі додаткові джерела з лінками, подумаємо чи треба їх едітать
    let datas = [
        {
            'id': 2,
            'caption': 'додаткове джерело 1',
            'content': 'юююююююююююююююний орел, юний орееееееееееееееел',
            'notes': '',
            'links': ["https://www.pinterest.com/"]
        },
        {
            'id': 2,
            'caption': 'додаткове джерело 2',
            'content': 'ти лети від джерел до джерел від джерел до джерел',
            'notes': '',
            'links': ["https://distedu.ukma.edu.ua/grade/report/user/index.php?id=66", "https://unsplash.com/"]
        }
    ];
    if (datas.length < 1) return false;

    const sources = $("#additional_sources_block");
    sources.empty();
    let str = "";
    datas.forEach(data => {
        str += "<div class='card mg-10'><p class='card-header'>" + data.caption + "</p><div class='pd-7'><p class='text-14'>" + data.content + "</p>" +
            "<p class='text-muted text-13'>" + data.notes + "</p>";

        if (data.links.length > 0)
            for (let j of data.links)
                str += "<a class='text-a text-13' href='" + j + "'>" + j + "</a>";
        str+="</div></div>";
        sources.append(str);
        str="";
    });


}