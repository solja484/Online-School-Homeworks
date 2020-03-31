function addCityModal(){
    //короче, мені надо щоб тут красиво заповнювався список міст
    //або не так, або не тут, але щоб воно було
    //нічого полезного в цьому немає, чисто щоб перед очима був список існуючих міст коли додаєш нове





    $.ajax({
        url: 'http://localhost:2303/getCities',
        type: 'get',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            var sel = $("#add_city_current");
            for (var i=0; i<data.length; i++){
                sel.append("<option value='"+data[i][0]+"' disabled>"+data[i][1]+"</option>");
            }
            console.log(data);
        }
    });
}

function editSchoolModal(id) {
    //витягнути інфу про школу з заданим ід
    //записати всі значення у поля value
}