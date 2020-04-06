/*$(document).ready(function () {
    getAllUsers();
});*/
//GET all users
getAllUsers();

//функция получения всех юзеров
    function getAllUsers() {
        $.getJSON("http://localhost:8080/admin/users/rest", function (data) {
            var userRow = '';
            var userId = '';
            $.each(data, function (key, value) {
                if (key = "id") {
                    userRow += '<tr>';
                    userRow += '<td>' + value.id + '</td>';
                    userId = value.id;
                }
                if (key = "username") {
                    userRow += '<td>' + value.username + '</td>';
                }
                if (key = "roles") {
                    var rolesObj = value.roles;
                    var rolesName = '';
                    $.each(rolesObj, function (key2, value2) {
                        if (key2 = "name") {
                            rolesName += value2.name + ';' + '&nbsp;&nbsp;&nbsp;';
                        }
                    });
                    userRow += '<td>' + rolesName + '</td>';
                }
                userRow += '<td><a class="btn btn-primary" id="btnEditUser' + value.id + '" data-toggle="modal" data-target=".bd-example-modal-md" onclick="edituser(' + value.id + ')" role="button">Edit</a></td>';
                userRow += '<td><a class="btn btn-primary" id="btnDeleteUser" onclick="deleteuser(' + value.id + ')" role="button">Delete</a>' + '</td>';
                userRow += '</tr>';
            });
            $('#users-table').append(userRow);
        });
    }


//GET all unchecked roles from server for Add page (показываем роли с сервера на странице добавления юзера)
$(document).ready(function () {
    $('#nav-adduser-tab').click(function () {
        $('#add-all-roles').empty();
        getAllRolesForAdd();
    });
//получаем все роли (unchecked чекбоксы) с сервера для Add
    function getAllRolesForAdd() {
        var roleRow = '';
        $.getJSON("http://localhost:8080/admin/users/roles/rest", function (data) {
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

//POST user
$('#btnAddUser').click(function () {
    //валидируем форму Add
    if ($('#inputAddUsername').val().length < 3) {
        $('#warningAddUsername').text("Username not valid").show().fadeOut(2000);
    } else if ($('#inputAddPassword').val().length < 3) {
        $('#warningAddPassword').text("Password not valid").show().fadeOut(2000);
    } else if ($('input[type="checkbox"]:checked').length < 1) {
        $('#warningAddRoles').text("Roles not valid").show().fadeOut(2000);
    } else {
        var addUser = {};
        addUser.username = $('#inputAddUsername').val();
        addUser.password = $('#inputAddPassword').val();
        addUser.roles = getCheckedRoles();
        $.ajax({
            url: 'http://localhost:8080/admin/users/add/rest/',
            method: 'POST',
            data: JSON.stringify(addUser),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                var table = $('#users-table');
                table.empty();
                $('#nav-allusers-tab').tab('show');
                getAllUsers();
                //очищаем форму Add
                $('#inputAddUsername').val('');
                $('#inputAddPassword').val('');
                //очищаем чекбоксы тк функция вызывается двумя объектами и роли в JSON добавляются
                $('#add-all-roles').empty();
            },
            error: function (error) {
                alert("error Add: " + error);
            }
        });
    }
});

//GET edit
function editUser(id) {
    $.ajax({
        url: 'http://localhost:8080/admin/users/edit/rest/' + id,
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
            getAllRolesForModal(editUserString);
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
    } else if (($('input[type="checkbox"]:checked')).length < 1) { //?????? УПРОСТИТЬ
        $('#warningEditRoles').text("Roles not valid").show().fadeOut(2000);
    } else {
        //формируем JSON
        var editUser = {};
        editUser.id = $('#modalEditId').val();
        editUser.username = $('#modalEditUsername').val();
        editUser.password = $('#modalEditNewPassword').val();
        editUser.roles = getCheckedRoles();
        $.ajax({
            url: "http://localhost:8080/admin/users/edit/rest",
            method: 'PUT',
            data: JSON.stringify(editUser),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                var table = $('#users-table');
                table.empty();
                $('#exampleModal').modal('hide');
                $('#nav-allusers-tab').tab('show');
                getAllUsers();
                //очищаем чекбоксы тк функция вызывается двумя объектами (Add and Edit) и роли в JSON добавляются
                $('#edit-all-roles').empty();
            },
            error: function (error) {
                alert(error);
            }
        })
    }
});

//DELETE user
function deleteUser(id) {
    $.ajax({
        url: 'http://localhost:8080/admin/users/delete/rest/' + id,
        method: 'DELETE',
        success: function () {
            //стираем таблицу и заново отображаем всех юзеров
            var table = $('#users-table');
            table.empty();
            getAllUsers();
        },
        error: function (error) {
            alert(error);
        }
    })
}



//получаем все роли (unchecked чекбоксы) для модалки и проставляем галки
function getAllRolesForModal(editUserString) {
    var roleRow = '';
    $.getJSON("http://localhost:8080/admin/users/roles/rest", function (data) {
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

//функция получения ролей (checked checkboxes) с форм Add и Edit
function getCheckedRoles() {
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

