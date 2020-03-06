let usertypes=["admin","teacher","pupil"];
let usertype=0;

function change_entry_type(t){
     if(t===0){
        document.getElementById('entryform').style.background =  '#fd7172';
        usertype=0;
    }
    else if(t===1){
        document.getElementById('entryform').style.background = '#fee96a';
        usertype=1;
    }
    else if(t===2){
        document.getElementById('entryform').style.background = '#7cdeeb';
        usertype=2;
    }
}
function change_reg_type(t){

    if(t===1){
        document.getElementById('registryform').style.background = '#fee96a';
        usertype=1;
    }
    else{
        document.getElementById('registryform').style.background = '#7cdeeb';
        usertype=2;
    }
}

function shoW(except){
    $("#admin_page").hide();
    $("#cabinet_page").hide();
    $("#subject_page").hide();
    $("#"+except).show();
}



let authentication=false;
$("#entrypanel").show();
$("#registrypanel").hide();
$("#admin_page").hide();
$("#admin_page_tab").hide();
$("#container").hide();


function register() {
    authentication = true;
    $("#registrypanel").hide();
    $("#admin_page").hide();
    $("#admin_page_tab").hide();
    $("#entrypanel").hide();
    $("#container").show();
}
function login() {
    authentication = true;
    $("#entrypanel").hide();
    $("#registrypanel").hide();
    $("#container").show();
    if(usertype==0){
        $("#admin_page").show();
        $("#admin_page_tab").show();
    }else{
        $("#admin_page").hide();
        $("#admin_page_tab").hide();
    }
    $("#container").show();
}
function exit() {
    authentication=false;
    $("#container").hide();
    $("#entrypanel").show();
}

function gotoregistration(){
    $("#registrypanel").show();
    $("#entrypanel").hide();
    $("#container").hide();
}

function gotologin(){
    $("#registrypanel").hide();
    $("#entrypanel").show();
    $("#container").hide();
}