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