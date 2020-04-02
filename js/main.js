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
    $("#school_page").hide();

    $("#teacher_olympiads_list").hide();
    $("#olympiads_list").hide();

    $("#" + except).show();
}


function exit() {
    change_entry_type(2);
    localStorage.removeItem("authentication");
    sessionStorage.removeItem("schoolcode");

    //hide all menu buttons
    $("#admin_page_tab").hide();
    $("#teacher_page_tab").hide();
    $("#teacher_list_page_tab").hide();
    $("#pupil_page_tab").hide();
    $("#subject_list_page_tab").hide();
    $("#admin_tables_tab").hide();
    $("#olympiads_tab").hide();
    $("#teacher_olympiads_tab").hide();

    //hide all pages
    $("#admin_page").hide();
    $("#teacher_page").hide();
    $("#teacher_list_page").hide();
    $("#pupil_page").hide();
    $("#subject_list_page").hide();
    $("#subject_page").hide();
    $("#hometask_page").hide();
    $("#admin_tables").hide();
    $("#school_page").hide();
    $("#teacher_olympiads_list").hide();
    $("#olympiads_list").hide();

    $("#registrypanel").hide();
    //$("#container").hide();
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
    fillTeacherInfo(id);
    fillTeacherSubjects(id);
    $("#teacher_page_tab").show();
    $("#teacher_list_page_tab").show();
    $("#teacher_list_page").show();


    $("#teacher_olympiads_tab").show();
    $("#container").show();

}




function showPupil(id){
    fillPupilInfo(id);
    fillPupilSubjects(id);
    $("#container").show();
    $("#subject_list_page").show();
    $("#pupil_page_tab").show();
    $("#olympiads_tab").show();
    $("#subject_list_page_tab").show();

}

function  showAdmin(id){
    fillAdminInfo(id);
    $("#admin_page_tab").show();
    $("#admin_tables_tab").show();
    $("#admin_tables").show();
    $("#container").show();

}


function show_subject(subject_data) {
    showPage('subject_page');
    if(localStorage.getItem("usertype")==="teacher")
        fillTeacherHometasks(subject_data);
    else if (localStorage.getItem("usertype")==="pupil")
        fillPupilHometasks(subject_data);
}

function showHometask(hw_id){
    showPage("hometask_page");
    fillHometask(hw_id);

}

function addHyperlinkField(id){
    $("#add_hyperlink_field_button").remove();
    $("#add_hw_form_body").append(" <div class='col-md-12'>\n" +

        "                            <input type='text' id='new_hw_link"+id+"' class='form-control' max='255'>\n" +
        "                        </div>");
    $("#add_hw_form_body").append(" <div class='col-md-2'>\n" +
        "                            <button id='add_hyperlink_field_button' class='btn btn-light btn-sm'\n" +
        "                                    onclick='addHyperlinkField("+(id+1)+")'>+\n" +
        "                            </button>\n" +
        "                        </div>");

}