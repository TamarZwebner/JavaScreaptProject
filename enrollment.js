const submitview = document.querySelector('#submitview');
const loginData = document.querySelector('#loginData');
const poneNumber = document.querySelector('input[name=poneNumber]');
const password = document.querySelector('input[name=password]');

loginData.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries([...formData.entries()]);
  let users = localStorage.getItem('users');
  let usersArray = JSON.parse(users) || [];

  usersArray.push(data);

  localStorage.setItem('users', JSON.stringify(usersArray));
  localStorage.setItem("currentUser", JSON.stringify(data));

  setTimeout(function () {
    history.back();
  }, 1000);
}


submitview.onclick = (event) => {
  const phone = poneNumber.value;
  if (phone < 99999999 || phone > 1000000000 ) {
    var popup = document.getElementById("myPopup1");
    popup.classList.toggle("show");
    event.preventDefault();
    setTimeout(function () {
      popup.classList.remove("show");
    }, 3000);
  }
  const pass = password.value;
  if (pass.length < 4 || pass.length > 8) {
    var popup2 = document.getElementById("myPopup2");
    popup2.classList.toggle("show");
    event.preventDefault();
    setTimeout(function () {
      popup2.classList.remove("show");
    }, 3000);
  }
}




