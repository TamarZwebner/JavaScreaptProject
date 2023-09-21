const searchBy = document.querySelector('input[name=searchBoutton]');
const categoryImagesInJs = document.querySelector('#categoryImagesInHtml');
const searchP = new URLSearchParams(location.search);

const categoryCp = searchP.get('code');


const fetchProduct = () => {
    fetch('/products.json')
        .then(response => {
            return response.json();
        }).then((data) => {
            dataCategory.products = data.p;
        })
};

fetchProduct();

const dataCategory = {
    products: []
};

searchBy.onkeyup = searchBy.onchange = (event) => {
    printProduct(dataCategory.products);
};


const printProduct = (products) => {
    categoryImagesInJs.innerHTML = '';
    const searchArr = products.filter(pr => pr.name.includes(searchBy.value));
    searchArr.forEach((item) => {
        if (categoryCp === item.cate || categoryCp === item.category) {
            const productDiv = document.createElement('div');
            const productImage = document.createElement('img');
            productImage.src = `/image/${item.img}`;
            const productContainer = document.createElement('h2');
            productContainer.innerHTML = item.name;
            const productPrice = document.createElement('span');
            productPrice.innerHTML = `${item.price} ש"ח `;
            const toBuy = document.createElement('a');
            toBuy.href = `product.html?codeP=${item.codeP}`;
            toBuy.innerHTML = 'לקניה > ';
            productDiv.append(productImage);
            productDiv.append(productContainer);
            productDiv.append(productPrice);
            productDiv.append(toBuy);
            productDiv.classList.add('productView');
            categoryImagesInJs.append(productDiv);
        }
    })

}
