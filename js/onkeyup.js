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
$("input_admin_login").keyup(function () {
    logSelector.removeClass('is-invalid');
});
$("input_admin_password").keyup(function () {
    logSelector.removeClass('is-invalid');
    logSelector.removeClass('is-valid');
});
$("input_admin_email").keyup(function () {
    logSelector.removeClass('is-invalid');
    logSelector.removeClass('is-valid');
});