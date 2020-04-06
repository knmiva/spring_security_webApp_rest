$(document).ready(function () {
    getcheckedroles();
});
//функция получения ролей (checked checkboxes) с форм Add и Edit
function getcheckedroles() {
    var roles = [];
    $.each($('input[type="checkbox"]:checked'), function () {
        var role = {};
        role.id = $(this).attr('id');
        role.name = $(this).attr('value');
        roles.push(role);
    });
    alert(JSON.stringify(roles));
    return roles;
}