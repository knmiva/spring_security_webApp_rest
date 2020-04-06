//DELETE user
$(document).ready(function () {
    $('#btnDeleteUser').click(function () {
        deleteuser();
    });

    function deleteuser(id) {
        $.ajax({
            url: 'admin/users/delete/rest/' + id,
            method: 'DELETE',
            success: function () {
                //стираем таблицу и заново отображаем всех юзеров
                var table = $('#users-table');
                table.empty();
                getallusers();
            },
            error: function (error) {
                alert(error);
            }
        })
    }
});