function fillTeacherInfo(id) {
//# Повертає: name 0, surname 1 , patronymic 2, email 3,  phone 4, education 5, phd 6, schoolid 7, notes 8, teacherid 9
    let data = ["Наталія", "Шкаровська", "Сергіївна", "teacher@gmail.com", "+3809456786",
        "НаУКМА", true, "0000000000", "notes", "12345678"];

    $("#teacher_pib").text(data[1] + ' ' + data[0] + ' ' + data[2]);

    $("#teacher_email").text(data[3]);
    if (data[4] == "")
        $("#teacher_phone").text("не вказано");
    else
        $("#teacher_phone").text(data[4]);
    $("#teacher_education").text(data[5]);
    if (data[6])
        $("#teacher_phd").show();
    else
        $("#teacher_phd").hide();
    $("#teacher_schoolcode").text(data[7]);
    $("#teacher_notes").text(data[8]);

    $("#teacher_teachercode").text(id);//(data[9]);

    $("#edit_teacher_modal_button").attr('onclick','editTeacherFill('+id+')');//.click(editTeacherFill(id));

    $.ajax({
        url: 'http://localhost:2303/getCities',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {

        }
    });


}

function editTeacherFill(id){
    let data = ["Наталія", "Шкаровська", "Сергіївна", "teacher@gmail.com", "+3809456786",
        "НаУКМА", true, "0000000000", "notes", "12345678"];
    $("#new_teacher_name").attr("value",data[0]);
    $("#new_teacher_surname").attr("value",data[1]);
    $("#new_teacher_fathername").attr("value",data[2]);
    $("#new_teacher_email").attr("value",data[3]);
    $("#new_teacher_phone").attr("value",data[4]);
    $("#new_teacher_education").attr("value",data[5]);
    if(data[6])
        $("#new_teacher_phd").attr("checked", "checked");
    $("#new_teacher_notes").text(data[8]);
    $("#edit_teacher_button").attr('onclick','editTeacher('+id+')');

    //TODO ajax get teacherinfo

}

function editTeacher(id){

    if(validName("new_teacher_name")&&
        validName("new_teacher_surname")&&
        validFName("new_teacher_fathername")&&
        validEmail("new_teacher_email")&&
        validPhone("new_teacher_phone")&&
        validEmpty("new_teacher_education")) {

        let data = {
            "id":id,
            "name": $("#new_teacher_name").val(),
            "surname": $("#new_teacher_surname").val(),
            "patronymic": $("#new_teacher_fathername").val(),
            "email": $("#new_teacher_email").val(),
            "phone": $("#new_teacher_phone").val(),
            "education": $("#new_teacher_education").val(),
            "phd": $("#new_teacher_phd"),
            "notes": $("#new_teacher_notes").val()
        };

        $.ajax({
            url: 'http://localhost:2303/', //TODO ajax post edited teacher info
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {

                setClear(["#new_teacher_name", "#new_teacher_surname", "#new_teacher_fathername", "#new_teacher_email",
                    "#new_teacher_phone", "#new_teacher_education", "#new_teacher_notes"]);
            },
            data: JSON.stringify(data)

        });
        $("#edit_teacher_modal").modal('hide');
    }
}

///login, email, password, notes, name, surname
function  fillAdminInfo(id){
    let data=["nata","natahiko@gmail.com","","notes","Наталія","Шкаровська"];
    $("#admin_login").text(data[0]);
    $("#admin_email").text(data[1]);
    $("#admin_notes").text(data[3]);
    $("#admin_pib").text(data[4]+" "+data[5]);

    $("#edit_admin_modal_button").attr('onclick','editAdminFill('+id+')');

    $.ajax({
        url: 'http://localhost:2303/getadmininfo',//TODO
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {

        }
    });
}

function editAdminFill(id){
    let data=["nata","natahiko@gmail.com","","notes","Наталія","Шкаровська"];
    $("#admin_login").attr("value",data[0]);
    $("#admin_email").attr("value",data[1]);
    $("#admin_notes").text(data[3]);
    $("#admin_name").attr("value",data[4]);
    $("#admin_surname").attr("value",data[5]);
    $("#edit_admin_button").attr('onclick','editAdmin('+id+')');

    $.ajax({
        url: 'http://localhost:2303/getadmininfo',//TODO
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {

        }
    });
}


function editAdmin(id){

    if(validName("new_admin_name")&&
        validName("new_admin_surname")&&
        validEmail("new_admin_email")) {

        let data = {
            "id":id,
            "name": $("#new_admin_name").val(),
            "surname": $("#new_admin_surname").val(),
            "email": $("#new_admin_email").val(),
            "notes": $("#new_admin_notes").val()
        };

        $.ajax({
            url: 'http://localhost:2303/', //TODO ajax post edited admin info
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {

                setClear(["#new_admin_name", "#new_admin_surname", "#new_admin_login", "#new_admin_email", "#new_admin_notes"]);
            },
            data: JSON.stringify(data)

        });
        $("#edit_admin_modal").modal('hide');
    }
}