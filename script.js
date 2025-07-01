let products =[
    { name: 'Banana', price: 5},
    { name: 'Manzana', price: 3},
    { name: 'Naranja', price: 2.5}
];

let cart = JSON.parse(localStorage.getItem('Cart')) ?? [];

const divProdList = document.getElementById('ProdList');

function getCartItem(product) {
    return cart.find(item => item.product.name === product.name);
}

function renderProductList() {
    products.forEach((product) => {
        const div = document.createElement("div");
    
        div.innerHTML = `
            <img src="${product.image}" /> 
            <p>Nombre: ${product.name} </p> 
            <p>Precio: $${product.price} </p>
        `;
        
        const existingItem = getCartItem(product);
        let prodQuantity = existingItem?.quantity ?? 0;
        const lblWrapper = document.createElement("label");
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
                const index = cart.indexOf(product);
                cart.splice(index, 1);
                localStorage.setItem('Cart', JSON.stringify(cart));
            }
            DetailCreator(cart);
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
        })
        
        lblWrapper.appendChild(inputQuant);
        div.appendChild(lblWrapper);
        div.appendChild(btnRmvFromCart);
        divProdList.appendChild(div);
    })
}

const divCalc = document.createElement("div");

const pCalcDetail = document.createElement("p");

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
            detailText.push(`\n\-${orderedList[i].product.name} x ${orderedList[i].quantity} :   ${calcDetail(orderedList, i)}`);
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
})

renderProductList();
DetailCreator(cart);

document.body.appendChild(divCalc);
divCalc.appendChild(btnDelCart);
divCalc.appendChild(pCalcDetail);