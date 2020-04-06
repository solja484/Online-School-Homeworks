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
            fillPupilFields(data, id);
            sessionStorage.setItem("schoolcode", data.schoolid);
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
            data['id'] = data2.code;
            $("#teacher_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' data-toggle='list'" +
                " role='tab' onclick='show_subject("+JSON.stringify(data)+")'>" + data.title + "</a>");
            $("#add_subject_modal").modal('hide');
            setClear(["new_subject_name", "new_subject_description", "new_subject_class"]);
        },
        error: function (data2) {
            alert(data2.error);
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
            console.log(datas);
            datas.forEach(data => subListSel.append("<a href='#' class='list-group-item list-group-item-action " +
                "list-group-item-light' data-toggle='list' role='tab' onclick='show_subject(" + JSON.stringify(data)
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
            fillSubjectFields(data);
            $("#edit_subject_modal").modal('hide');
            //TODO @solja editSubject
        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}


//HOMETASKS SECTION
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
            alert(datas.error);
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
            fillSubjectFields(subject_data);

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
                        "<div class='custom-control custom-checkbox col-md-1'></div>")
            });
        },
        error: function (datas) {
            alert(datas.error);
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


            if (localStorage.getItem("usertype") === "pupil") {
                $("#edit_hometask_modal_button").hide();
            } else {
                $("#edit_hometask_modal_button").show();
                //TODO @solja gethometaskinfo

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

function addHomework() {
    let id = sessionStorage.getItem("subject");

    let data = {
        "title": $("#new_hw_title").val(),
        "content": $("#new_hw_content").val(),
        "deadline": $("#new_hw_deadline").val(),
        "notes": $("#new_hw_notes").val(),
        "hyperlinks": [], //TODO @ solja add hyperlinks value
        "id": id
    };
    $.ajax({
        url: 'http://localhost:2303/addhometask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            $("#add_hometask_modal").modal('hide');
            showHometask(data2.hw_id);
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
function editHomework() {
    const data = {
        "id": 1, //hw_id
        "title": "hw_title",
        "content": content,
        "notes": "notes",
        "deadline": "2020-04-12 23:59",
        "links": [], //треба масив всіх лінків, я просто видаляю всі минулі і записую нові, таким чином можна і видаляти лінки і едітати і додавати нові
    };

    $.ajax({
        url: 'http://localhost:2303/edithometsk',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            // прописати зміни в самій домашні на основі data
            //TODO @solja editHomework
        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}