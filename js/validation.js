function validHouse(str) {
    const selector = $("#" + str);
    let house = selector.val();
    //TODO @solia
    // максимум 4 чифри у всьому тексті, всі знаки окрім літер і пробілу, коми, тире (дефіс) недопустимі
    return house !== "";

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
    let letters = /^[A-Za-zА-Яа-яіІ]+$/;
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
        selector.addClass('is-valid');
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
    dselector.addClass('is-invalid');
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