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
            setSchoolsTable();

        },
        error: function (data) {
            console.log(data.error);
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
                console.log(data.error);
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
    $("#edit_pupil_modal_button").show();

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
                fillPupilFields(data, id);
                $("#edit_pupil_modal").modal('hide');
                removeValid("edit_pupil_form");
            },
            error: function (data2) {
                console.log(data2.error);
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
            sessionStorage.setItem("teacher", id);
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
    $("#teacher_pib").text(data.surname + ' ' + data.name + ' ' + data.patronymic);
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

    if (data.phd)
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
        let phd=0;
        if($("#new_teacher_phd").prop('checked')) phd=1;

        let data = {
            "id": id,
            "name": $("#new_teacher_name").val(),
            "surname": $("#new_teacher_surname").val(),
            "patronymic": $("#new_teacher_fathername").val(),
            "email": $("#new_teacher_email").val(),
            "phone": $("#new_teacher_phone").val(),
            "education": $("#new_teacher_education").val(),
            "phd": phd,
            "notes": $("#new_teacher_notes").val()
        };

        $.ajax({
            url: 'http://localhost:2303/editteacherinfo',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data2) {
                fillTeacherFields( data, id);
                $("#edit_teacher_modal").modal('hide');
                removeValid("edit_teacher_form");

            },
            error: function (data2) {
                console.log(data2.error);
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


//ніде не юзається але потім пригодиться
function fillEditSchoolModal(data){
    $("#edit_school_name").val(data.name);
    $("#edit_school_region").val(data.region);

    $("#edit_school_house").val(data.house);
    $("#edit_school_phone").val(data.phone);
    $("#edit_school_street").val(data.street);

    $("#edit_school_notes").text(data.notes);
}

function addSchool() {
    if (!validName("input_school_name") || !validFName("input_school_region") ||
        !validName("input_school_street") || !validPhone("input_school_phone") ||
        !validHouse("input_school_house")) {
        return false;
    }
    const region = $("#input_school_region").val();
    let data = {
        "name": $("#input_school_name").val(),
        "region": region,
        "cityid": $("#input_school_city").val(),
        "street": $("#input_school_street").val(),
        "house": $("#input_school_house").val(),
        "phone": $("#input_school_phone").val()
    };
    const address = data.street + " " + data.house;
    const notes = $("#input_school_notes").val();
    if (notes !== "") {
        data['notes'] = notes;
    }
    if (notes !== "") {
        data['region'] = region;
    }
    $.ajax({
        url: 'http://localhost:2303/addschool',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {


            $("#content").prepend("<div class='alert alert-success alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>" + data2.code + "</strong> - код нової школи. Вітаємо!" +
                "</div>");

            $("#add_school_modal").modal('hide');
            removeValid("add_school_form");
            clearForm("add_school_form");

            $("#table_schools_admin_body").append("<tr id='row" + data2.code + "' class='tableelements'>" +
                "<th scope='row'>" + data2.code + "</th><td>" + data.name + "</td><td>" + address + "</td>" +
                "<td>" + data.phone + "</td><td><button id='edit_school' type='button' class='btn btn-sm btn-info bg-blue' " +
                "data-toggle='modal' data-target='#edit_school_modal' onclick=setSchoolCode('" + data2.code + "')>️edit</button>" +
                "<button class='btn btn-sm btn-danger bg-red' onclick=editSchool('" + data2.code + "')>delete</button></td>" +
                "</tr>")

                //TODO natasha
        },
        error: function () {
            $("#content").prepend("<div class='alert alert-danger alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>Error!</strong> Не вдалося додати школу </div>");
            removeValid("add_school_form");
            clearForm("add_school_form");

        },
        data: JSON.stringify(data)
    });
}

function deleteSchool(id) {
    if (!confirm("Точно видалити школу??? Всі вчителі та учні не зможуть відновити свої акаунти!!!")) {
        return false;
    }
    $.ajax({
        url: 'http://localhost:2303/deleteschool',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data2) {
            $("#row" + id).hide();
        },
        error: function (data) {
            console.log(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function editSchool() {

    if (!validName("edit_school_name") || !validFName("edit_school_region") ||
        !validName("edit_school_street") || !validPhone("edit_school_phone") ||
        !validHouse("edit_school_house")) {
        return false;
    }
    const school_code = localStorage.getItem("school_code");

    let data = {
        "name": $("#edit_school_name").val(),
        "region": $("#edit_school_region").val(),
        "cityid": $("#edit_school_city").val(),
        "street": $("#edit_school_street").val(),
        "house": $("#edit_school_house").val(),
        "phone": $("#edit_school_phone").val(),
        "code": school_code
    };
    const address = data.street + " " + data.house;
    $.ajax({
        url: 'http://localhost:2303/editschool',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data2) {

            localStorage.removeItem("school_code");
            const selector = $("#row" + school_code);
            selector.empty();
            selector.append("<th scope='row'>" + data.code + "</th><td>" + data.name + "</td><td>" + address + "</td>" +
                "<td>" + data.phone + "</td><td><button id='edit_school' type='button' class='btn btn-sm btn-info bg-blue' " +
                "data-toggle='modal' data-target='#edit_school_modal' onclick=setSchoolCode('" + data.code + "')>️edit</button>" +
                "<button class='btn btn-sm btn-danger bg-red' onclick=deleteSchool('" + data.code + "')>delete</button></td>"
            );
            $("#edit_school_modal").modal('hide');
            clearForm("edit_school_form");
            removeValid("edit_school_form");
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}

//SUBJECT SECTION
function addSubject() {
    if (!validEmpty("new_subject_name") || !validClass("new_subject_class"))
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
    let teach_id = sessionStorage.getItem("teacher");
    $.ajax({
        url: 'http://localhost:2303/deletesubject',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {

            $("#delete_sj_modal").modal('hide');
            fillTeacherSubjects(teach_id);
            showPage("teacher_list_page");


        },
        error: function (data) {
            console.log(data.error);
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

    clearSubjectHyperlinks();

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

function fillPupilSubjectsWithoutOlimp(id) {
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
            fillSubjectFields(data2);
            $("#edit_sj_modal").modal('hide');
            removeValid("edit_subject_form");
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}

//HOME TASKS SECTION
function fillTeacherHometasks(subject_data) {
    const hwListSel = $("#hometasks_list");
    hwListSel.empty();
    const subject_id = subject_data.id;
    $("#subject_code").text(subject_id);

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
    $("#subject_code").empty();
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
            $("#subject_title").text(subject_data.title + " " + subject_data.class_num);
            $("#subject_descr").text(subject_data.notes + "");
            $("#subject_teacher_link").attr("onclick", "showTeacherProfileSub('" + subject_data.id + "')");
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
            data['hw_id'] = id;

            if (localStorage.getItem("usertype") === "pupil") {
                $("#edit_hometask_modal_button").hide();
            } else if (localStorage.getItem("usertype") === "teacher") {
                $("#edit_hometask_modal_button").show();
                fillHometaskFields(data);
            }
        },
        error: function (data) {
            console.log(data.error);
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
    $("#edit_hw_button").attr('onclick', "editHomework('" + data.hw_id + "')");
}

function addHomework() {
    if (!validEmpty('new_hw_title') || !validEmpty('new_hw_content') || !validEmpty("new_hw_deadline"))
        return false;

    let id = sessionStorage.getItem("subject");
    let links = [];
    $.each($('input', '#add_hw_links'), function () {
        if ($(this).val() !== "")
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
    console.log(data);

    $.ajax({
        url: 'http://localhost:2303/addhometask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            $("#add_hometask_modal").modal('hide');
            showHometask(data2.hw_id);
            removeValid("add_hw_form");
            clearForm("add_hw_form");
        },
        error: function (data2) {
            console.log(data2);
        },
        data: JSON.stringify(data)
    });

    clearSubjectHyperlinks();
}

function addHwDelButton(hw_id) {
    $("#delete_hw_button").attr('onclick', 'deleteHometask(' + hw_id + ')');
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
            console.log(data.error);
        },
        data: JSON.stringify({
            "id": hw_id
        })
    });
}

function editHomework(hw_id) {
    if (!validEmpty('edit_hw_title') || !validEmpty('edit_hw_content') || !validEmpty("edit_hw_deadline"))
        return false;

    let links = [];
    $.each($('input', '#edit_hw_links'), function () {
        if ($(this).val() !== "")
            links.push($(this).val());
    });

    const data = {
        "id": hw_id,
        "hw_title": $("#edit_hw_title").val(),
        "content": $("#edit_hw_content").val(),
        "notes": $("#edit_hw_notes").val(),
        "deadline": $("#edit_hw_deadline").val(),
        "hyperlinks": links
    };
    $.ajax({
        url: 'http://localhost:2303/edithometask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            //TODO @solja edithometask
            $("#hw_title").text(data.hw_title);
            $("#hw_task").text(data.content);
            const linkSel = $("#hw_links");
            linkSel.empty();
            links.forEach(link => linkSel.append("<a class='italic' href='" + link + "'>" + link + " </a><br>"));
            $("#hw_notes").text(data.notes);

            removeValid("edit_hw_form");
            clearForm("edit_hw_form");
            fillHometaskFields(data);
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}


//OLYMPIADS SECTION
function fillTeacherOlympiads(id) {
    $.ajax({
        url: 'http://localhost:2303/getteacherolympiads',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            $("#add_olympiad_button").attr("onclick", "addOlympiad('" + id + "')");
            const teachListSel = $("#teacher_olympiads_list");
            teachListSel.empty();

            datas.forEach(data => teachListSel.append("<a href='#' class='list-group-item list-group-item-action " +
                "list-group-item-light ' data-toggle='list' role='tab' id='ol" + data.id + "' onclick='show_olympiad(" +
                JSON.stringify(data) + ");'>" + data.title + "</a>"));
        },
        error: function (data) {
            console.log(data.error);
        },
        data: JSON.stringify({"id": id})
    });

}

function deleteOlympiad() {
    let id = sessionStorage.getItem("olympiad");
    let teach_id = sessionStorage.getItem("teacher");

    $.ajax({
        url: 'http://localhost:2303/deleteolympiad',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {

            $("#delete_olympiad_modal").modal('hide');
            fillTeacherOlympiads(teach_id);
            showPage("teacher_olympiads_page");
        },
        error: function (data) {
            console.log(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function addOlympiad(id) {
    if (!validEmpty("new_olympiad_name") || !validEmpty("new_olympiad_discipline") || !validClass("new_olympiad_class"))
        return false;


    const data = {
        "title": $("#new_olympiad_name").val(),
        "discipline": $("#new_olympiad_discipline").val(),
        "notes": $("#new_olympiad_notes").val(),
        "class_num": $("#new_olympiad_class").val(),
        "teacher_id": localStorage.getItem("authentication"),
        "con_id": $("#new_olympiad_competition").val()
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
        "discipline": $("#edit_olympiad_discipline").val(),
        "class_num": $("#edit_olympiad_class").val(),
        "notes": $("#edit_olympiad_notes").val()
    };
    $.ajax({
        url: 'http://localhost:2303/editolympiad',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            fillOlympiadFields(data);
            $("#edit_olympiad_modal").modal('hide');
            removeValid("edit_olympiad_form");
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}


function fillPupilOlympiads(id) {
    const subListSel = $("#pupil_olympiads_list");
    subListSel.empty();
    $.ajax({
        url: 'http://localhost:2303/getpupilolympiads',
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
            console.log(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillTeacherOlympiadTasks(ol_data) {
    console.log(ol_data);
    const hwListSel = $("#olympiad_tasks_list");
    hwListSel.empty();
    const ol_id = ol_data.id;
    $("#olympiad_code").text(ol_id);

    $.ajax({
        url: 'http://localhost:2303/getolympiadtasksandsources',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            $("#edit_olympiad_modal_button").show();
            $("#delete_olympiad_modal_button").show();
            $("#add_task_modal_button").show();
            fillOlympiadFields(ol_data);
            fillCompetition(ol_data);

            sessionStorage.setItem("olympiad", ol_id);
            datas.tasks.forEach(data => hwListSel.append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
                "<a id='task" + data.id + "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + JSON.stringify(data) +
                ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline +
                "</span><button class='btn btn-outline-danger bg-hover-red ' data-target='#delete_task_modal' " +
                "onclick='addTaskDelButton(" + data.id + ")' data-toggle='modal'>Видалити</button></div>"));
            fillSources(datas.sources);
        },
        error: function (datas) {
            console.log(datas.error);
        },
        data: JSON.stringify({
            "id": ol_id
        })
    });

}


function fillPupilOlympiadTasks(ol_data) {
    const hwListSel = $("#olympiad_tasks_list");
    hwListSel.empty();
    $("#olympiad_code").empty();
    const ol_id = ol_data.olimp_id;
    $("#edit_olympiad_modal_button").hide();
    $("#delete_olympiad_modal_button").hide();
    $("#add_task_modal_button").hide();

    $("#ol_title").text(ol_data.title);
    $("#ol_discipline").text(ol_data.discipline + " " + ol_data.class_num + " клас");

    $.ajax({
        url: 'http://localhost:2303/getolympiadtasksandsources',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            sessionStorage.setItem("olympiad", ol_id);
            fillCompetition(ol_data);
            fillSources(datas.sources);
            $("#olimpiad_teacher_link").attr("onclick", "showTeacherProfileOlimpiad('" + ol_data.olimp_id + "')");
            datas.tasks.forEach(data => {
                if (!data.active)
                    hwListSel.append(" <div id='blocktask" + data.id + "' class='hw-disabled  row'><a id='task" + data.id +
                        "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + JSON.stringify(data) + ")' " +
                        "href='#content'>" + data.task_caption + "</a><span class='col-md-3'>"
                        + data.deadline + "</span></div>");
                else
                    hwListSel.append(" <div id='blocktask" + data.id + "' class='hw-active row'><a id='task" + data.id +
                        "' class='hw_link col-md-9 ' href='#content' onclick='showOlympiadTask(" + JSON.stringify(data) +
                        ")'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline + "</span>" +
                        "</div>")
            });
        },
        error: function (datas) {
            console.log(datas.error);
        },
        data: JSON.stringify({
            "id": ol_id
        })
    });

}

function deleteOlympiadTask(id) {

    //TODO natasha delete task
    $.ajax({
        url: 'http://localhost:2303/deleteolimpiatask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#blocktask" + id).remove();
            $("#delete_task_modal").modal('hide');
        },
        error: function (data) {
            console.log(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillAnswerFieldsPupil(task_data) {
    console.log(task_data);
    const answerSel = $("#answer_status");
    const submitSel = $("#submit_answer_button");
    const editSel = $("#edit_answer_button");
    $("#submit_mark_button").hide();
    $("#edit_mark_button").hide();
    $("#answer_deadline").text(task_data.deadline);
    const answerContSel = $("#answer_container");
    const answerLinksSel = $("#answer_link_container");

    $.ajax({
        url: 'http://localhost:2303/getpupilanswer',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (answer) {
            console.log(answer);
            if (task_data.active) {
                $("#answer_timeleft").removeClass("table-danger").text(task_data.remaining_time);
            } else {
                $("#answer_timeleft").addClass("table-danger").text("Час вичерпано");
            }
            if (!answer.has) {
                $("#answer_table_mark").hide();
                $("#answer_table_comment").hide();
                answerSel.text("Нічого не здано");
                answerSel.removeClass("table-success");
                answerContSel.empty();
                answerLinksSel.empty();
                $("#answer_mark_container").empty().append("<p>Не оцінено</p>");
                if (task_data.active) {
                    $("#answer_table_link").show();
                    submitSel.show();
                    answerContSel.empty();
                    answerLinksSel.empty();
                    submitSel.show().attr("onclick", "submitAnswer('" + task_data.id + "')");
                    editSel.hide();
                    answerContSel.append(" <textarea id='answer_area' class='text-break form-control' rows='6'></textarea>");
                    answerLinksSel.append("<input type='text' class='form-control' id='answer_link_input'>");
                } else {
                    $("#answer_table_link").hide();
                    editSel.hide();
                    submitSel.hide();
                }
            } else {
                $("#answer_table_link").show();
                $("#answer_table_mark").show();

                submitSel.hide();
                answerSel.text("Здано на оцінення");
                answerSel.addClass("table-success");
                if (answer.text === "") {
                    $("#answer_table_comment").hide();
                } else {
                    $("#answer_container").empty().text(answer.text);
                    $("#answer_table_comment").show();
                }
                $("#answer_link_container").empty().append(" <a id='answer_link' href='" + answer.hyperlink + "'>" + answer.hyperlink + "</a>");

                $("#answer_comment_container").empty().append("<p>" + answer.response + "</p>");

                if (task_data.active) {
                    editSel.show().attr("onclick", "editAnswer(" + JSON.stringify(answer) + ")");
                } else {
                    editSel.hide();
                }

                if (answer.mark === "") {
                    $("#answer_mark_container").empty().append("<p>Не оцінено</p>");
                } else {
                    $("#answer_mark_container").empty().append("<p>" + answer.mark + "</p>");
                }
            }

        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "task_id": task_data.id,
            "pupil_id": localStorage.getItem("authentication")
        })
    });
}

function submitAnswer(task_id) {
    const textSel = $("#answer_area");
    const text = textSel.val();
    const hyperlink = $("#answer_link_input").val();
    if (text === "") {
        textSel.addClass('is-invalid');
    }

    const data = {
        "id": task_id,
        "text": text,
        "hyperlink": hyperlink,
        "pupil_id": localStorage.getItem('authentication')
    };

    $.ajax({
        url: 'http://localhost:2303/submitanswer',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data2) {
            $("#answer_container").empty().text(data.text);
            $("#answer_link_container").empty().append(" <a id='answer_link' href='" + data.hyperlink + "'>" + data.hyperlink + "</a>");
            $("#submit_answer_button").hide().attr("onclick", "submitAnswer('" + answer_id + "')");
            $("#edit_answer_button").show().attr("onclick", "editAnswer(" + JSON.stringify(data) + ")");
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}

function addTask() {
    if (!validEmpty('new_task_title') || !validEmpty('new_task_content') || !validEmpty("new_task_deadline"))
        return false;
    let id = sessionStorage.getItem("olympiad");
    let links = [];
    $.each($('input', '#add_task_links'), function () {
        if ($(this).val() !== "")
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
    $.ajax({
        url: 'http://localhost:2303/addtask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data2) {
            data['id'] = data2.id;
            $("#olympiad_tasks_list").append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
                "<a id='task" + data.id + "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + JSON.stringify(data) +
                ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline +
                "</span><button class='btn btn-outline-danger bg-hover-red col-md-3' data-target='#delete_task_modal' " +
                "onclick='addTaskDelButton('" + data.id + "')' data-toggle='modal'>Видалити</button></div>")
            $("#add_task_modal").modal('hide');
            removeValid("add_task_form");
            clearForm("add_task_form");
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
    clearOlympiadTaskHyperlinks();
}

function editTask(id) {


    if (!validEmpty('edit_task_title') || !validEmpty('edit_task_content') || !validEmpty("edit_task_deadline"))
        return false;
    let links = [];
    $.each($('input', '#edit_task_links'), function () {
        if ($(this).val() !== "")
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
    $.ajax({
        url: 'http://localhost:2303/edittask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data2) {
            $('#edit_task_modal').modal('hide');
            removeValid("edit_task_form");
            clearForm("edit_task_form");
            fillTaskFields(data);

        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}

function fillAnswerFieldsTeacher(task_id) {
    const selector = $("#for_teacher_answer");
    selector.empty();

    $.ajax({
        url: 'http://localhost:2303/getallanswersforteacher',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            data.forEach(answer => selector.append(getAnswerComponent(answer)));
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "id": task_id
        })
    });
}

function saveAnswerFromTeacher(answer) {
    const data = {
        "id": answer.id,
        "mark": $("#pupil_answer_mark").val(),
        "response": $("#answer_response_notes").val()
    };
    if (data.mark === "" && data.response === "") {
        $('#pupil_answer_for_teacher_modal').modal('toggle');
        return true;
    }
    $.ajax({
        url: 'http://localhost:2303/changeanswerbyteacher',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            $('#pupil_answer_for_teacher_modal').modal('toggle');
            if (data.mark !== "") {
                $("#answer_card" + answer.id).removeClass("bg-red");
            }
            answer['mark'] = data['mark'];
            answer['response'] = data['response'];
            $("#answer_card" + answer.id).attr("onclick", "saveAnswerFromTeacher(" + JSON.stringify(answer) + ")");
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}