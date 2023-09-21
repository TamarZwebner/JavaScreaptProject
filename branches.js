//פתיחת ההרשמה
const Loginid = document.querySelector('#Loginid');
const formlogin = document.querySelector('#formlogin');
Loginid.onclick = () => {
    formlogin.classList.remove('onclickLogin1');
    formlogin.classList.add('onclickLogin');
}

//סגירת ההרשמה
const closeButton = document.querySelector('#closeButton');
closeButton.onclick = () => {
    formlogin.classList.remove('onclickLogin');
    formlogin.classList.add('onclickLogin1');
}
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const nameOfUser = document.querySelector('#nameOfUser');


const updateUserName = () => {
    nameOfUser.innerHTML = currentUser?.username || "אורח";
}
updateUserName();

const form = document.querySelector('#formToLogin');


form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries([...formData.entries()]);
    let users = localStorage.getItem('users');
    let usersArray = JSON.parse(users) || [];
    let thisUser = usersArray.find(u => u.username == user.username && u.password == user.password);
    if (thisUser) {
        localStorage.setItem("currentUser", JSON.stringify(thisUser));
        currentUser = thisUser;
        updateUserName();
        formlogin.classList.remove('onclickLogin');
        formlogin.classList.add('onclickLogin1');
    } else {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        setTimeout(function () {
            location.href = "/enrollment.html";
        }, 4000);

    }
}