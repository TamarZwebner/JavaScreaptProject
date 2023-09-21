const productsPackage=document.querySelector('#productsPackage');
const thePrice=document.querySelector('#thePrice');
const fetchPackage = () => {
    fetch('/products.json')
        .then(response => {
            return response.json();
        }).then(data => {
            printPackage(data.p);
        })
};

fetchPackage();

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

const printPackage=(product)=>{
    let sum=0;
    let packages =JSON.parse(localStorage.getItem(`package_${currentUser.username}_${currentUser.password}`)) || [];
    packages.forEach((item)=>{
        let p=item.codeP;
        product.forEach((pr)=>{
            if(p===pr.codeP){
                const DivInPackage=document.createElement('div'); 
                const Div1=document.createElement('div'); 
                const Div2=document.createElement('div');             
                const ImgInPackage=document.createElement('img');
                ImgInPackage.src=`/image/${pr.img}`;
                const NameInPackage=document.createElement('h4');
                NameInPackage.innerHTML=pr.name;
                const PriceInPackage = document.createElement('span');
                PriceInPackage.innerHTML = `${pr.price} ש"ח `;
                const amountInPackage = document.createElement('span');
                amountInPackage.innerHTML = ` כמות: ${item.amount}`;
                sum=sum+(JSON.parse(pr.price)*JSON.parse(item.amount));
                Div1.append(ImgInPackage);
                Div2.append(NameInPackage);
                Div2.append(PriceInPackage);
                Div2.append(amountInPackage);
                DivInPackage.append(Div1);
                DivInPackage.append(Div2);
                Div1.classList.add('pack1');
                Div2.classList.add('pack2');
                DivInPackage.classList.add('pack');
                productsPackage.append(DivInPackage);
            }
        })
    })
    thePrice.innerHTML=`${sum} ש"ח`;
}
/*const whiteBOnClick=document.querySelector('#whiteBOnClick');
whiteBOnClick.onclick=()=>{
    location.href='bag.html';
}
*/

