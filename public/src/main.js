




// remove empty row

$(document).on('click', ".clearPassword", function () {
    $('td').prop('readonly', 'true');
});

// delete password

$(document).ready(function () {
    $('.deletePassword').on('click', deletePassword);
});

function deletePassword() {
    let confirmation = confirm('ARE YOU SURE?');
    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/delete/' + $(this).data('id')
        }).done(function (response) {
            window.location.replace('dashboard');
            console.log('Successfully deleted');
        });
    } else {
        return false;
    }
}
