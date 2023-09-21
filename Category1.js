const categoryImagesInHtml = document.querySelector('#categoryImagesInHtml');
const tytleH1CategoryDiv = document.querySelector('#tytleH1Category');
const tytleH1Category = document.createElement('h1');
const OneImagesInHtml = document.querySelector('#OneImagesInHtml');
const tytle = document.querySelector('#tytle');

const searchParams = new URLSearchParams(location.search);

const categoryCode = searchParams.get('code');

//שליפה מהגייסון- קטגוריות
const fetchStoreData = () => {
    fetch('/Project.json')
        .then(response => {
            return response.json();
        }).then(data => {
            const AllCategories = data.alternateImage;
            FillCategory(AllCategories);
        })
};

fetchStoreData();


//שליפה מהגייסון- מוצרים
const fetchProducts = () => {
    fetch('/products.json')
        .then(response => {
            return response.json();
        }).then(data => {
            printProducts(data.p);
        })
};

fetchProducts();

const printProducts = (products) => {
    const arr = products.filter(pr => pr.category === categoryCode || pr.cate === categoryCode)
    arr.forEach((product) => {
        const productDiv = document.createElement('div');
        const productImage = document.createElement('img');
        productImage.src = `/image/${product.img}`;
        const productContainer = document.createElement('h2');
        productContainer.innerHTML = product.name;
        const productPrice = document.createElement('span');
        productPrice.innerHTML = `${product.price} ש"ח `;
        const toBuy = document.createElement('a');
        toBuy.href = `product.html?codeP=${product.codeP}`;
        toBuy.innerHTML = 'לקניה > ';
        productDiv.append(productImage);
        productDiv.append(productContainer);
        productDiv.append(productPrice);
        productDiv.append(toBuy);
        productDiv.classList.add('productView');
        categoryImagesInHtml.append(productDiv);
    })
}



const FillCategory = (arr) => {
    arr.forEach((arr1) => {
        if (categoryCode === arr1.code) {
            tytleH1Category.innerHTML = arr1.h1;
            tytle.innerHTML = `${arr1.h1} ZER4U`;
            tytleH1CategoryDiv.append(tytleH1Category);
        }
        arr1.tytle.forEach((arr2) => {
            if (arr2.code === categoryCode) {
                tytleH1Category.innerHTML = arr2.category;
                tytle.innerHTML = `${arr2.category} ZER4U`;
                tytleH1CategoryDiv.append(tytleH1Category);
            }
        })

    })
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



