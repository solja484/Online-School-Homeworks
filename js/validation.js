function validEmail(str) {
    var name = $("#" + str).val();
    if (name.length < 1 || name.length > 100) {
        $("#" + str).css("background-color", "rgba(253, 113, 114, 0.5)");
        return false;
    }
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name.match(pattern)) {
        return true;
    } else {
        $("#" + str).css("background", "rgba(253, 113, 114, 0.5)");
        return false;
    }
}

function validName(str) {
    var name = $("#" + str).val();
    if (name.length < 1 || name.length > 45) {
        $("#" + str).css("background-color", "rgba(253, 113, 114, 0.5)");
        return false;
    }
    var letters = /^[A-Za-zА-Яа-яі]+$/;
    if (name.match(letters)) {
        return true;
    } else {
        $("#" + str).css("background", "rgba(253, 113, 114, 0.5)");
        return false;
    }
}

//at least 6 characters eng letter number and symbol
function validPass(str) {
    var pass = $("#" + str).val();
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/;
    if (!pattern.test(pass)) {
        $("#" + str).css("background-color", "rgba(253, 113, 114, 0.5)");
        return false;
    }
    return true;
}

function validCode(str) {
    var code = $("#" + str).val();
    if (code.length==10){
        return true;
    }
    $("#" + str).css("background-color", "rgba(253, 113, 114, 0.5)");
    return false
}