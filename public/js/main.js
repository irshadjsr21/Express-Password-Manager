// class hidden *****
// class show $password


// let passwordRow = document.getElementsByClassName('password');

// passwordRow.addEventListener('click', function() {
//     if(passwordRow.display === "none") {
//         passwordRow.display = "block";
//     }
//     const children = passwordRow.childNodes;
//     console.log(children);
// });


function togglePassword(id) {
    const passwordRows = document.getElementById(id).getElementsByClassName('row-data');
    for(const row of passwordRows) {
        if(row.className.includes('hidden')) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    }
} 