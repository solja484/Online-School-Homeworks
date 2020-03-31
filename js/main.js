// user-types = ["admin", "teacher", "pupil"];
localStorage.setItem("usertype", "pupil");

//hide all and show login page
exit();


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


function showPage(except) {
    $("#admin_page").hide();
    $("#admin_tables").hide();

    $("#teacher_page").hide();
    $("#teacher_list_page").hide();

    $("#pupil_page").hide();
    $("#subject_list_page").hide();

    $("#subject_page").hide();
    $("#hometask_page").hide();

    $("#" + except).show();
}

function show_subject() {
    showPage('subject_list_page');
    $("#subject_list_page").hide();
    $("#subject_page").show();
}


function exit() {
    change_entry_type(2);
    localStorage.removeItem("authentication");

    //hide all menu buttons
    $("#admin_page_tab").hide();
    $("#teacher_page_tab").hide();
    $("#teacher_list_page_tab").hide();
    $("#pupil_page_tab").hide();
    $("#subject_list_page_tab").hide();
    $("#admin_tables_tab").hide();

    //hide all pages
    $("#admin_page").hide();
    $("#teacher_page").hide();
    $("#teacher_list_page").hide();
    $("#pupil_page").hide();
    $("#subject_list_page").hide();
    $("#subject_page").hide();
    $("#hometask_page").hide();
    $("#admin_tables").hide();

    $("#registrypanel").hide();
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



function showTeacher(id){

    $("#teacher_page_tab").show();
    $("#teacher_list_page_tab").show();
    $("#teacher_list_page").show();
    $("#container").show();
    fillTeacherInfo(id);
}




function showPupil(id){
    $("#container").show();

    $("#pupil_page").show();$("#pupil_page_tab").show();
    $("#subject_list_page_tab").show();
    fillPupilInfo(id);
}

function  showAdmin(id){
    setCitiesValueOption();

    $("#admin_page_tab").show();
    $("#admin_tables_tab").show();
    $("#admin_tables").show();
    $("#container").show();
    fillAdminInfo(id);
}