function addSubject(){

document.getElementById("new_subject_description").classList.add('is-valid');
let name=$("#new_subject_name").val();
if(validEmpty("new_subject_name")&&validFreeClass("new_subject_class")){
$("#teacher_list").append("<a href='#' class='list-group-item list-group-item-action list-group-item-light' data-toggle='list'" +
    "role='tab' onclick='show_subject()'>"+name+"</a>")
$("#add_subject_modal").modal('hide');

}
}