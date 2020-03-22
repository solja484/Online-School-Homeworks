function validEmail(str) {
    var selctor = $("#" + str);
    let name = selector.val();
    if (name.length < 1 || name.length > 100) {
        selctor.removeClass('is-valid');
        selctor.addClass('is-invalid');
        return false;
    }
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name.match(pattern)) {
        selctor.removeClass('is-invalid');
        selctor.addClass('is-valid');
        return true;
    } else {
        selctor.removeClass('is-valid');
        selctor.addClass('is-invalid');

        return false;
    }
}

function validName(str) {
    var selctor = $("#" + str);
    let name = selector.val();
    if (name.length < 1 || name.length > 45) {
        selctor.removeClass('is-valid');
        selctor.addClass('is-invalid');
        return false;
    }
    let letters = /^[A-Za-zА-Яа-яі]+$/;
    if (name.match(letters)) {
        selctor.removeClass('is-invalid');
        selctor.addClass('is-valid');
        return true;
    } else {
        selctor.removeClass('is-valid');
        selctor.addClass('is-invalid');
        return false;
    }
}

function validFName(str) {
    var selctor = $("#" + str);
    let name = selector.val();
    if (name === "") {
        selctor.removeClass('is-invalid');
        selctor.addClass('is-valid');
        return true;
    }
    return validName(str);

}

//at least 6 characters eng letter number and symbol
function validPass(str) {
    var selctor = $("#" + str);
    let pass = selector.val();
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
    if (!pattern.test(pass)) {
        selector.removeClass('is-valid');
        selctor.addClass('is-invalid');

        return false;
    }
    selector.removeClass('is-invalid');
    selctor.addClass('is-valid');
    return true;
}

function validCode(str) {
    var selctor = $("#" + str);
    let code = selector.val();
    if (code.length === 10) {
        selector.removeClass('is-invalid');
        selctor.addClass('is-valid');
        return true;
    }
    selector.removeClass('is-valid');
    selctor.addClass('is-invalid');
    return false
}

function validClass(str) {
    var selctor = $("#" + str);
    let klass = selctor.val();
    let isNum = /^\d+$/.test(klass);
    let value = -1;
    if (isNum) value = parseInt(klass);
    if (isNum && value > 0 && value < 12) {
        selctor.removeClass('is-invalid');
        selctor.addClass('is-valid');
        return true;
    }
    selector.removeClass('is-valid');
    selctor.addClass('is-invalid');
    return false;

}

function validFreeClass(str) {
    var selctor = $("#" + str);
    let val = selctor.val();
    if (val === "") {
        selctor.removeClass('is-invalid');
        selctor.addClass('is-valid');
        return true;
    }
    return validClass(str);
}

function validDocument(str) {
    var selector = $("#" + str);
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
    var selector = $("#" + str);
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
    var selctor = $("#" + str);
    let edu = selector.val();
    if (edu === "") {
        selector.removeClass('is-valid');
        selctor.addClass('is-invalid');
        return false;
    }
    return true;
}