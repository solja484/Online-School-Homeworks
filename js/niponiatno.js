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
function fillTeacherOlympiadTasks(ol_data) {
    const hwListSel = $("#olympiad_tasks_list");
    hwListSel.empty();
    const ol_id = ol_data.id;


    $("#edit_olympiad_modal_button").show();
    $("#delete_olympiad_modal_button").show();
    $("#add_task_modal_button").show();
    fillOlympiadFields(ol_data);
    fillSources(ol_id);

    //TODO видалити після того як буде метод на сервері
    let datas = [
        {
            id: 1,
            task_caption: "Завдання 1",
            content: "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \\nВизначити наявні інформаційні ресурси та стан їх вразливостей \\nНадати розширений звіт аудиту безпеки ",
            deadline: '23.04.2020 23:55',
            source_id: sessionStorage.getItem("olympiad"),
            links: ['https://distedu.ukma.edu.ua']
        }
    ];
    sessionStorage.setItem("olympiad", ol_id);
    datas.forEach(data => hwListSel.append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
        "<a id='task" + data.id + "' class='hw_link col-md-8' onclick='showOlympiadTask(" + data.id +
        ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3 text-14'>" + data.deadline +
        "</span><button class='btn btn-light col-md-1 text-14 pd-0' data-target='#delete_task_modal' " +
        "onclick='addTaskDelButton(" + data.id + ")' data-toggle='modal'>❌</button></div>"));
    fillCompetition(ol_id);

    /*TODO розкоментити після того як буде метод на сервері
        $.ajax({
            url: 'http://localhost:2303/getolympiadtasks', //TODO @natasha назва метода
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json',
            success: function (datas) {

                sessionStorage.setItem("olympiad", ol_id);
              datas.forEach(data => hwListSel.append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
            "<a id='task" + data.id + "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + data.id +
            ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline +
            "</span><button class='btn btn-outline-danger bg-hover-red col-md-3' data-target='#delete_task_modal' " +
            "onclick='addTaskDelButton(" + data.id + ")' data-toggle='modal'>Видалити</button></div>"));

                    fillCompetition(ol_id);
                      fillSources(ol_id);
            },
            error: function (datas) {
              //  alert(datas.error);
            },
            data: JSON.stringify({
                "id": ol_id
            })
        });
    */

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

function fillPupilOlympiads(id) {
    const subListSel = $("#pupil_olympiads_list");
    subListSel.empty();

    let datas = [
        {
            id: 1,
            title: 'Районна олімпіада з математики',
            con_id: 2,
            discipline: 'Математика',
            class_num: 11,
            notes: 'нотатки'
        },
        {
            id: 2,
            title: 'конкурс ім. Петра Яцика',
            con_id: 5,
            discipline: 'Українська мова та література',
            class_num: 10,
            notes: 'нотатки'
        }
    ];

    datas.forEach(data => subListSel.append("<a href='#' class='list-group-item list-group-item-action " +
        "list-group-item-light' data-toggle='list' role='tab' onclick='show_olympiad(" + JSON.stringify(data)
        + ");'>" + data.title + "</a>"));

    $.ajax({
        url: 'http://localhost:2303/getpupilolympiads', //TODO @natasha назва метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {
            datas.forEach(data => subListSel.append("<a href='#' class='list-group-item list-group-item-action " +
                "list-group-item-light' data-toggle='list' role='tab' onclick='show_olympiad(" + JSON.stringify(data)
                + ");'>" + data.title + "</a>"));
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillPupilOlympiadTasks(ol_data) {
    const hwListSel = $("#olympiad_tasks_list");
    hwListSel.empty();
    const ol_id = ol_data.id;


    $("#edit_olympiad_modal_button").hide();
    $("#delete_olympiad_modal_button").hide();
    $("#add_task_modal_button").hide();

    $("#ol_title").text(ol_data.title);
    $("#ol_discipline").text(ol_data.discipline + " " + ol_data.class_num + " клас");


    //TODO видалити після того як буде метод на сервері
    sessionStorage.setItem("olympiad", ol_id);

    let datas = [
        {
            id: 1,
            task_caption: "Завдання 1",
            content: "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \\nВизначити наявні інформаційні ресурси та стан їх вразливостей \\nНадати розширений звіт аудиту безпеки ",
            deadline: '23.04.2020 23:55',
            source_id: sessionStorage.getItem("olympiad"),
            links: ['https://distedu.ukma.edu.ua']
        }
    ];

    datas.forEach(data => hwListSel.append("<div id='blocktask" + data.id + "' class='hw-active row'>" +
        "<a id='task" + data.id + "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + data.id +
        ")' href='#content'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline +
        "</span></div>"));

    fillCompetition(ol_id);
    fillSources(ol_id);

    $.ajax({
        url: 'http://localhost:2303/getolympiadtasks', //TODO @natasha назва методу
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (datas) {

            sessionStorage.setItem("olympiad", ol_id);
            fillCompetition(ol_id);
            //у завданнях немає атрибуту активний але є дедлайн
            //або додаємо атрибут або не помічаємо сірим завдання у яких вийшов дедлайн
            //якщо додаємо атрибут то цей кусок коду, інакше той що вверху
            datas.forEach(data => {
                if (!data.active)
                    hwListSel.append(" <div id='blocktask" + data.id + "' class='hw-disabled  row'><a id='task" + data.id +
                        "' class='hw_link col-md-9 ' onclick='showOlympiadTask(" + data.id + ")' " +
                        "href='#content'>" + data.task_caption + "</a><span class='col-md-3'>"
                        + data.deadline + "</span></div>");
                else
                    hwListSel.append(" <div id='blocktask" + data.id + "' class='hw-active row'><a id='task" + data.id +
                        "' class='hw_link col-md-9 ' href='#content' onclick='showOlympiadTask(" + data.id +
                        ")'>" + data.task_caption + "</a><span class='col-md-3'>" + data.deadline + "</span>" +
                        "</div>")
            });
            fillSources(ol_id);
        },
        error: function (datas) {
            alert(datas.error + " fillOlympiadTasks()");
        },
        data: JSON.stringify({
            "id": ol_id
        })
    });

}

// OLYMPIAD TASKS FIELD
function fillCompetition(ol_id) {
    let data = {
        "id": 1,
        "title": "Олімпіада з математики",
        "stage": "2 етап",
        "remain_time": "45днів",
        "ev_date": "12.12.2020",
        "place": 'Ліцей "Лідер"'
    };

    $("#competition_title").text(data.title);
    $("#competition_stage").text(data.stage);

    $("#competition_date").text(data.ev_date);
    $("#competition_place").text(data.place);
    $("#competition_time").text(data.remain_time);

    $.ajax({
        url: 'http://localhost:2303/getcompetitioninfo', //TODO @natasha назва методу
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#competition_title").text(data.title);
            $("#competition_stage").text(data.stage);

            $("#competition_date").text(data.ev_date);
            $("#competition_place").text(data.place);
            $("#competition_time").text(data.remain_time);


        },
        error: function (datas) {
            alert(datas.error);
        },
        data: JSON.stringify({
            "id": ol_id
        })
    });
}

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

function deleteOlympiadTask(id) {
    $.ajax({
        url: 'http://localhost:2303/deletehometask', //TODO @natasha назва метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {
            $("#blocktask" + id).remove();
            $("#delete_task_modal").modal('hide');
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": id
        })
    });
}

function fillOlympiadTask(task_id) {

    $.ajax({
        url: 'http://localhost:2303/gethometaskinfo', //TODO @natasha назва метода
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        success: function (data) {

            $("#task_title").text(data.task_caption);
            $("#task_task").text(data.content);
            const linkSel = $("#task_links");
            linkSel.empty();
            data.hyperlinks.forEach(link => linkSel.append("<a class='italic' href='" + link + "'>" + link + " </a><br>"));
            $("#task_notes").text(data.notes);

            if (localStorage.getItem("usertype") === "pupil") {
                $("#edit_task_modal_button").hide();
                $("#mark_task_modal_button").hide();
            } else if (localStorage.getItem("usertype") === "teacher") {
                $("#edit_task_modal_button").show();
                $("#mark_task_modal_button").show();
                fillTaskFields(data);
            }
            fillAnswerFields(data);
        },
        error: function (data) {
            alert(data.error);
        },
        data: JSON.stringify({
            "id": task_id
        })
    });

}

function fillTaskFields(data) {

    removeValid("edit_task_form");

    $("#edit_task_title").attr("value", data.task_caption);
    $("#edit_task_content").text(data.content);
    $("#edit_task_deadline").attr("value", data.deadline);
    $("#edit_task_notes").text(data.notes);

    const linkSel = $("#edit_task_links");
    linkSel.empty();
    for (let i in data.hyperlinks) {
        linkSel.append("<input type='text' id='edit_task_link" + i +
            "' value='" + data.hyperlinks[i] + "' class='form-control col-md-11' max='255'>" +
            "<button class='btn btn-outline-light col-md-1' id='edit_task_hyperlink_field_del" + i + "' onclick='deleteEditTaskHyperlinkField(" + i + ")'>❌</button>");
    }
    linkSel.append("<button id='edit_task_hyperlink_field_button' class='btn btn-dark float-left' onclick='editTaskHyperlinkField("
        + data.hyperlinks.length + ")'> + </button>");

    $("#edit_task_button").attr('onclick', 'editTask(' + data.task_id + ')');
}

function fillAnswerFields(task_data) { //TODO передається вся інфа по завданню (замість об'єкту task який я ручками написала)
    let str = "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \n" +
        "Визначити наявні інформаційні ресурси та стан їх вразливостей\n" +
        "Надати розширений звіт аудиту безпеки ";
    let task = {
        "id": "1",
        "title": "Розділ 22",
        "content": str,
        "active": true,
        "deadline": "5.04.2020 23:55",
        "remain_time": "3д 5год 36хв",//"",
        "notes": "notesnotesnotesnotes",
        "link": "www.cisco.com"

    };
    let answer = {
        "id": "3",
        "text": "aoaoaoaoaooao oa oa oao oaooao o aoo oooaoaoaooao",
        "hyperlink": "www.distedu.ukma.edu.ua",
        "response": "looks good",
        "mark": "11/12"
    };

    $("#answer_deadline").text(task.deadline);


    const answerSel = $("#answer_status");
    if (answer.text === "") { //нічого не здано
        answerSel.text("Нічого не здано");
        answerSel.removeClass("table-success");
        $("#answer_container").empty();
        $("#answer_link_container").empty();
    } else {
        answerSel.text("Здано на оцінення");
        answerSel.addClass("table-success");
        $("#answer_container").empty().text(answer.text);
        $("#answer_link_container").empty().append(" <a id='answer_link' href='" + answer.hyperlink + "'>" + answer.hyperlink + "</a>")

    }
    if (task.remain_time === "") {
        $("#submit_answer_button").attr("disabled", "disabled");
        $("#edit_answer_button").attr("disabled", "disabled");
        $("#answer_timeleft").addClass("table-danger").text("Час вичерпано");
    } else {

        $("#submit_answer_button").removeAttr("disabled");
        $("#edit_answer_button").removeAttr("disabled");
        $("#answer_timeleft").removeClass("table-danger").text(task.remain_time);
    }


    if (localStorage.getItem("usertype") === "pupil") {
        $("#edit_task_modal_button").hide();
        $("#submit_mark_button").hide();
        $("#edit_mark_button").hide();
        const submitSel = $("#submit_answer_button");
        const editSel = $("#edit_answer_button");
        submitSel.show();
        editSel.show();


        if (answer.text === "") {
            //нічого не здано
            submitSel.show().attr("onclick", "submitAnswer(" + answer.id + ")");
            editSel.hide();
            $("#answer_container").append(" <textarea id='answer_area' class='text-break form-control' rows='6'>" +
                +"</textarea>");
            $("#answer_link_container").append("<input type='text' class='form-control' id='answer_link_input'>");

        } else {
            submitSel.hide();
            editSel.show().attr("onclick", "editAnswer(" + JSON.stringify(answer) + ")");
        }
        if (answer.mark === "") {
            $("#answer_mark_container").empty().append("<p>Не оцінено</p>");
        } else {
            $("#answer_mark_container").empty().append("<p>" + answer.mark + "</p>");
        }

        $("#answer_comment_container").empty().append("<p>" + answer.response + "</p>");


    } else if (localStorage.getItem("usertype") === "teacher") {
        $("#edit_task_modal_button").show();
        $("#submit_mark_button").hide().attr('onclick', 'submitMark(' + answer.id + ')');
        $("#edit_mark_button").show().attr('onclick', 'editMark(' + JSON.stringify(answer) + ')');
        $("#submit_answer_button").hide();
        $("#edit_answer_button").hide();
        $("#answer_mark_container").empty().append("<p>" + answer.mark + "</p>");
        $("#answer_comment_container").empty().text(answer.response);
    }


}


//SOURCES BLOCK
function fillSources(ol_id) {
    //TODO сюди мають прилітати всі додаткові джерела з лінками, подумаємо чи треба їх едітать
    let datas = [
        {
            'id': 2,
            'caption': 'додаткове джерело 1',
            'content': 'юююююююююююююююний орел, юний орееееееееееееееел',
            'notes': '',
            'links': ["https://www.pinterest.com/"]
        },
        {
            'id': 2,
            'caption': 'додаткове джерело 2',
            'content': 'ти лети від джерел до джерел від джерел до джерел',
            'notes': '',
            'links': ["https://distedu.ukma.edu.ua/grade/report/user/index.php?id=66", "https://unsplash.com/"]
        }
    ];
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