// user-types = ["admin", "teacher", "pupil"];
$(document).ready(function () {
    const usertype = localStorage.getItem("usertype");
    if (usertype === undefined) {
        exit();
        localStorage.setItem("usertype", "pupil");
        return;
    }
    const userid = localStorage.getItem('authentication');
    console.log(userid);

    $("#entrypanel").hide();
    $("#registrypanel").hide();
    if (usertype === 'teacher') showTeacher(userid);
    else if (usertype === 'pupil') showPupil(userid);
    else showAdmin(userid);
});

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
    $("#teacher_olympiads_page").hide();
    $("#olympiads_page").hide();
    $("#olympiad_tasks_page").hide();
    $("#task_page").hide();
    $("#" + except).show();
    if (except === 'school_page')
        fillSchoolInfo();
}


function exit() {
    document.cookie = "userid=null; max-age=0";
    document.cookie = "usertype=null; max-age=0";
    change_entry_type(2);
    localStorage.removeItem("authentication");
    sessionStorage.removeItem("schoolcode");

    hideTabs();

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
    $("#teacher_olympiads_page").hide();
    $("#olympiads_page").hide();
    $("#olympiad_tasks_page").hide();
    $("#task_page").hide();
    $("#registrypanel").hide();
    //$("#container").hide();
    $("#entrypanel").show();
}

function hideTabs() {
    //hide all menu buttons
    $("#admin_page_tab").hide();
    $("#teacher_page_tab").hide();
    $("#teacher_list_page_tab").hide();
    $("#pupil_page_tab").hide();
    $("#subject_list_page_tab").hide();
    $("#admin_tables_tab").hide();
    $("#olympiads_tab").hide();
    $("#teacher_olympiads_tab").hide();
}

function setClear(arr) {
    for (var i = 0; i < arr.length; i++) {
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


function showTeacher(id) {

    hideTabs();
    showPage("teacher_list_page");
    $("#teacher_page_tab").show();
    $("#teacher_list_page_tab").show();
    $("#teacher_olympiads_tab").show();
    fillTeacherInfo(id);
}

function showPupil(id) {
    hideTabs();
    $("#subject_list_page_tab").show();
    $("#pupil_page_tab").show();
    $("#olympiads_tab").show();
    showPage("subject_list_page");

    fillPupilInfo(id);
}

function showAdmin(id) {
    hideTabs();
    $("#admin_page_tab").show();
    $("#admin_tables_tab").show();
    showPage("admin_tables");

    fillAdminInfo(id);
}


function show_subject(subject_data) {
    showPage('subject_page');
    if (localStorage.getItem("usertype") === "teacher")
        fillTeacherHometasks(subject_data);
    else if (localStorage.getItem("usertype") === "pupil")
        fillPupilHometasks(subject_data);
}


function show_olympiad(ol_data) {
    showPage('olympiad_tasks_page');
    if (localStorage.getItem("usertype") === "teacher")
        fillTeacherOlympiadTasks(ol_data);
    else if (localStorage.getItem("usertype") === "pupil")
        fillPupilOlympiadTasks(ol_data);
}

function fillCompetition(ol_data) {
    $("#competition_title").text(ol_data.name);
    $("#competition_stage").text(ol_data.stage);

    $("#competition_date").text(ol_data.ev_date);
    $("#competition_place").text(ol_data.place);
    $("#competition_time").text(ol_data.remain_time);
}

function fillSources(datas) {
    if (datas.length < 1) return false;
    const sources = $("#additional_sources_block");
    sources.empty();
    let str = "";
    datas.forEach(data => {
        str += "<div class='card mg-10'><p class='card-header'>" + data.caption + "</p><div class='pd-7'><p class='text-14'>" + data.content + "</p>" +
            "<p class='text-muted text-13'>" + data.notes + "</p>";

        if (data.links.length > 0)
            for (let j of data.links)
                str += "<a class='text-a text-13' href='" + j + "'>" + j + "</a>";
        str += "</div></div>";
        sources.append(str);
        str = "";
    });
}

function addTaskDelButton(ol_id) {
    $("#delete_task_button").attr('onclick', 'deleteOlympiadTask(' + ol_id + ')');
}

function fillOlympiadFields(ol_data) {
    $("#ol_title").text(ol_data.title);
    $("#ol_discipline").text(ol_data.discipline + " " + ol_data.class_num + " клас");

    sessionStorage.setItem("olympiad", ol_data.id);

    $("#edit_olympiad_name").attr("value", ol_data.title);
    $("#edit_olympiad_discipline").attr("value", ol_data.discipline);
    $("#edit_olympiad_class").attr("value", ol_data.class_num);
    $("#edit_olympiad_notes").text(ol_data.notes);
    $("#edit_olympiad_button").attr("onclick", "editOlympiad(" + ol_data.id + ")");
}


function showHometask(hw_id) {
    showPage("hometask_page");
    fillHometask(hw_id);
}

function showOlympiadTask(task_id) {
    showPage("task_page");
    fillOlympiadTask(task_id);
}

function addHyperlinkField(id) {

    $("#add_hyperlink_field_button").remove();
    const hwSel = $("#add_hw_links");
    hwSel.append(" <input type='text' id='new_hw_link" + id +
        "' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='add_hyperlink_field_del" + id + "' onclick='deleteAddHyperlinkField(" + id + ")'>❌</button>");
    hwSel.append("<button id='add_hyperlink_field_button' class='btn btn-dark float-left' onclick='addHyperlinkField("
        + (id + 1) + ")'> + </button>");
}

function deleteAddHyperlinkField(id) {
    $("#new_hw_link" + id).remove();
    $("#add_hyperlink_field_del" + id).remove();
}

function editHyperlinkField(id) {
    $("#edit_hyperlink_field_button").remove();
    const hwSel = $("#edit_hw_links");
    hwSel.append(" <input type='text' id='edit_hw_link" + id +
        "' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='edit_hyperlink_field_del" + id + "' onclick='deleteEditHyperlinkField(" + id + ")'>❌</button>");
    hwSel.append("<button id='edit_hyperlink_field_button' class='btn btn-dark float-left' onclick='editHyperlinkField("
        + (id + 1) + ")'> + </button>");
}

function deleteEditHyperlinkField(id) {
    $("#edit_hw_link" + id).remove();
    $("#edit_hyperlink_field_del" + id).remove();

}

function addTaskHyperlinkField(id) {
    $("#add_task_hyperlink_field_button").remove();
    const taskSel = $("#add_task_links");
    taskSel.append(" <input type='text' id='new_task_link" + id +
        "' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='add_task_hyperlink_field_del" + id + "' onclick='deleteAddTaskHyperlinkField(" + id + ")'>❌</button>");
    taskSel.append("<button id='add_task_hyperlink_field_button' class='btn btn-dark float-left' onclick='addTaskHyperlinkField("
        + (id + 1) + ")'> + </button>");
}

function deleteAddTaskHyperlinkField(id) {
    $("#new_task_link" + id).remove();
    $("#add_task_hyperlink_field_del" + id).remove();
}

function editTaskHyperlinkField(id) {
    $("#edit_task_hyperlink_field_button").remove();
    const taskSel = $("#edit_task_links");
    taskSel.append(" <input type='text' id='edit_task_link" + id +
        "' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='edit_task_hyperlink_field_del" + id + "' onclick='deleteEditTaskHyperlinkField(" + id + ")'>❌</button>");
    taskSel.append("<button id='edit_task_hyperlink_field_button' class='btn btn-dark float-left' onclick='editTaskHyperlinkField("
        + (id + 1) + ")'> + </button>");
}

function deleteEditTaskHyperlinkField(id) {
    $("#edit_task_link" + id).remove();
    $("#edit_task_hyperlink_field_del" + id).remove();
}
