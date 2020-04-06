$(document).ready(function () {
    getallrolesformodal();
});
//получаем все роли (unchecked чекбоксы) для модалки и проставляем галки
function getallrolesformodal(editUserString) {
    var roleRow = '';
    $.getJSON("admin/users/roles/rest", function (data) {
        $.each(data, function (key, value) {
            roleRow += '<div class="form-check-inline">';
            roleRow += '<label class="form-check-label">';
            roleRow += '<input type="checkbox" ';
            //проверяем роли с сервера и проставляем галки
            if (editUserString.includes(value.name)) {
                roleRow += 'checked';
            }
            roleRow += ' id="' + value.id + '" value="' + value.name + '" class="form-check-input">' + value.name + ''; //убрал chbRole у id
            roleRow += '</label>';
            roleRow += '</div>';
        });
        $('#edit-all-roles').append(roleRow);
    });
}