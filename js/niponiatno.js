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

function setAllSubjectPupils(sub_data) {
    $("#all_pupils_modal_titile").text(sub_data.title+" вивчають:")
    const selector = $("#all_pupil_modal_body");
    $.ajax({
        url: 'http://localhost:2303/getallsubjectpupils',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            selector.empty();
            data.forEach(pupil => selector.append("<div class='card' aria-controls='pupil_page' data-toggle='pill' role='tab' href='#pupil_page' onclick='showPupilProfile("+JSON.stringify(pupil)+")'><div class='card-body'>"+pupil.name+"</div></div>"));
            $("#show_all_pupils_modal").modal('toggle');
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "id": sub_data.id
        })
    });
}

function setAllOlimpiadPupils(ol_data) {
    console.log(ol_data);
    $("#all_pupils_modal_titile").text(ol_data.title+" вивчають:")
    const selector = $("#all_pupil_modal_body");
    $.ajax({
        url: 'http://localhost:2303/getallolimpiapupils',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            selector.empty();
            data.forEach(pupil => selector.append("<div class='card' aria-controls='pupil_page' data-toggle='pill' role='tab' href='#pupil_page' onclick='showPupilProfile("+JSON.stringify(pupil)+")'><div class='card-body'>"+pupil.name+"</div></div>"));
            $("#show_all_pupils_modal").modal('toggle');
        },
        error: function (data2) {
            console.log(data2.error);
        },
        data: JSON.stringify({
            "id": ol_data.id
        })
    });
}