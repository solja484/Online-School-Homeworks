function addNewCity() {
    if (!validName("new_added_city")) {
        return false;
    }
    let data = {"city": $("#new_added_city").val()};
    const notes = $("#new_added_city_notes").val();
    if (notes !== "")
        data['notes'] = notes;
    $.ajax({
        url: 'http://localhost:2303/addcity',
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
            console.log(data.error);
        },
        data: JSON.stringify(data)
    });
}

function register() {
    console.log("here");
    var passSel = $('#reg_password');
    var pass2Sel = $('#reg_password2');
    let pass = passSel.val();
    let pass2 = pass2Sel.val();
    if (checkValidity()) {
        console.log("here");
        if (pass2 !== pass) {
            pass2Sel.removeClass('is-valid');
            pass2Sel.addClass('is-invalid');
            setClear(["#reg_password2", "#reg_password"]);
            console.log("pass incorect");
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
        console.log(data);
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
        url: 'http://localhost:2303/getcities',
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

function setNamesAndStages() {
    const nameListSel = $("#new_competition_names");
    nameListSel.empty();
    const stageListSel = $("#new_competition_stages");
    stageListSel.empty();
    $.ajax({
        url: 'http://localhost:2303/getCompetitionNamesAndStages',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            data.names.forEach(name => nameListSel.append("<option value='" + name.id + "'>" + name.name + "</option>"));
            data.stages.forEach(name => stageListSel.append("<option value='" + name.id + "'>" + name.name + "</option>"));
        }
    });
}

function addNewCompetition() {

    const data = {
        "stage_id": $("#new_competition_stages").val(),
        "name_id": $("#new_competition_names").val(),
        "notes": $("#new_competition_notes").val(),
        "date": $("#new_competition_date").val(),
        "place": $("#new_competition_place").val()
    };
    $.ajax({
        url: 'http://localhost:2303/addcompetition',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data2) {
            $("#content").prepend("<div class='alert alert-success alert-dismissible'>" +
                "<button type='button' class='close' data-dismiss='alert'>&times;</button>" +
                " <strong>Вітаємо!</strong> Конкурс додано </div>");
            setClear(["#new_competition_place", "#new_competition_date", "#new_competition_notes"]);
            $("#add_competition_modal").modal('hide');
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify(data)
    });
}

function loadAllCompetitionToAddOlimpiad() {
    const selector = $("#new_olympiad_competition");
    selector.empty();
    $.ajax({
        url: 'http://localhost:2303/getallcompetitions',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            data.forEach(compete => selector.append("<option value='" + compete.id + "'><b>" + compete.name +
                "</b> - " + compete.stage + " - <span style='color: gray'>" + compete.date + "</span></option>"));
            selector.append("<option value='0'>Інше...</option>")
        }
    });
}

function setSchoolsTable() {
    $.ajax({
        url: 'http://localhost:2303/getallschools',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            if (data.length < 1) {
                $("#schools_table").hide();
                $("#no_schools_par").show();
            } else {
                $("#schools_table").show();
                $("#no_schools_par").hide();

                const table = $("#table_schools_admin_body");
                table.empty();
                data.forEach(school => table.append("<tr id='row" + school.code + "' class='tableelements'>" +
                    "<th scope='row'>" + school.code + "</th><td>" + school.name + "</td><td>" + school.address + "</td>" +
                    "<td>" + school.phone + "</td><td><button id='edit_school" + school.code + "' type='button' " +
                    "class='btn btn-sm border-none btn-outline-info bg-hover-blue' data-toggle='modal' " +
                    "data-target='#edit_school_modal' onclick='setSchoolCode(" + JSON.stringify(school) + ")'>️edit</button>" +
                    "<button class='btn btn-sm btn-outline-danger border-none bg-hover-red' " +
                    "onclick=deleteSchool('" + school.code + "')>delete</button></td>" +
                    "</tr>"));
            }
        }
    });
}


function setAllSubjectPupils(sub_data) {
    $("#all_pupils_modal_titile").text(sub_data.title + " вивчають:");
    const selector = $("#all_pupil_modal_body");
    $.ajax({
        url: 'http://localhost:2303/getallsubjectpupils',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            selector.empty();
            data.forEach(pupil => selector.append("<a class='list-group-item mg-0 list-group-item-action list-group-item-light' aria-controls='pupil_page' data-toggle='pill' " +
                "role='tab' onclick='showPupilProfile(" + JSON.stringify(pupil) + ")'>" +
                "<span>" + pupil.name + "</span></a>"));
            // $("#show_all_pupils_modal").modal('toggle');

            sessionStorage.setItem("lastpage", "subject_page");
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "id": sub_data.id
        })
    });
}

function setAllOlimpiadPupils(ol_data) {
    console.log(ol_data);
    $("#all_pupils_modal_titile").text(ol_data.title + " вивчають:");
    const selector = $("#all_pupil_modal_body");
    $.ajax({
        url: 'http://localhost:2303/getallolimpiapupils',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            selector.empty();
            data.forEach(pupil => selector.append("<a class='list-group-item mg-0 list-group-item-action list-group-item-light' aria-controls='pupil_page' data-toggle='pill' " +
                "role='tab' onclick='showPupilProfile(" + JSON.stringify(pupil) + ")'>" +
                "<span >" + pupil.name + "</span></a>"));
            $("#show_all_pupils_modal").modal('toggle');
            sessionStorage.setItem("lastpage", "olympiad_tasks_page");

        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "id": ol_data.id
        })
    });
}

function showTeacherProfileOlimpiad(olimp_id) {
    $.ajax({
        url: 'http://localhost:2303/getolimpTeacherInfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#teacher_school_link").text(data.schoolname);
            $("#teacher_pib").text(data.name + ' ' + data.surname + ' ' + data.patronymic);
            $("#teacher_email").text(data.email);
            if (data.phone === "")
                $("#teacher_phone").text("Не вказано");
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
            $("#teacher_teachercode").text(data.id);
            sessionStorage.setItem("schoolcode", data.schoolid);
            showPage('teacher_page');
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "id": olimp_id
        })
    });
}


function showTeacherProfileSub(sub_id) {
    $.ajax({
        url: 'http://localhost:2303/getsubjectTeacherInfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $("#teacher_school_link").text(data.schoolname);
            $("#teacher_pib").text(data.name + ' ' + data.surname + ' ' + data.patronymic);
            $("#teacher_email").text(data.email);
            if (data.phone === "")
                $("#teacher_phone").text("Не вказано");
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
            $("#teacher_teachercode").text(data.id);
            sessionStorage.setItem("schoolcode", data.schoolid);
            showPage('teacher_page');
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "id": sub_id
        })
    });
}

function addPupilOlympiad() {
    const strSel = $("#olympiad_search_input");
    const code = strSel.val();
    const userid = localStorage.getItem('authentication');
    if (!validCode2("olympiad_search_input")) return false;
    $.ajax({
        url: 'http://localhost:2303/addpupilolimpiad',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data2) {
            strSel.val("");
            fillPupilOlympiads(userid);
        },
        error: function (data2) {
            strSel.addClass('is-invalid');
            console.log(data2.error);
        },
        data: JSON.stringify({
            "student_id": userid,
            "olimpiad_id": code
        })
    });
}

function addPupilSubject() {
    let strSel = $("#subject_search_input");
    const code = strSel.val();
    const userid = localStorage.getItem('authentication');
    if (!validCode2("subject_search_input")) return false;
    $.ajax({
        url: 'http://localhost:2303/addpupisubject',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data2) {
            strSel.val("");
            fillPupilSubjectsWithoutOlimp(userid);
        },
        error: function (data2) {
            strSel.addClass('is-invalid');
            console.log(data2.error);
        },
        data: JSON.stringify({
            "student_id": userid,
            "sub_id": code
        })
    });
}

function findNotin() {
    if (!validName("notin_surname")) {
        return false;
    }
    const surname = $("#notin_surname").val();
    $.ajax({
        url: 'http://localhost:2303/getpupilslearnallteachsubjects',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (datas) {
            console.log(datas);
            const selector = $("#notin_table_body");
            selector.empty();
            if (datas.length < 1) {
                $("#no_notin_table").show();
                $("#notin_table").hide();
            } else {
                $("#no_notin_table").hide();
                $("#notin_table").show();
                console.log("here");
                datas.forEach(data => selector.append("<tr><td>" + data.id + "</td><td>" + data.name + "</td>" +
                    "<td>" + data.class + "</td><td>" + data.email + "</td><td>" + data.school_id + "</td></tr>"));
            }
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "surname": surname
        })
    });
}