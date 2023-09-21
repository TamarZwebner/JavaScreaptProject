const changeImg = document.querySelector('#alternate');
const InchangeImg = document.querySelector('#thisPageImg');
const ChangeOnClick = document.querySelector('#startclick');
const ChangeOnClickend = document.querySelector('#endclick');
const overMenu = document.querySelectorAll('.over');
const ImageDiv = document.createElement('div');
const Imageh1 = document.createElement('h1');
const Imagep = document.createElement('p');
const Imageha = document.createElement('a');
const ImageILeft = document.createElement('i');
const ImageIRight = document.createElement('i');
const categoryImage = document.createElement('img');
const ourPamparing = document.querySelector('#ourPamparing');
const divRight = document.createElement('div');
const divcenter = document.createElement('div');
const divLeft = document.createElement('div');

const catoriesContainer = document.querySelector('#categoryImagesInHtml');


let index = 0;

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const nameOfUser = document.querySelector('#nameOfUser');


const updateUserName = () => {
    nameOfUser.innerHTML = currentUser?.username || "אורח";
}
updateUserName();
//שליפה מהגייסון
const fetchStoreData = () => {
    fetch('/Project.json')
        .then(response => {
            return response.json();
        }).then(data => {
            ImgChangeInKey(data.alternateImage);
            forward(data.alternateImage);
            backwards(data.alternateImage);
            dataCategory.products = data.alternateImage;
        })
};
fetchStoreData();

const dataCategory = {
    products: []
};


//טעינת התמונה המתחלפת מיד עם טעינת העמוד
const ImgChangeInKey = (alternateImage) => {
    categoryImage.src = `/image/${alternateImage[0].image}`;
    ImageIRight.classList.add('fas');
    ImageIRight.classList.add('fa-angle-right');
    ImageIRight.onclick = () => { backwards(dataCategory.products); };
    ImageILeft.classList.add('fas');
    ImageILeft.classList.add('fa-angle-left');
    ImageILeft.onclick = () => { forward(dataCategory.products); };
    Imageh1.innerHTML = alternateImage[0].h1;
    Imagep.innerHTML = alternateImage[0].text;
    Imageha.href = alternateImage[0].link;
    Imageha.innerHTML = alternateImage[0].linktext;
    Imageha.href = `${alternateImage[0].link}`;
    ImageDiv.classList.add('thisPageImg');
    ImageDiv.classList.add('color' + 0);
    divRight.classList.add('flexAlternate');
    divLeft.classList.add('flexAlternate');
    divcenter.classList.add('center');
    divRight.append(ImageIRight);
    divcenter.append(Imageh1);
    divcenter.append(Imagep);
    divcenter.append(Imageha);
    divLeft.append(ImageILeft);
    ImageDiv.append(divRight);
    ImageDiv.append(divcenter);
    ImageDiv.append(divLeft);
    changeImg.append(ImageDiv);
    changeImg.append(categoryImage);
}

//החלפת התמונה המתחלפת לכיוון קדימה
const forward = (alternateImage) => {
    if (index < alternateImage.length - 1) {
        index++;
    }
    categoryImage.src = `/image/${alternateImage[index].image}`;
    Imageh1.innerHTML = alternateImage[index].h1;
    Imagep.innerHTML = alternateImage[index].text;
    Imageha.href = alternateImage[index].link;
    Imageha.innerHTML = alternateImage[index].linktext;
    Imageha.href = `${alternateImage[index].link}`;
    ImageDiv.classList.remove('color' + (index - 1));
    ImageDiv.classList.add('color' + index);
    ImageDiv.classList.add('Moveright');
}

//החלפת התמונה המתחלפת לכיוון אחורה
const backwards = (alternateImage) => {
    if (index > 0) {
        index--;
    }
    categoryImage.src = `/image/${alternateImage[index].image}`;
    Imageh1.innerHTML = alternateImage[index].h1;
    Imagep.innerHTML = alternateImage[index].text;
    Imageha.innerHTML = alternateImage[index].linktext;
    Imageha.href = `${alternateImage[index].link}`;
    ImageDiv.classList.remove('color' + (index + 1));
    ImageDiv.classList.add('color' + index);
    ImageDiv.classList.add('Moveleft');
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



const fetchProductsInProject = () => {
    fetch('/products.json')
        .then(response => {
            return response.json();
        }).then(data => {
            printProductsInProject(data.p);
        })
};
fetchProductsInProject();


const printProductsInProject = (products) => {
    products.forEach((product) => {
        if (product.cate === "5") {
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
            ourPamparing.append(productDiv);
            ourPamparing.classList.add('DivourPamparing');
        }
    })
}



