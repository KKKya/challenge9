var uName = document.getElementById('name');
var pw = document.getElementById('pw');


function store() {
    localStorage.setItem('name', uName.value);
    localStorage.setItem('pw', pw.value);
}


function check() {
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    if(userName.value == storedName && userPw.value == storedPw) {
        alert('Login successful!');
    } else {
        alert('Login failed, please try again.');
    }
}