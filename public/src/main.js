
//add password
// $(document).ready( function addPassword(){
//     $(".addPasswordButton").click( () => {
//         var site = $("#site").val();
//         var username = $("#username").val();
//         var password = $("#password").val();
//         var markup = "<tr id='td'><form method='POST' action='/passwords/add'><td><input type='input' id='site'>" + "</td><td><input type='input' id='username'>" + "</td><td><input type='input' id='password'>" + "</td><td><a href='#'><i class='fas fa-check fa-lg icon-margin icon-green savePassword'></i></a>" + "<a href='#'><i class='fas fa-times fa-lg icon-margin icon-red clearPassword'></i></a>" + "</td></form></tr>";
//         $("table tbody > tr").eq(0).before(markup);
//         $(".addPasswordButton").hide();
//     });
    
// });

// add password

const addPassword = document.getElementById(addPasswordButton);
addPassword.addEventListener('click', addPassword );

function addPassword(){
    
};


$(document).ready(function () { 
    $(document).on("click", ".savePassword" , function() {
        let user_site=$("#site").val();
        let user_name=$("#username").val();
        let user_password=$("#password").val();
        
        $.ajax({
            type: 'POST',
            url: '/passwords/add/',
            data : { site: user_site , username: user_name, password: user_password},
        }).done(function (res) {
            window.location.replace('dashboard');
        });
    });
});

// edit password

$(document).ready(function () {
   $('.editPassword').on('click', editPassword);  
});

function editPassword() {
    let site = $(this).attr("data-id");
    let username = 'td:eq(1)';
    let password = 'td:eq(2)';
    let tick = 'td:eq(3)';
    let id = site;

        $(this).closest('tr').children('' + site + ', ' + username + ', ' + password + '').each(function () {
            let value = $(this).text();
            $(this).attr('contenteditable', 'true');
            //var input = id.username;
            var input = $('<input type="text" value=" ' + value + ' " id=" ' + id + ' "/>');
            $(this).html(input).val(value);
            $(tick).html('<a href="#"> <i class="fas fa-check fa-lg icon-margin icon-green updatePassword"></i></a><a href="#"><i class="fas fa-times fa-lg icon-margin icon-red cancelUpdatePassword"></i></a >');
            readonly = true;
            $(".addPasswordButton").hide();
        });

        $(document).on('click', ".cancelUpdatePassword", function (value) {

        });
    }

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
