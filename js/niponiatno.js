
function fillHometaskUncorrect(id) {
    if (localStorage.getItem("usertype") === "pupil") {
        $("#edit_hometask_modal_button").hide();
        $("#mark_hw_modal_button").hide();

        let str = "Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \n" +
            "Визначити наявні інформаційні ресурси та стан їх вразливостей\n" +
            "Надати розширений звіт аудиту безпеки ";
        let data = {
            "id": "1",
            "title": "Розділ 22",
            "content": str,
            "active": false,
            "deadline": "5.04.2020 23:55",
            "time_left": "",//"3д 5год 36хв",
            "notes": "notesnotesnotesnotes",
            "link": "www.cisco.com"

        };
        let data2 = {
            "id": "3",
            "answer": "aoaoaoaoaooao oa oa oao oaooao o aoo oooaoaoaooao",
            "hyperlink": "www.distedu.ukma.edu.ua",
            "comment": "looks good",
            "mark": "11/12"
        };

        //homework info
        $("#hw_title").text(data.title);
        $("#hw_task").text(data.content);
        for (let i = 0; i < 3; i++) {
            $("#hw_links").append("<a class='italic' href='" + data.link + "'>" + data.link + " </a><br>");
        }
        $("#hw_notes").text(data.notes);

        //answer status
        $("#submit_mark_button").hide();
        const answerSel = $("#answer_status");
        if (data2.answer === "") {
            answerSel.text("Нічого не здано");
            answerSel.removeClass("table-success");


            $("#submit_answer_button").show().attr("onclick", "submitAnswer(" + data2.id + ")");
            $("#edit_answer_button").hide();
            $("#answer_container").empty().append(" <textarea id='answer_area' class='text-break form-control' rows='6'>" +
                +"</textarea>");
            $("#answer_link_container").empty().append("<input type='text' class='form-control' id='answer_link_input'>");

        } else {
            answerSel.text("Здано на оцінення");
            answerSel.addClass("table-success");

            $("#submit_answer_button").hide();

            $("#edit_answer_button").show().attr("onclick", "editAnswer(" + data2.id + ")");
            $("#answer_container").empty().text(data2.answer);
            $("#answer_link_container").empty().append(" <a id='answer_link' href='" + data2.hyperlink + "'>" + data2.hyperlink + "</a>")
        }

        if (data2.mark === "") {
            $("#answer_mark").text("Не оцінено");
        } else {
            $("#answer_mark").text(data2.mark);

        }

        $("#answer_comment").text(data2.comment);
        $("#answer_deadline").text(data.deadline);
        if (data.time_left === "") {
            $("#submit_answer_button").attr("disabled", "disabled");
            $("#edit_answer_button").attr("disabled", "disabled");
            $("#answer_timeleft").addClass("table-danger").text("Час вичерпано");
        } else {
            $("#submit_answer_button").attr("disabled", "");
            $("#edit_answer_button").attr("disabled", "");
            $("#answer_timeleft").removeClass("table-danger").text(data.time_left);
        }

        $.ajax({
            url: 'http://localhost:2303/gethometaskinfo',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json',
            success: function (data) {


            },
            error: function (data) {
                alert(data.error);
            },
            data: JSON.stringify({
                "id": id
            })
        });
    }
}