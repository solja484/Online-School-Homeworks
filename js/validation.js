function validEmail(str) {
    let name = $("#" + str).val();
    if (name.length < 1 || name.length > 100) {
        document.getElementById(str).classList.remove('is-valid');
        document.getElementById(str).classList.add('is-invalid');

        return false;
    }
    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name.match(pattern)) {
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true;
    } else {
        document.getElementById(str).classList.remove('is-valid');
        document.getElementById(str).classList.add('is-invalid');

        return false;
    }
}

function validName(str) {
    let name = $("#" + str).val();
    if (name.length < 1 || name.length > 45) {
        document.getElementById(str).classList.remove('is-valid');
        document.getElementById(str).classList.add('is-invalid');

        return false;
    }
    let letters = /^[A-Za-zА-Яа-яі]+$/;
    if (name.match(letters)) {
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true;
    } else {
        document.getElementById(str).classList.remove('is-valid');
        document.getElementById(str).classList.add('is-invalid');

        return false;
    }
}

function validFName(str) {
    let name = $("#" + str).val();
    if (name === "") {
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true;
    }
    return validName(str);

}

//at least 6 characters eng letter number and symbol
function validPass(str) {
    let pass = $("#" + str).val();
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
    if (!pattern.test(pass)) {
        document.getElementById(str).classList.remove('is-valid');
        document.getElementById(str).classList.add('is-invalid');

        return false;
    }
    document.getElementById(str).classList.remove('is-invalid');
    document.getElementById(str).classList.add('is-valid');
    return true;
}

function validCode(str) {
    let code = $("#" + str).val();
    if (code.length == 10) {
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true;
    }

    document.getElementById(str).classList.remove('is-valid');
    document.getElementById(str).classList.add('is-invalid');
    return false
}

function validClass(str) {
    let klass = $("#" + str).val();
    let isNum = /^\d+$/.test(klass);
    let value = -1;
    if (isNum) value = parseInt(klass);
    if (isNum && value > 0 && value < 12) {
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true;
    }

    document.getElementById(str).classList.remove('is-valid');
    document.getElementById(str).classList.add('is-invalid');
    return false;

}

function validDocument(str) {
    let val = $("#" + str).val();
    let pattern = /^\d+$/;//^[0-9]*$
    if (val.length == 8 && val.match(pattern)) {
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true;
    }
    document.getElementById(str).classList.remove('is-valid');
    document.getElementById(str).classList.add('is-invalid');
    return false;
}

function validPhone(str) {
    let phone = $("#" + str).val();
    let pattern=/^\d+$/;
    let pattern2=/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    if (phone === ""){
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true;

    }else if(phone.match(pattern)&&phone.length===10) {
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true
    }else if(phone.match(pattern2)){
        document.getElementById(str).classList.remove('is-invalid');
        document.getElementById(str).classList.add('is-valid');
        return true
    }
        document.getElementById(str).classList.remove('is-valid');
        document.getElementById(str).classList.add('is-invalid');

        return false;

}



function validEmpty(str) {
    let edu = $("#" + str).val();
    if (edu === "") {
        document.getElementById(str).classList.remove('is-valid');
        document.getElementById(str).classList.add('is-invalid');
        return false;
    }
    document.getElementById(str).classList.remove('is-invalid');
    document.getElementById(str).classList.add('is-valid');
    return true;
}