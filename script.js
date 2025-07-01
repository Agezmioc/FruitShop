let products =[
    { name: 'Banana', price: 5, image: 'https://cdn-icons-png.freepik.com/512/3313/3313721.png?ga=GA1.1.724132260.1751382087'},
    { name: 'Manzana', price: 3, image: 'https://cdn-icons-png.freepik.com/512/3313/3313723.png?ga=GA1.1.724132260.1751382087'},
    { name: 'Naranja', price: 2.5, image: 'https://cdn-icons-png.freepik.com/512/3313/3313710.png?ga=GA1.1.724132260.1751382087'}
];

let cart = JSON.parse(localStorage.getItem('Cart')) ?? [];

const divProdList = document.getElementById('ProdList');

function getCartItem(product) {
    return cart.find(item => item.product.name === product.name);
}

function renderProductList() {
    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("prodDiv");

        const img = document.createElement("img");
        img.src = product.image;

        const info = document.createElement("div");
        info.classList.add("prodInfo");

        const pName = document.createElement("p");
        pName.textContent = `Nombre: ${product.name}`;

        const pPrice = document.createElement("p");
        pPrice.textContent = `Precio: $${product.price}`;
        
        const existingItem = getCartItem(product);
        let prodQuantity = existingItem?.quantity ?? 0;
        const lblWrapper = document.createElement("p");
        lblWrapper.innerText = "Cantidad: ";

        const inputQuant = document.createElement("input");
        inputQuant.type = "number";
        inputQuant.inputMode = "numeric";
        inputQuant.min = 0;
        inputQuant.value = prodQuantity;
        inputQuant.classList.add("lblProdQuantInput");
        
        function updateDetail() {
            const cartItem = getCartItem(product);
            if (prodQuantity !== 0) {
                if (cartItem) {
                    cartItem.quantity = prodQuantity;
                } else {
                    cart.push({product, quantity: prodQuantity});
                }
                localStorage.setItem('Cart', JSON.stringify(cart));
            } else if (cartItem) {
                const index = getCartItem(product);
                cart.splice(index, 1);
                localStorage.setItem('Cart', JSON.stringify(cart));
            }
            DetailCreator(cart);
            toggleCalcVisibility();
        }

        inputQuant.addEventListener("input", () => {
            const val = parseInt(inputQuant.value);
            prodQuantity = isNaN(val) || val < 0 ? 0 : val;
            updateDetail();
        });

        inputQuant.addEventListener('keydown', (e) => {
            if (
                !(
                    (e.key >= '0' && e.key <= '9') ||
                    e.key === 'Backspace' ||
                    e.key === 'Delete' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Tab'
                )
            ) {
                e.preventDefault();
            }
        });

        inputQuant.addEventListener('focus', (e) => {
            e.target.select();
        });

        const btnRmvFromCart = document.createElement("button");
        btnRmvFromCart.innerText = 'Remover del carrito';
    
        btnRmvFromCart.addEventListener("click", () => {
            prodQuantity = 0;
            inputQuant.value = 0;
            const index = cart.findIndex(item => item.product.name === product.name);
            if (index !== -1) {
                cart.splice(index, 1);
                localStorage.setItem('Cart', JSON.stringify(cart));
            }
            if (cart.length === 0) {
                localStorage.removeItem('Cart');
            }
            DetailCreator(cart);
            toggleCalcVisibility();
        })

        div.appendChild(img);
        div.appendChild(info);
        info.appendChild(pName);
        info.appendChild(pPrice);
        info.appendChild(lblWrapper);
        info.appendChild(btnRmvFromCart);
        lblWrapper.appendChild(inputQuant);
        divProdList.appendChild(div);
    })
}

const divCalc = document.createElement("div");
divCalc.classList.add("calcDiv");

function toggleCalcVisibility() {
    divCalc.style.display = cart.length === 0 ? "none" : "block";
    if (cart.length === 0) {
        localStorage.removeItem('Cart');
    }
}

const pCalcDetail = document.createElement("p");
pCalcDetail.classList.add("calcDetailText");

const calcDetail = (list, id) => list[id].product.price*list[id].quantity;

function calcTotal(list) {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        total = total + calcDetail(list, i);
    }
    return total;
}

function subDetailCreator(list) {
    const orderedList = [...list].sort((a, b) => {
        return a.product.name.localeCompare(b.product.name);
    });
    let detailText = [];
    for (let i = 0; i < orderedList.length; i++) {
        if (orderedList[i].quantity > 0) {
            detailText.push(`\n\-${orderedList[i].product.name} x ${orderedList[i].quantity} :   $${calcDetail(orderedList, i)}`);
        }
    }
    return detailText.join('');
}

function DetailCreator(list) {
    if(list.length === 0){
        pCalcDetail.innerText = '';
    } else {
        pCalcDetail.innerText = `Detalle:${subDetailCreator(list)}
        
            Total: $${calcTotal(list)}`;
    }
    
}

const btnDelCart = document.createElement("button");
btnDelCart.innerText = 'Eliminar Carrito';

btnDelCart.addEventListener("click", () => {
    cart = [];
    localStorage.removeItem('Cart');
    divProdList.innerHTML = '';
    renderProductList();
    DetailCreator(cart);
    toggleCalcVisibility();
})

renderProductList();
DetailCreator(cart);
toggleCalcVisibility();

const main = document.querySelector('main')

main.appendChild(divCalc);
divCalc.appendChild(pCalcDetail);
divCalc.appendChild(btnDelCart);