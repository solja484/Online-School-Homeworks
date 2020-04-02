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

                // setClear(["#new_admin_name", "#new_admin_surname", "#new_admin_login",
                // "#new_admin_email", "#new_admin_notes"]);
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
            fillSchoolInfo(data.schoolid);
            $("#pupil_school_link").text(data.schoolname);
            fillPupilFields(data, id);
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
            fillSchoolInfo(data.schoolid);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            id: id
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

//# Повертає: name, city, region, street, house, phone, notes
function fillSchoolInfo(id) {
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
            id: id
        })
    });
}

function fillTeacherSubjects(id) {
    $("#teacher_list").empty();
    let data =
        {
            "id": "1",
            "name": "Алгебра+ 9 клас",
            "descr": "Поглиблена алгебра для 9 класу",
            "class": "9"

        };


    $("#teacher_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' " +
        "data-toggle='list' role='tab' id='sj" + data.id + "' onclick='show_subject(" + JSON.stringify(data) + ");'>" + data.name + "</a>");

    //TODO  SELECT name FROM subjects WHERE teach_id = data["id"] ORDER BY name)

    $.ajax({
        url: 'http://localhost:2303/getteachersubjects', //TODO @natasha
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {


        },
        error: function (data) {
            // alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });

}

function fillTeacherHometasks(subject_data) {
    $("#hometasks_list").empty();
    $("#edit_subject_modal_button").show();
    $("#delete_subject_modal_button").show();
    $("#add_hometask_modal_button").show();
    fillSubjectFields(subject_data);
    //TODO щоб витягати домашки передаю ід предмета SELECT * FROM hometasks WHERE subject_id=data["id"]
    let data = {
        0: {
            "id": "1",
            "title": "Розділ 22",
            "active": false,
            "deadline": "30.03.2020 23:55"

        },
        1: {
            "id": "2",
            "title": "Розділ 23",
            "active": false,
            "deadline": "4.04.2020 23:55"

        },
        2: {
            "id": "3",
            "title": "Розділ 24",
            "active": true,
            "deadline": "6.04.2020 23:55"

        }
    };

    sessionStorage.setItem("subject", subject_data.id);

    for (i in data) {

        $("#hometasks_list").append(" <div id='blockhw" + data[i]["id"] + "' class='hw-active col-md-12 row'>" +
            "            <a id='hw" + data[i]["id"] + "' class='hw_link col-md-7 ' onclick='showHometask(" + data[i]["id"] + ")' href='#hometask_page'>" + data[i]["title"] + "</a>" +
            "        <span class='col-md-3'>" + data[i]["deadline"] + "</span>" +
            "<button class='btn btn-outline-danger bg-hover-red' data-target='#delete_hw_modal' " +
            "onclick='addHwDelButton(" + data[i]["id"] + ")' data-toggle='modal'>Видалити</button>" +
            "        </div>");


    }


    $.ajax({
        url: 'http://localhost:2303/getteacherhometasks', //TODO @natasha
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {


        },
        error: function (data) {
            // alert(data.error);
        },
        data: JSON.stringify({
            id: subject_data.id
        })
    });


}

function addHwDelButton(hw_id) {
    $("#delete_hw_button").attr('onclick', 'deleteHometask(' + hw_id + ')');

}

function editSubject() {
    let id = sessionStorage.getItem("subject");

    if (!validEmpty("edit_subject_name") || !validFreeClass("edit_subject_class"))
        return false;
    let name = $("#edit_subject_name").val();

    let data = {
        "id": id,
        "name": name,
        "class": $("#edit_subject_class").val(),
        "description": $("#edit_subject_description").val()
    };


    $.ajax({
        url: 'http://localhost:2303/editsubject',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            fillSubjectFields(data2);
            $("#edit_subject_modal").modal('hide');
        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });


}

function fillSubjectFields(data) {

    $("#subject_title").text(data.name + " " + data.class);
    $("#subject_descr").text(data.descr + "");

    $("#edit_subject_name").attr("value", data.name);
    $("#edit_subject_description").text(data.descr);
    $("#edit_subject_class").attr("value", data.class);

}


function fillPupilSubjects(id) {

    $("#subject_list").empty();
    let data =
        {
            "id": "1",
            "name": "Алгебра+ 9 клас",
            "descr": "Поглиблена алгебра для 9 класу",
            "class": "9"

        };

    $("#subject_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' " +
        "data-toggle='list' role='tab' onclick='show_subject(" + JSON.stringify(data) + ");'>" + data.name + "</a>");

    $.ajax({
        url: 'http://localhost:2303/getpupilsubjects', //TODO  SELECT name FROM subjects WHERE subject_id =
        //TODO  (SELECT subject_id FROM studying WHERE student_id = data["id"]) ORDER BY name
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {


        },
        error: function (data) {
            // alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}


function fillPupilHometasks(subject_data) {
    $("#hometasks_list").empty();

    $("#edit_subject_modal_button").hide();
    $("#delete_subject_modal_button").hide();
    $("#add_hometask_modal_button").hide();
    $("#subject_title").text(subject_data.name + " " + subject_data.class);
    $("#subject_descr").text(subject_data.descr + "");

    let data = {
        0: {
            "id": "1",
            "title": "Розділ 22",
            "active": false,
            "deadline": "30.03.2020 23:55"

        },
        1: {
            "id": "2",
            "title": "Розділ 23",
            "active": false,
            "deadline": "4.04.2020 23:55"

        },
        2: {
            "id": "3",
            "title": "Розділ 24",
            "active": true,
            "deadline": "6.04.2020 23:55"

        }
    };

    sessionStorage.setItem("subject", subject_data.id);

    for (i in data) {
        if (data[i]["active"] == true)
            $("#hometasks_list").append(" <div class='hw-active col-md-12 row'>" +
                "            <a id='hw" + data[i]["id"] + "' class='hw_link col-md-7 ' onclick='showHometask(" + data[i]["id"] + ")' " +
                "href='#hometask_page'>" + data[i]["title"] + "</a>" +
                "        <span class='col-md-3'>" + data[i]["deadline"] + "</span></div>");
        else
            $("#hometasks_list").append(" <div class='hw-disabled col-md-12 row'>" +
                "            <a id='hw" + data[i]["id"] + "' class='hw_link col-md-7 ' href='#hometask_page'" +
                " onclick='showHometask(" + data[i]["id"] + ")'>" + data[i]["title"] + "</a>" +
                "        <span class='col-md-3'>" + data[i]["deadline"] + "</span>" +
                "<div class='custom-control custom-checkbox col-md-1'></div>");
    }

    $.ajax({
        url: 'http://localhost:2303/getpupilhometasks', //TODO @natasha
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {


        },
        error: function (data) {
            // alert(data.error);
        },
        data: JSON.stringify({
            id: subject_data.id
        })
    });


}


function fillHometask(id) {

    if (localStorage.getItem("usertype") == "pupil") {

        $("#edit_hometask_modal_button").hide();
        $("#mark_hw_modal_button").hide();
        let str = "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \n" +
            "Визначити наявні інформаційні ресурси та стан їх вразливостей\n" +
            "Надати розширений звіт аудиту безпеки "

        let data = {
            "id": "1",
            "title": "Розділ 22",
            "content": str,
            "active": false,
            "deadline": "5.04.2020 23:55",
            "time_left": "",//"3д 5год 36хв",
            "notes": "notesnotesnotesnotes",
            "link": "www.cisco.com"

        };

        let data2 = {
            "id": "3",
            "answer": "aoaoaoaoaooao oa oa oao oaooao o aoo oooaoaoaooao",
            "hyperlink": "www.distedu.ukma.edu.ua",
            "comment": "looks good",
            "mark": "11/12"
        };

        //homework info
        $("#hw_title").text(data.title);
        $("#hw_task").text(data.content);
        for (let i = 0; i < 3; i++) {
            $("#hw_links").append("<a class='italic' href='" + data.link + "'>" + data.link + " </a><br>");
        }
        $("#hw_notes").text(data.notes);

        //answer status
        $("#submit_mark_button").hide();
        if (data2.answer == "") {
            $("#answer_status").text("Нічого не здано");
            $("#answer_status").removeClass("table-success");


            $("#submit_answer_button").show().attr("onclick","submitAnswer("+data2.id+")");
            $("#edit_answer_button").hide();
            $("#answer_container").empty().append(" <textarea id='answer_area' class='text-break form-control' rows='6'>" +
                +"</textarea>");
            $("#answer_link_container").empty().append("<input type='text' class='form-control' id='answer_link_input'>");

        }
        else {
            $("#answer_status").text("Здано на оцінення");
            $("#answer_status").addClass("table-success");

            $("#submit_answer_button").hide();

            $("#edit_answer_button").show().attr("onclick","editAnswer("+data2.id+")");
            $("#answer_container").empty().text(data2.answer);
            $("#answer_link_container").empty().append(" <a id='answer_link' href='"+data2.hyperlink+"'>"+data2.hyperlink+"</a>")
        }

        if (data2.mark == "") {
            $("#answer_mark").text("Не оцінено");
        } else {
            $("#answer_mark").text(data2.mark);

        }

        $("#answer_comment").text(data2.comment);
        $("#answer_deadline").text(data.deadline);
        if(data.time_left==""){
            $("#submit_answer_button").attr("disabled","disabled");
            $("#edit_answer_button").attr("disabled","disabled");
            $("#answer_timeleft").addClass("table-danger").text("Час вичерпано");
        }else{
            $("#submit_answer_button").attr("disabled","");
            $("#edit_answer_button").attr("disabled","");
            $("#answer_timeleft").removeClass("table-danger").text(data.time_left);
        }

        $.ajax({
            url: 'http://localhost:2303/', //TODO @natasha
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json',
            success: function (data) {


            },
            error: function (data) {
                // alert(data.error);
            },
            data: JSON.stringify({
                id: id
            })
        });


    }

}



function submitAnswer(id){
    alert(id);
    let data = {
        "id": "3",
        "answer": $("#answer_area").val(),
        "hyperlink": $("#answer_link_input").val(),
        "comment": "looks good",
        "mark": "11/12"
    };


    $("#answer_container").empty().text(data.answer);
    $("#answer_link_container").empty().append(" <a id='answer_link' href='"+data.hyperlink+"'>"+data.hyperlink+"</a>");
    $("#submit_answer_button").hide();
    $("#edit_answer_button").show().attr("onclick","submitAnswer("+data.id+")");


    $.ajax({
        url: 'http://localhost:2303/gethometask', //TODO @natasha
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {


        },
        error: function (data) {
            // alert(data.error);
        },
        data: JSON.stringify(data)
    });


}

function editAnswer(id){
    let data = {
        "id": "3",
        "answer": "aoaoaoaoaooao oa oa oao oaooao o aoo oooaoaoaooao",
        "hyperlink": "www.distedu.ukma.edu.ua",
        "comment": "looks good",
        "mark": "11/12"
    };

    $("#answer_container").empty().append("<textarea id='answer_area' class='text-break form-control' rows='6'>" +
       data.answer +"</textarea>");
    $("#answer_link_container").empty().append("<input type='text' class='form-control' id='answer_link_input' value='"+data.hyperlink+"'> ");

    $("#submit_answer_button").show().attr("onclick","submitAnswer("+data.id+")");
    $("#edit_answer_button").hide();


    $.ajax({
        url: 'http://localhost:2303/', //TODO @natasha
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {


        },
        error: function (data) {
            // alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}