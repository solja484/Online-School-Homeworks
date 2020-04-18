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
    if (usertype === 'teacher') {
        showTeacher(userid);
        $("#edit_teacher_modal_button").show();
    } else if (usertype === 'pupil') {
        $("#edit_teacher_modal_button").hide();
        showPupil(userid);
    } else if (usertype === 'admin') {
        $("#edit_teacher_modal_button").hide();
        showAdmin(userid);
    } else {
        exit();
        localStorage.setItem("usertype", "pupil");
    }
});

function change_entry_type(t) {
    if (t === 0) {
        $('#entryform').css("background", "#fd7172");
        localStorage.setItem("usertype", "admin");
        $("#edit_teacher_modal_button").hide();
    } else if (t === 1) {
        $('#entryform').css("background", "#fee96a");
        $("#edit_teacher_modal_button").show();
        localStorage.setItem("usertype", "teacher");
    } else if (t === 2) {
        $('#entryform').css("background", "#7cdeeb");
        $("#edit_teacher_modal_button").hide();
        localStorage.setItem("usertype", "pupil");
    }
}

function change_reg_type(t) {
    if (t === 1) {
        $('#registryform').css("background", "#fee96a");
        localStorage.setItem("usertype", "teacher");
        $('#pupil_form').hide();
        $('#teacher_form').show();
        removeValid("registryform");
        clearForm("registryform");
        $("#reg_button").attr("value", "Зареєструвати мене!");
    } else {
        $('#registryform').css("background", "#7cdeeb");
        localStorage.setItem("usertype", "pupil");
        $('#pupil_form').show();
        $('#teacher_form').hide();
        removeValid("registryform");
        clearForm("registryform");
        $("#reg_button").attr("value", "Зареєструвати мене!");
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
    change_entry_type(2);
    localStorage.removeItem("authentication");
    localStorage.removeItem("usertype");
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
    $("#breadcrumbs").empty();
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
    if (localStorage.getItem("usertype") === "teacher") {
        $("#subject_show_all_pupils_button").show();
        $("#subject_teacher_link").hide();
        $("#subject_delete_pupil_button").hide();
        $("#olimpiad_delete_pupil_button").hide();
        $("#subject_show_all_pupils_button").attr("onclick", "setAllSubjectPupils(" + JSON.stringify(subject_data) + ")");
        fillTeacherHometasks(subject_data);
    } else if (localStorage.getItem("usertype") === "pupil") {
        $("#subject_show_all_pupils_button").hide();
        $("#subject_teacher_link").show();
        $("#subject_delete_pupil_button").show();
        $("#olimpiad_delete_pupil_button").show();
        fillPupilHometasks(subject_data);
    }
}


function printReport() {
    var objFra = document.getElementById('myFrame');
    objFra.contentWindow.focus();
    objFra.contentWindow.print();
}

function show_olympiad(ol_data) {
    showPage('olympiad_tasks_page');
    if (localStorage.getItem("usertype") === "teacher") {
        $("#olimpiad_show_all_pupils_button").show();
        $("#olimpiad_teacher_link").hide();
        $("#add_addition_source_button").show();
        $("#olimpiad_show_all_pupils_button").attr("onclick", "setAllOlimpiadPupils(" + JSON.stringify(ol_data) + ")");
        fillTeacherOlympiadTasks(ol_data);
    } else if (localStorage.getItem("usertype") === "pupil") {
        $("#olimpiad_show_all_pupils_button").hide();
        $("#olimpiad_teacher_link").show();
        $("#add_addition_source_button").hide();
        fillPupilOlympiadTasks(ol_data);
    }
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

function setHometaskEditFields(data) {
    const titSel = $("#edit_hw_title");
    titSel.val(data.hw_title);
    titSel.removeClass("is-valid");
    titSel.removeClass("is-invalid");
    const conSel = $("#edit_hw_content");
    conSel.val(data.content);
    conSel.removeClass("is-valid");
    conSel.removeClass("is-invalid");
    const notSel = $("#edit_hw_notes");
    notSel.val(data.notes);
    notSel.removeClass("is-valid");
    notSel.removeClass("is-invalid");
}

function showOlympiadTask(task_data) {
    showPage("task_page");
    fillOlympiadTask(task_data);
}

function fillTaskFields(data) {
    removeValid("edit_task_form");
    $("#edit_task_title").attr("value", data.task_caption);
    $("#edit_task_content").text(data.content);
    $("#edit_task_deadline").attr("value", data.deadline_iso);
    $("#edit_task_notes").text(data.notes);

    const linkSel = $("#edit_task_links");
    linkSel.empty();
    for (let i in data.hyperlinks) {
        linkSel.append("<input type='text' id='edit_task_link" + i +
            "' value='" + data.hyperlinks[i] + "' class='form-control col-md-11' max='255'>" +
            "<button class='btn btn-outline-light col-md-1' id='edit_task_hyperlink_field_del" + i + "' onclick=deleteEditTaskHyperlinkField(" + i + ")>❌</button>");
    }
    linkSel.append("<button id='edit_task_hyperlink_field_button' class='btn btn-dark float-left' " +
        "onclick=editTaskHyperlinkField('" + data.hyperlinks.length + "')> + </button>");


    $("#edit_task_button").attr('onclick', "editTask('" + data.id + "')");
}

function fillOlympiadTask(data) {
    $("#task_title").text(data.task_caption);
    $("#task_task").text(data.content);
    const linkSel = $("#task_links");
    linkSel.empty();
    data.hyperlinks.forEach(link => linkSel.append("<a class='italic' href='" + link + "'>" + link + " </a><br>"));
    $("#task_notes").text(data.notes);

    if (localStorage.getItem("usertype") === "pupil") {
        $("#edit_task_modal_button").hide();
        $("#mark_task_modal_button").hide();
        $("#pupil_answer_status_table").show();
        $("#for_teacher_answer").hide();
        fillAnswerFieldsPupil(data);
    } else if (localStorage.getItem("usertype") === "teacher") {
        $("#edit_task_modal_button").show();
        $("#mark_task_modal_button").show();
        fillTaskFields(data);
        $("#pupil_answer_status_table").hide();
        $("#for_teacher_answer").show();
        fillAnswerFieldsTeacher(data.id);
    }
}

// HYPERLINKS
function addHyperlinkField(id) {

    $("#add_hyperlink_field_button").remove();
    const hwSel = $("#add_hw_links");
    hwSel.append(" <input type='text' id='new_hw_link" + id +
        "' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='add_hyperlink_field_del" + id + "' onclick=deleteAddHyperlinkField('" + id + "')>❌</button>");
    hwSel.append("<button id='add_hyperlink_field_button' class='btn btn-dark float-left' onclick=addHyperlinkField('"
        + (id + 1) + "')> + </button>");
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
        "<button class='btn btn-outline-light col-md-1' id='edit_hyperlink_field_del" + id + "' onclick=deleteEditHyperlinkField('" + id + "')>❌</button>");
    hwSel.append("<button id='edit_hyperlink_field_button' class='btn btn-dark float-left' onclick=editHyperlinkField('"
        + (id + 1) + "')> + </button>");
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
        "<button class='btn btn-outline-light col-md-1' id='add_task_hyperlink_field_del" + id + "' onclick=deleteAddTaskHyperlinkField('" + id + "')>❌</button>");
    taskSel.append("<button id='add_task_hyperlink_field_button' class='btn btn-dark float-left' onclick=addTaskHyperlinkField('"
        + (id + 1) + "')> + </button>");
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
        "<button class='btn btn-outline-light col-md-1' id='edit_task_hyperlink_field_del" + id + "' onclick=deleteEditTaskHyperlinkField('" + id + "')>❌</button>");
    taskSel.append("<button id='edit_task_hyperlink_field_button' class='btn btn-dark float-left' onclick=editTaskHyperlinkField('"
        + (id + 1) + "')> + </button>");
}

function deleteEditTaskHyperlinkField(id) {
    $("#edit_task_link" + id).remove();
    $("#edit_task_hyperlink_field_del" + id).remove();
}

function clearSubjectHyperlinks() {
    $("#add_hw_links").empty().append(" <input type='text' id='new_hw_link0' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='add_hyperlink_field_del0' onclick='deleteAddHyperlinkField(0)'>❌</button>" +
        "<button id='add_hyperlink_field_button' class='btn btn-dark float-left' onclick='addHyperlinkField(0)'> + </button>");

}

function clearOlympiadTaskHyperlinks() {
    $("#add_task_links").empty().append(" <input type='text' id='new_task_link0' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='add_task_hyperlink_field_del0' onclick='deleteAddTaskHyperlinkField(0)'>❌ </button>" +
        "<button id='add_task_hyperlink_field_button' class='btn btn-dark float-left' onclick='addTaskHyperlinkField(0)'> + </button>");
}

// HYPERLINKS END


function editAnswer(data) {
    $("#answer_container").empty().append("<textarea id='answer_area' class='text-break form-control' rows='6'>" +
        data.text + "</textarea>");
    $("#answer_link_container").empty().append("<input type='text' class='form-control' id='answer_link_input' value='" + data.hyperlink + "'> ");

    $("#submit_answer_button").attr("onclick", "submitAnswer('" + data.id + "')").show();
    $("#edit_answer_button").attr("onclick", "editAnswer(" + JSON.stringify(data) + ")").hide();
}

function setSchoolCode(data) {
    console.log(data);
    localStorage.setItem("school_code", data.code);
    $("#edit_school_name").val(data.name);
    $("#edit_school_region").val(data.region);
    $("#edit_school_street").val(data.street);
    $("#edit_school_house").val(data.house);
    $("#edit_school_phone").val(data.phone);
}


function setModalFields(answer) {
    const linkSel = $("#pupil_answer_hyperlink");
    $("#save_answer_button").attr("onclick", "saveAnswerFromTeacher(" + JSON.stringify(answer) + ")");
    $("#pupil_answer_name").text(answer.name);
    $("#answer_response_notes").val(answer.response);
    $("#pupil_answer_text").text(answer.text);
    linkSel.attr("href", answer.hyperlink);
    linkSel.text(answer.hyperlink);
    $("#pupil_answer_mark").val(answer.mark);
}


function getAnswerComponent(answer) {
    let res = "<div class='card'><div id='answer_card" + answer.id;
    if (answer.mark === "") {
        res += "' class='card-body bg-red bg-hover-blue' ";
    } else {
        res += "' class='card-body bg-hover-blue' ";
    }
    res += "onclick='setModalFields(" + JSON.stringify(answer) +
        ")' data-toggle='modal' data-target='#pupil_answer_for_teacher_modal'>" + answer.name + "</div>" +
        "</div>";
    return res;
}


function showPupilProfile(data) {


    $("#show_all_pupils_modal").modal('toggle');

    $("#pupil_pib").text(data.name);
    $("#pupil_email").text(data.email);
    if (data.phone === "")
        $("#pupil_phone").text("Не вказано");
    else
        $("#pupil_phone").text(data.phone);
    $("#pupil_class").text(data.class);
    if (data.birthdate === "")
        $("#pupil_bday").text("Не вказано");
    else
        $("#pupil_bday").text(data.birth_date);

    $("#pupil_notes").text(data.notes);
    $("#pupil_pupilcode").text(data.id);
    sessionStorage.setItem("schoolcode", data.school_id)
    $("#pupil_school_link").text(data.schoolname);

    $("#edit_pupil_modal_button").hide();
    showPage('pupil_page');
}


function clearOlympiadSourceHyperlinks() {
    $("#add_source_links").empty().append(" <input type='text' id='new_source_link0' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='add_source_hyperlink_field_del0' onclick='deleteAddSourceHyperlinkField(0)'>❌ </button>" +
        "<button id='add_source_hyperlink_field_button' class='btn btn-dark float-left' onclick='addSourceHyperlinkField(0)'> + </button>");
}

function addSourceHyperlinkField(id) {
    $("#add_source_hyperlink_field_button").remove();
    const taskSel = $("#add_source_links");
    taskSel.append(" <input type='text' id='new_task_link" + id +
        "' class='form-control col-md-11' max='255'>" +
        "<button class='btn btn-outline-light col-md-1' id='add_source_hyperlink_field_del" + id +
        "' onclick=deleteAddSourceHyperlinkField('" + id + "')>❌</button>");
    taskSel.append("<button id='add_source_hyperlink_field_button' class='btn btn-dark float-left' " +
        "onclick=addSourceHyperlinkField('" + (id + 1) + "')> + </button>");
}

function deleteAddSourceHyperlinkField(id) {
    $("#new_source_link" + id).remove();
    $("#add_source_hyperlink_field_del" + id).remove();
}
