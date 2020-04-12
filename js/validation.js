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


function validHouse(str) {
    const selector = $("#" + str);
    let house = selector.val();
    let pattern = /^[A-Za-zА-Яа-яіІїЇєЄ ,-]*[0-9][A-Za-zА-Яа-яіІїЇєЄ ,-]*[0-9]?[A-Za-zА-Яа-яіІїЇєЄ ,-]*[0-9]?[A-Za-zА-Яа-яіІїЇєЄ ,-]*[0-9]?[A-Za-zА-Яа-яіІїЇєЄ ,-]*$/;
    if (house.match(pattern)) {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    } else {
        selector.removeClass('is-valid');
        selector.addClass('is-invalid');

        return false;
    }

}

function validEmail(str) {
    const selector = $("#" + str);
    let name = selector.val();
    if (name.length < 1 || name.length > 100) {
        selector.removeClass('is-valid');
        selector.addClass('is-invalid');
        return false;
    }
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name.match(pattern)) {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    } else {
        selector.removeClass('is-valid');
        selector.addClass('is-invalid');

        return false;
    }
}

function validName(str) {
    const selector = $("#" + str);
    let name = selector.val();
    if (name.length < 1 || name.length > 45) {
        selector.removeClass('is-valid');
        selector.addClass('is-invalid');
        return false;
    }
    let letters = /^[A-Za-zА-Яа-яіІїЇєЄ ]+$/;
    if (name.match(letters)) {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    } else {
        selector.removeClass('is-valid');
        selector.addClass('is-invalid');
        return false;
    }
}

function validFName(str) {
    const selector = $("#" + str);
    let name = selector.val();
    if (name === "") {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    }
    return validName(str);
}

//at least 6 characters eng letter number and symbol
function validPass(str) {
    const selector = $("#" + str);
    let pass = selector.val();
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
    if (!pattern.test(pass)) {
        selector.removeClass('is-valid');
        selector.addClass('is-invalid');
        return false;
    }
    selector.removeClass('is-invalid');
    selector.addClass('is-valid');
    return true;
}

function validCode2(str) {
    const selector = $("#" + str);
    let code = selector.val();
    let number = /^[0-9]+$/;
    console.log(code.match(number));
    if (code.match(number) && code.length === 10) {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    }
    selector.removeClass('is-valid');
    selector.addClass('is-invalid');
    return false
}
function validCode(str) {
    const selector = $("#" + str);
    let code = selector.val();
    if (code.length === 10) {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    }
    selector.removeClass('is-valid');
    selector.addClass('is-invalid');
    return false
}

function validClass(str) {
    const selector = $("#" + str);
    let klass = selector.val();
    let isNum = /^\d+$/.test(klass);
    let value = -1;
    if (isNum) value = parseInt(klass);
    if (isNum && value > 0 && value < 12) {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    }
    selector.removeClass('is-valid');
    selector.addClass('is-invalid');
    return false;

}

function validFreeClass(str) {
    const selector = $("#" + str);
    let val = selector.val();
    if (val === "") {
        selector.removeClass('is-invalid');
        selector.removeClass('is-valid');
        return true;
    }
    return validClass(str);
}

function validDocument(str) {
    const selector = $("#" + str);
    let val = selector.val();
    let pattern = /^\d+$/;//^[0-9]*$
    if (val.length === 8 && val.match(pattern)) {
        selector.removeClass('is-invalid');
        selector.addClass('is-valid');
        return true;
    }
    selector.removeClass('is-valid');
    selector.addClass('is-invalid');
    return false;
}

function validPhone(str) {
    const selector = $("#" + str);
    let phone = selector.val();
    let pattern = /^\d+$/;
    let pattern2 = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    if ((phone === "") || phone.match(pattern) && phone.length === 10 || phone.match(pattern2)) {
        selector.removeClass('is-invalid');
        if (phone === "")
            selector.removeClass('is-valid');
        else
            selector.addClass('is-valid');
        return true
    }
    selector.removeClass('is-valid');
    selector.addClass('is-invalid');
    return false;
}

function validEmpty(str) {
    const selector = $("#" + str);
    let edu = selector.val();
    if (edu === "") {
        selector.removeClass('is-valid');
        selector.addClass('is-invalid');
        return false;
    }
    return true;
}


//on key uo
$("#reg_lastname").keyup(function () {
    $("#reg_lastname").css("background", "white");
});
$("#reg_firstname").keyup(function () {
    $("#reg_firstname").css("background", "white");
});
$("#reg_fathername").keyup(function () {
    $("#reg_fathername").css("background", "white");
});
$("#reg_code").keyup(function () {
    $("#reg_code").css("background", "white");
});
$("#reg_password").keyup(function () {
    $("#reg_password").css("background", "white");
});
$("#reg_password2").keyup(function () {
    $("#reg_password2").css("background", "white");
});
$("#reg_email").keyup(function () {
    $("#reg_email").css("background", "white");
});
$("#answer_area").keyup(function () {
    $("#answer_area").removeClass('is-invalid');
});
$("#subject_search_input").keyup(function () {
    $("#subject_search_input").removeClass('is-invalid');
    $("#subject_search_input").removeClass('is-valid');
});
$("#olympiad_search_input").keyup(function () {
    $("#olympiad_search_input").removeClass('is-invalid');
    $("#olympiad_search_input").removeClass('is-valid');
});

// $("#input_admin_login").keyup(function () {
//     logSelector.removeClass('is-invalid');
// });
// $("#input_admin_password").keyup(function () {
//     logSelector.removeClass('is-invalid');
//     logSelector.removeClass('is-valid');
// });
// $("#input_admin_email").keyup(function () {
//     logSelector.removeClass('is-invalid');
//     logSelector.removeClass('is-valid');
// });


//якщо додати предмет а потім знову відкрити модальне вікно,
//зберігається попередня інфа і валідовані зелененькі поля
//ці два методи забирають валідацію і інфу відповідно
function removeValid(str) {
    $("form#" + str + " :input").each(function () {
        $(this).removeClass('is-valid');
    });
}

function clearForm(str) {
    $("form#" + str + " :input").each(function () {
        $(this).val('');
    });
}