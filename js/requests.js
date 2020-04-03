function addNewCity() {
    if (!validName("new_added_city")) {
        return false;
    }
    let data = {"city": $("#new_added_city").val()};
    const notes = $("#new_added_city_notes").val();
    if (notes !== "")
        data['notes'] = notes;
    $.ajax({
        url: 'http://localhost:2303/addCity',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#content").prepend("<div class='alert alert-success alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>Вітаємо</strong> Місто <u>" + city + "</u>додано!" +
                "</div>");
            setClear(["#new_added_city"]);
            $("#add_city_modal").modal('hide');
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify(data)
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
            setClear(["#reg_password2", "#reg_password"]);
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

                exit();
                setClear(["#reg_password2", "#reg_password", "#reg_firstname", "#reg_lastname", "#reg_fathername",
                    "#reg_email", "#reg_phone", "#reg_code", "#reg_education", "#reg_phd", "#reg_teacher_code",
                    "#reg_birth_date", "#reg_student_code", "#reg_class"]);
            },
            data: JSON.stringify(data)
        });
        gotologin();
    } else {
        setClear(["#reg_password2", "#reg_password"]);
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
        accept: "application/json",
        success: function (data) {
            localStorage.setItem('authentication', data.id);
            $("#entrypanel").hide();
            $("#registrypanel").hide();

            if (cur_user_type === 'teacher') showTeacher(data.id);
            if (cur_user_type === 'pupil') showPupil(data.id);
            if (cur_user_type === 'admin') showAdmin(data.id);

            setClear(["#entry_email", "#entry_password"]);
        },
        error: function () {
            alert("Переконайтесь в правильності введених даних");
            setClear(["#entry_password"]);
        },
        data: JSON.stringify(data)
    });
}

function setCitiesValueOption(selectorID) {
    $.ajax({
        url: 'http://localhost:2303/getCities',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var sel = $(selectorID);
            for (var i = 0; i < data.length; i++) {
                sel.append("<option value='" + data[i][0] + "'>" + data[i][1] + "</option>");
            }
            console.log(data);
        }
    });
}


function addHomework() {
    let id = sessionStorage.getItem("subject");
    /*TODO sql = "INSERT INTO hometasks (title, content, deadline, notes, subject_id) " \
                  "VALUES ('%s','%s', '%s', '%s','%s');" % (json['title'], json['content'],
                      json['deadline'], json['notes'],
                      json['subject_id'])*/
    let data = {
        "title": $("#new_hw_title").val(),
        "content": $("#new_hw_content").val(),
        "deadline": $("#new_hw_deadline").val(),
        "notes": $("#new_hw_notes").val(),
        "subject_id": id
    };
    $("#add_hometask_modal").modal('hide');

    //TODO можливо можна якось получити ід створеної домашки, інакше ніяк( @natasha
    //showHometask(hw_id);
    $.ajax({
        url: 'http://localhost:2303/addhometask',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {


        },
        error: function (data2) {
            alert(data2.error);
        },
        data: JSON.stringify(data)
    });
}


function deleteHometask(hw_id) {

    $("#blockhw" + hw_id).remove();
    $("#delete_hw_modal").modal('hide');
    $.ajax({
        url: 'http://localhost:2303/deletehometask', //TODO @natasha
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

function deleteSubject() {
    let id = sessionStorage.getItem("subject");
    $("#sj" + id).remove();
    $("#delete_sj_modal").modal('hide');

    showPage("teacher_list_page");


    $.ajax({
        url: 'http://localhost:2303/deletesubject', //TODO @natasha
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


function searchOlympiad() {
    let str = $("#olympiad_search_input").val();
    if (str !== "") {
    }
    //TODO search olympiad ajax
}

function searchSubject() {
    let str = $("#subject_search_input").val();
    if (str !== "") {
    }
    //TODO search subject ajax
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



function submitAnswer(id) {
    let data = {
        "id": "3",
        "answer": $("#answer_area").val(),
        "hyperlink": $("#answer_link_input").val(),
        "comment": "looks good",
        "mark": "11/12"
    };


    $("#answer_container").empty().text(data.answer);
    $("#answer_link_container").empty().append(" <a id='answer_link' href='" + data.hyperlink + "'>" + data.hyperlink + "</a>");
    $("#submit_answer_button").hide();
    $("#edit_answer_button").show().attr("onclick", "submitAnswer(" + data.id + ")");


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

function editAnswer(id) {
    let data = {
        "id": "3",
        "answer": "aoaoaoaoaooao oa oa oao oaooao o aoo oooaoaoaooao",
        "hyperlink": "www.distedu.ukma.edu.ua",
        "comment": "looks good",
        "mark": "11/12"
    };

    $("#answer_container").empty().append("<textarea id='answer_area' class='text-break form-control' rows='6'>" +
        data.answer + "</textarea>");
    $("#answer_link_container").empty().append("<input type='text' class='form-control' id='answer_link_input' value='" + data.hyperlink + "'> ");

    $("#submit_answer_button").show().attr("onclick", "submitAnswer(" + data.id + ")");
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
            alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}