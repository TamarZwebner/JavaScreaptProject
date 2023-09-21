
const thePrice=document.querySelector('#ThePrice2');
const fetchPackage = () => {
    fetch('/products.json')
        .then(response => {
            return response.json();
        }).then(data => {
            printPackage(data.p);
        })
};

fetchPackage();

const printPackage=(product)=>{
    let sum=0;
    let packages =JSON.parse(localStorage.getItem(`package_${currentUser.username}_${currentUser.password}`)) || [];
    let index1=0;
    packages.forEach((item)=>{
        let p=item.codeP;
        product.forEach((pr)=>{
            if(p===pr.codeP){
                const InBagColumn=document.createElement('div');
                const AllInTheBag=document.querySelector('#AllInTheBag');
                const DivinTheBag1=document.createElement('div'); 
                const DivinTheBag2=document.createElement('div');             
                const ImgInPackage=document.createElement('img');
                const spanInPackage=document.createElement('span');
                const index=document.createElement('span');
                index.innerHTML=index1;
                spanInPackage.innerHTML='הסר';
                spanInPackage.classList.add('pointer');
                const iconSpan=document.createElement('span');
                iconSpan.classList.add('fas');
                iconSpan.classList.add('fa-times-circle');
                iconSpan.classList.add('IconSpan');
                spanInPackage.append(iconSpan);
                spanInPackage.onclick=()=>{spanInPackageOnClick(packages,index.innerHTML);};
                ImgInPackage.src=`/image/${pr.img}`;
                const NameInPackage=document.createElement('h4');
                NameInPackage.innerHTML=pr.name;
                const PriceInPackage = document.createElement('span');
                PriceInPackage.innerHTML = `${pr.price} ש"ח `;
                const amountInPackage = document.createElement('span');
                amountInPackage.innerHTML = ` כמות: ${item.amount}`;
                sum=sum+(JSON.parse(pr.price)*JSON.parse(item.amount));
                DivinTheBag1.append(ImgInPackage);
                DivinTheBag2.append(NameInPackage);
                DivinTheBag2.append(PriceInPackage);
                DivinTheBag2.append(amountInPackage);
                DivinTheBag2.append(spanInPackage);
                InBagColumn.append(DivinTheBag1);
                InBagColumn.append(DivinTheBag2);
                AllInTheBag.append(InBagColumn);
                InBagColumn.classList.add('row');
                DivinTheBag2.classList.add('row');
                AllInTheBag.classList.add('column');
            }
        })
        index1++;
    })
    ThePrice2.innerHTML=`סה"כ: ${sum} ש"ח`;
}


let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const nameOfUser = document.querySelector('#nameOfUser');



const updateUserName = () => {
    nameOfUser.innerHTML = currentUser?.username || "אורח";
}
updateUserName();
const spanInPackageOnClick=(package,index)=>{
    package.splice(index, 1);
    localStorage.setItem(`package_${currentUser.username}_${currentUser.password}`, JSON.stringify(package));
    updateUserName();
    location.href="bag.html";
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
        location.href="bag.html";
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