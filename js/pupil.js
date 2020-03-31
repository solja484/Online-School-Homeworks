function fillPupilInfo(id) {
//Повертає: name , surname, patronymic, email, phone, class, birthdate, schoolid, notes, schoolname
    let data = ["Соломія", "Андрусів", " Ігорівна", "solja484@gmail.com", "", "11", "26.06.2003", "0000000000", "примітки", "87654567"];
    $("#pupil_pib").text(data[1] + ' ' + data[0] + ' ' + data[2]);
    $("#pupil_email").text(data[3]);
    if (data[4] == "")
        $("#pupil_phone").text("не вказано");
    else
        $("#pupil_phone").text(data[4]);
    $("#pupil_class").text(data[5]);
    $("#pupil_bday").text(data[6]);

    $("#pupil_schoolcode").text(data[7]);
    $("#pupil_notes").text(data[8]);
    $("#pupil_pupilcode").text(id);//(data[9]);
    $("#edit_pupil_modal_button").attr('onclick','editPupilFill('+id+')');

    $.ajax({
        url: 'http://localhost:2303/getpupilinfo',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            alert(data);
        }
    });
}
function editPupilFill(id){
    let data = ["Соломія", "Андрусів", " Ігорівна", "solja484@gmail.com", "", "11",
        "26.06.2003", "0000000000", "примітки", "87654567"];

    $("#new_pupil_name").attr("value",data[0]);
    $("#new_pupil_surname").attr("value",data[1]);
    $("#new_pupil_fathername").attr("value",data[2]);
    $("#new_pupil_email").attr("value",data[3]);
    $("#new_pupil_phone").attr("value",data[4]);
    $("#new_pupil_class").attr("value",data[5]);
    $("#new_pupil_notes").text(data[8]);
    $("#edit_pupil_button").attr('onclick','editPupil('+id+')');

    //TODO ajax get teacherinfo

}


function editTeacher(id){

    if(validName("new_pupil_name")&&
        validName("new_pupil_surname")&&
        validFName("new_pupil_fathername")&&
        validEmail("new_pupil_email")&&
        validPhone("new_pupil_phone")&&
        validClass("new_pupil_class")) {

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
            url: 'http://localhost:2303/', //TODO ajax post edited teacher info
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {

                setClear(["#new_pupil_name", "#new_pupil_surname", "#new_pupil_fathername", "#new_pupil_email",
                    "#new_pupil_phone", "#new_pupil_class", "#new_pupil_notes"]);
            },
            data: JSON.stringify(data)

        });
        $("#edit_pupil_modal").modal('hide');
    }
}