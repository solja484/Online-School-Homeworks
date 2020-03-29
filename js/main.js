// user-types = ["admin", "teacher", "pupil"];
localStorage.setItem("usertype", "pupil");


//$("#container").hide();
//$("#entrypanel").show();
 $("#entrypanel").hide();
 $("#registrypanel").hide();
// $("#admin_page").hide();
// $("#admin_page_tab").hide();
// $("#subject_page").hide();
 $("#container").show();
// shoW('subject_list_page');

function change_entry_type(t) {
    if (t === 0) {
        $('#entryform').css("background", "#fd7172");
        localStorage.setItem("usertype", "admin");
    } else if (t === 1) {
        $('#entryform').css("background", "#fee96a");
        localStorage.setItem("usertype", "teacher");
    } else if (t === 2) {
        $('#entryform').css("background", "#7cdeeb");
        localStorage.setItem("usertype", "pupil");
    }
}

function change_reg_type(t) {
    if (t === 1) {
        $('#registryform').css("background", "#fee96a");
        localStorage.setItem("usertype", "teacher");
        $('#pupil_form').hide();
        $('#teacher_form').show();
    } else {
        $('#registryform').css("background", "#7cdeeb");
        localStorage.setItem("usertype", "pupil");
        $('#pupil_form').show();
        $('#teacher_form').hide();
    }
}


function shoW(except) {
    $("#admin_page").hide();
    $("#cabinet_page").hide();
    $("#subject_list_page").hide();
    $("#subject_page").hide();
    $("#teacher_page").hide();
    $("#" + except).show();
}

function show_subject() {
    shoW('subject_list_page');
    $("#subject_list_page").hide();
    $("#subject_page").show();
}


function exit() {
    localStorage.setItem("usertype", "pupil");
    localStorage.removeItem("authentication");
    $("#container").hide();
    $("#entrypanel").show();
}
function setClear(arr) {
    for(var i=0; i<arr.length; i++){
        $(arr[i]).val("");
    }

}

function gotoregistration() {
    $("#registrypanel").show();
    $("#entrypanel").hide();
    $("#container").hide();
}

function gotologin() {
    $("#registrypanel").hide();
    $("#entrypanel").show();
    $("#container").hide();
}

function checkValidity() {
    if (!validName("reg_lastname") || !validName("reg_firstname") || !validFName("reg_fathername") ||
        !validEmail("reg_email") || !validPass("reg_password") || !validCode("reg_code") || !validPhone("reg_phone")) {
        return false
    }
    var cur_user_type = localStorage.getItem("usertype");
    if (cur_user_type === 'teacher') {
        if (!validDocument("reg_teacher_code") || !validEmpty("reg_education")) {
            return false;
        }
    } else if (cur_user_type === 'pupil') {
        if (!validClass("reg_class") || !validDocument("reg_student_code") || !validEmpty("reg_birth_date")) {
            return false;
        }
    }
    return true;
}
