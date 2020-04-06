//GET all unchecked roles from server for Add page (показываем роли с сервера на странице добавления юзера)
//$(document).ready(function () {
$('#nav-adduser-tab').click(function () {
    $('#add-all-roles').empty();
    getallrolesforadd();

//получаем все роли (unchecked чекбоксы) с сервера для Add
function getallrolesforadd() {
    var roleRow = '';
    $.getJSON("admin/users/roles/rest", function (data) {
        $.each(data, function (key, value) {
            roleRow += '<div class="form-check-inline">';
            roleRow += '<label class="form-check-label">';
            roleRow += '<input type="checkbox" ';
            roleRow += 'id="' + value.id + '" value="' + value.name + '" class="form-check-input">' + value.name + ''; //убрал chbRole у id
            roleRow += '</label>';
            roleRow += '</div>';
        });
        $('#add-all-roles').append(roleRow);
    });

}
});