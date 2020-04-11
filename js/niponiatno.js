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


//OLYMPIADS SECTION

// OLYMPIAD TASKS FIELD

function addTask() {
//TODO @natasha addTask() пропиши сюди код ідентичний до addHometask(), коли пофіксиш addHometask
    if (!validEmpty('new_task_title') || !validEmpty('new_task_content') || !validEmpty("new_task_deadline"))
        return false;

    let id = sessionStorage.getItem("olympiad");

    let links = [];
    $.each($('input', '#add_task_links'), function () {
        if ($(this).val() !== "")
            links.push($(this).val());
    });


    let data = {
        "task_caption": $("#new_task_title").val(),
        "content": $("#new_task_content").val(),
        "deadline": $("#new_task_deadline").val(),
        "notes": $("#new_task_notes").val(),
        "hyperlinks": links,
        "source_id": id
    };


}

function editTask(id) {

    if (!validEmpty('edit_task_title') || !validEmpty('edit_task_content') || !validEmpty("edit_task_deadline"))
        return false;

    let links = [];
    $.each($('input', '#edit_task_links'), function () {
        if ($(this).val() !== "")
            links.push($(this).val());
    });

    const data = {
        "id": hw_id,
        "task_caption": $("#edit_task_title").val(),
        "content": $("#edit_task_content").val(),
        "notes": $("#edit_task_notes").val(),
        "deadline": $("#edit_task_deadline").val(),
        "links": links
    };
//TODO @natasha editTask() пропиши сюди код іддентичний до editHometask(), коли пофіксиш editHometask
}
function fillAnswerFieldsTeacher() {
//TODO @natahiko
    $("#edit_task_modal_button").show();
    $("#submit_mark_button").hide().attr('onclick', 'submitMark(' + answer.id + ')');
    $("#edit_mark_button").show().attr('onclick', 'editMark(' + JSON.stringify(answer) + ')');
    $("#submit_answer_button").hide();
    $("#edit_answer_button").hide();
    $("#answer_mark_container").empty().append("<p>" + answer.mark + "</p>");
    $("#answer_comment_container").empty().text(answer.response);
}

