$(document).ready(function () {
    getAllUsers();
});
//GET all users
//getAllUsers();

//функция получения всех юзеров
function getAllUsers() {
    $.getJSON("admin/users/rest", function (data) {
        var userRow = '';
        var userId = '';
        $.each(data, function (key, value) {
            if (key === "id") {
                userRow += '<tr>';
                userRow += '<td>' + value.id + '</td>';
                userId = value.id;
            }
            if (key === "username") {
                userRow += '<td>' + value.username + '</td>';
            }
            if (key === "roles") {
                var rolesObj = value.roles;
                var rolesName = '';
                $.each(rolesObj, function (key2, value2) {
                    if (key2 === "name") {
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
