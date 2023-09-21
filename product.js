const oneProduct = document.querySelector('#oneProduct');
const tytle = document.querySelector('#tytle');

const searchParams = new URLSearchParams(location.search);

const productCode = searchParams.get('codeP');

//שליפה מהגייסון- מוצר בודד
const fetchProducts = () => {
    fetch('/products.json')
        .then(response => {
            return response.json();
        }).then(data => {
            printProduct(data.p);
        })
};

fetchProducts();

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

const addProductToPackage = (product) => {
    if (currentUser) {
        const currentPackage = JSON.parse(localStorage.getItem(`package_${currentUser.username}_${currentUser.password}`)) || [];
        const currentProduct = currentPackage.find(p => p.codeP === product.codeP);
        if (currentProduct) {
            currentProduct.amount++;
        } else {
            currentPackage.push({
                codeP: product.codeP,
                amount: 1,
                product,
            });
        }
        localStorage.setItem(`package_${currentUser.username}_${currentUser.password}`, JSON.stringify(currentPackage));
    }
    else {
        location.href = "/enrollment.html";
    }
    DivUp.classList.remove('down');
    DivUp.classList.add('Up');
    setTimeout(function () {
        DivUp.classList.remove('Up');
        DivUp.classList.add('down');
    }, 2500);
    DivUp.classList.remove('down');
    DivUp.classList.add('Up');
    setTimeout(function () {
        history.back();
    }, 3000);
}
const DivUp = document.querySelector('#DivUp');
const printProduct = (products) => {
    const product = products.find(pr => pr.codeP === productCode);
    const OneH1 = document.createElement('h1');
    OneH1.innerHTML = product.name;
    const OneA = document.createElement('a');
    OneA.innerHTML = `בחר תאריך וכתובת למשלוח >`;
    const OneImg = document.createElement('img');
    OneImg.src = `/image/${product.img}`;
    const OneSpan = document.createElement('span');
    OneSpan.innerHTML = ` סה"כ לתשלום: ${product.price} ש"ח `;
    const OneSpanPrice = document.createElement('span');
    OneSpanPrice.innerHTML = ` הנחה למזמינים באתר: ${product.price - ((product.price / 100) * 5)} ש"ח `;
    const OneAToBuy = document.createElement('button');
    OneAToBuy.type = "button";
    OneAToBuy.innerHTML = `הוסף לסל  >`;
    OneAToBuy.onclick = () => { addProductToPackage(product); };
    OneAToBuy.classList.add('BuyNow');
    tytle.innerHTML = `${product.name} ZER4U`;
    oneProduct.append(OneH1);
    oneProduct.append(OneA);
    oneProduct.append(OneImg);
    oneProduct.append(OneSpan);
    oneProduct.append(OneSpanPrice);
    oneProduct.append(OneAToBuy);
}


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
