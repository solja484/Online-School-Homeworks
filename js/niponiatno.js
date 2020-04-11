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

