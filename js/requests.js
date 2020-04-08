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
            removeValid("add_city_form");
            clearForm("add_city_form");
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
            else if (cur_user_type === 'pupil') showPupil(data.id);
            else showAdmin(data.id);

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

function submitAnswer(data) {
    alert("im here");

    data.text = $("#answer_area").val();
    data.hyperlink = $("#answer_link_input").val();


    $("#answer_container").empty().text(data.text);
    $("#answer_link_container").empty().append(" <a id='answer_link' href='" + data.hyperlink + "'>" + data.hyperlink + "</a>");
    $("#submit_answer_button").hide().attr("onclick", "submitAnswer(" + JSON.stringify(data) + ")");
    $("#edit_answer_button").show().attr("onclick", "editAnswer(" + JSON.stringify(data) + ")");


    //TODO submit new answer to database


}

function editAnswer(data) {


    $("#answer_container").empty().append("<textarea id='answer_area' class='text-break form-control' rows='6'>" +
        data.text + "</textarea>");
    $("#answer_link_container").empty().append("<input type='text' class='form-control' id='answer_link_input' value='" + data.hyperlink + "'> ");

    $("#submit_answer_button").attr("onclick", "submitAnswer(" + JSON.stringify(data) + ")").show();
    $("#edit_answer_button").attr("onclick", "editAnswer(" + JSON.stringify(data) + ")").hide();

}

function editMark(data) {
    $("#answer_mark_container").empty().append("<input type='number' id='answer_mark_input' class='form-control' value='" + data.mark + "'>");
    $("#answer_comment_container").empty().append("<textarea id='comment_area' class='text-break form-control' rows='3'>" +
        data.response + " </textarea>");


    $("#edit_mark_button").hide().attr("onclick", "editMark(" + JSON.stringify(data) + ")");
    $("#submit_mark_button").show().attr("onclick", "submitMark(" + JSON.stringify(data) + ")");
}

function submitMark(data) {
    //TODO submit new answer to db

    data.mark = $("#answer_mark_input").val();
    data.response = $("#comment_area").val();


    $("#answer_mark_container").empty().text(data.mark);
    $("#answer_comment_container").empty().text(data.response);

    $("#edit_mark_button").show().attr("onclick", "editMark(" + JSON.stringify(data) + ")");
    $("#submit_mark_button").hide().attr("onclick", "submitMark(" + JSON.stringify(data) + ")");
}