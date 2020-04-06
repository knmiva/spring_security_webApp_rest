//GET edit
$(document).ready(function () {
    edituser(id);
});

function edituser(id) {
    $.ajax({
        url: 'admin/users/edit/rest/' + id,
        method: 'GET',
        success: function (editData) {
            $('#modal-title').text('Edit user: ' + editData.username);
            $('#modalEditId').val(editData.id);
            $('#modalEditUsername').val(editData.username);
            //пустая строка для ввода нового пароля
            var emptyPassword = '';
            $('#modalEditNewPassword').val(emptyPassword);

            var editUserString = JSON.stringify(editData);
            $('#edit-all-roles').empty();
            //передаем объект юзера в виде строки чтобы достать чекбоксы с галками
            getallrolesformodal(editUserString);
        },
        error: function (error) {
            alert(error);
        }
    });
}

//PUT edit
$('#btnSaveEdit').click(function () {
    //валидируем форму Edit
    if ($('#modalEditUsername').val().length < 3) {
        $('#warningEditUsername').text("Username not valid").show().fadeOut(2000);
    } else if (($('input[type="checkbox"]:checked')).length < 1) {
        $('#warningEditRoles').text("Roles not valid").show().fadeOut(2000);
    } else {
        //формируем JSON
        var editUser = {};
        editUser.id = $('#modalEditId').val();
        editUser.username = $('#modalEditUsername').val();
        editUser.password = $('#modalEditNewPassword').val();
        editUser.roles = getcheckedroles();
        $.ajax({
            url: "admin/users/edit/rest",
            method: 'PUT',
            data: JSON.stringify(editUser),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                var table = $('#users-table');
                table.empty();
                $('#exampleModal').modal('hide');
                $('#nav-allusers-tab').tab('show');
                getallusers();
                //очищаем чекбоксы тк функция вызывается двумя объектами (Add and Edit) и роли в JSON добавляются
                $('#edit-all-roles').empty();
            },
            error: function (error) {
                alert(error);
            }
        })
    }
});