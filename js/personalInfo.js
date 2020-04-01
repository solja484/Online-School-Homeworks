function fillAdminInfo(id) {
    //Повертає: login, email, password, notes, name, surname
    $.ajax({
        url: 'http://localhost:2303/getadmininfo',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            fillAdminFields(data,id);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}


function fillAdminFields(data,id){
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
                 fillAdminFields(data,id);
                $("#edit_admin_modal").modal('hide');
            },
            error: function(data){
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
            sessionStorage.setItem("schoolcode",data.schoolid);
           fillPupilFields(data,id);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}

function fillPupilFields(data,id){
    $("#pupil_pib").text(data.surname +' '+data.name + ' ' + data.patronymic);
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
    $("#edit_pupil_button").attr('onclick','editPupil('+id+')');
}

function editPupil(id){
    if(validName("new_pupil_name")&& validName("new_pupil_surname")&&
        validFName("new_pupil_fathername")&& validEmail("new_pupil_email")&&
        validPhone("new_pupil_phone")&& validClass("new_pupil_class")) {

        let data = {
            "id":id,
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
            success: function (data) {
                fillPupilFields(data,id);
                //setClear(["#new_pupil_name", "#new_pupil_surname", "#new_pupil_fathername", "#new_pupil_email",
                 //"#new_pupil_phone", "#new_pupil_class", "#new_pupil_notes"]);
                $("#edit_pupil_modal").modal('hide');
            },
            error: function(data){
                alert(data.error);
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
            sessionStorage.setItem("schoolcode",data.schoolid);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            id: id
        })
    });
}

function fillTeacherFields(data,id){

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
            success: function (data) {
                //fillTeacherFields(data,id);
                // setClear(["#new_teacher_name", "#new_teacher_surname", "#new_teacher_fathername", "#new_teacher_email",
                    // "#new_teacher_phone", "#new_teacher_education", "#new_teacher_notes"]);
                fillTeacherInfo(id);
                $("#edit_teacher_modal").modal('hide');

            },
            error: function(data){
                alert(data.error);
            },
            data: JSON.stringify(data)
        });
    }
}