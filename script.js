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
        const lblProdQuant = document.createElement("p");
        lblProdQuant.classList.add("lblProdQuant");
        function updateQuantText() {
            lblProdQuant.textContent = `Cantidad: ${prodQuantity}`;
        }
        updateQuantText();

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
    
        const btnProdAdd = document.createElement("button");
        btnProdAdd.innerText = '+';
        const btnProdSub = document.createElement("button");
        btnProdSub.innerText = '-';
    
        btnProdAdd.addEventListener('click', function() {
            prodQuantity++;
            updateQuantText();
            updateDetail()
        });
    
        btnProdSub.addEventListener('click', function() {
            if(prodQuantity>0){
                prodQuantity--;
                updateQuantText();
            }
            updateDetail()
            if (cart.length === 0) {
                localStorage.removeItem('Cart');
            }
        });
    
        const btnRmvFromCart = document.createElement("button");
        btnRmvFromCart.innerText = 'Remover del carrito';
    
        btnRmvFromCart.addEventListener("click", () => {
            prodQuantity = 0;
            updateQuantText();
            const index = cart.findIndex(item => item.product.name === product.name);
            if (index !== -1) {
                cart.splice(index, 1);
                localStorage.setItem('Cart', JSON.stringify(cart));
                console.log(cart);
            }
            if (cart.length === 0) {
                localStorage.removeItem('Cart');
            }
            DetailCreator(cart);
        })
        
        div.appendChild(lblProdQuant);
        div.appendChild(btnProdAdd);
        div.appendChild(btnProdSub);
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

document.body.appendChild(divCalc);
divCalc.appendChild(btnDelCart);
divCalc.appendChild(pCalcDetail);

renderProductList();
DetailCreator(cart);