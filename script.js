let products =[
    { id: 'prod1', name: 'Banana', price: 5},
    { id: 'prod2', name: 'Manzana', price: 3},
    { id: 'prod3', name: 'Naranja', price: 2.5}
];

let cart = [];

const divProdList = document.getElementById('ProdList');

products.forEach((product) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <img src="${product.image}" /> 
        <p>Nombre: ${product.name} </p> 
        <p>Precio: $${product.price} </p>
    `;

    const btnProdAdd = document.createElement("button");
    btnProdAdd.innerText = '+';
    const btnProdSub = document.createElement("button");
    btnProdSub.innerText = '-';

    let prodQuantity = 0;
    const lblProdQuant = document.createElement("p");
    lblProdQuant.textContent = `Cantidad: 0`;

    btnProdAdd.addEventListener('click', function() {
        prodQuantity++;
        lblProdQuant.textContent = `Cantidad: ${prodQuantity}`;
    });

    btnProdSub.addEventListener('click', function() {
        if(prodQuantity>0){
            prodQuantity--;
            lblProdQuant.textContent = `Cantidad: ${prodQuantity}`;
        }
    });

    const button = document.createElement("button");
    button.innerText = 'Agregar al carrito';

    button.addEventListener("click", () => {
        const existingItem = cart.find(item => item.product === product);
        if (prodQuantity !== 0) {
            if (existingItem) {
                existingItem.quantity = prodQuantity;
            } else {
                cart.push({product, quantity: prodQuantity});
            }
        } else if (existingItem) {
            const index = cart.indexOf(product)
            cart.splice(index, 1)
        }
    })
    
    div.appendChild(lblProdQuant)
    div.appendChild(btnProdAdd)
    div.appendChild(btnProdSub)
    div.appendChild(button)
    divProdList.appendChild(div)
})

/* 
const prodLabel = (list, id) => `${list.find(element => element.id === id).name}: $${list.find(element => element.id === id).price} c/u, cantidad:`;

const lblProd1 = document.getElementById('Prod1')
lblProd1.textContent = prodLabel(products, 'prod1');
const lblProd2 = document.getElementById('Prod2')
lblProd2.textContent = prodLabel(products, 'prod2');
const lblProd3 = document.getElementById('Prod3')
lblProd3.textContent = prodLabel(products, 'prod3');

const lblProd1Quant = document.getElementById('Prod1Quant')
const btnProd1Add = document.getElementById('Prod1Add');
const btnProd1Sub = document.getElementById('Prod1Sub');

btnProd1Add.addEventListener('click', function() {
    products[0].quantity++;
    console.log(products[0].quantity);
    lblProd1Quant.textContent = products[0].quantity;
});

btnProd1Sub.addEventListener('click', function() {
    if(products[0].quantity>0){
        products[0].quantity--;
        console.log(products[0].quantity);
        lblProd1Quant.textContent = products[0].quantity;
    }
});

const lblProd2Quant = document.getElementById('Prod2Quant');
const btnProd2Add = document.getElementById('Prod2Add');
const btnProd2Sub = document.getElementById('Prod2Sub');


btnProd2Add.addEventListener('click', function() {
    products[1].quantity++;
    console.log(products[1].quantity);
    lblProd2Quant.textContent = products[1].quantity;
});

btnProd2Sub.addEventListener('click', function() {
    if(products[1].quantity>0){
        products[1].quantity--;
        console.log(products[1].quantity);
        lblProd2Quant.textContent = products[1].quantity;
    }
});

const lblProd3Quant = document.getElementById('Prod3Quant');
const btnProd3Add = document.getElementById('Prod3Add');
const btnProd3Sub = document.getElementById('Prod3Sub');
let prod3Quant = 0;

btnProd3Add.addEventListener('click', function() {
    products[2].quantity++;
    console.log(products[2].quantity);
    lblProd3Quant.textContent = products[2].quantity;
});

btnProd3Sub.addEventListener('click', function() {
    if(products[2].quantity>0){
        products[2].quantity--;
        console.log(products[2].quantity);
        lblProd3Quant.textContent = products[2].quantity;
    }
});

const btnCalculate = document.getElementById('Calculate');
const btnCustom = document.getElementById('Custom')
const btnReset = document.getElementById('Reset');

const calcDetail = (list, id) => list[id].price*list[id].quantity;

function calcTotal(list) {
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        total = total + calcDetail(list, i);
    }
    return total;
}

const showResult = () => alert(`Detalle:${detailCreator(products)}
        
        Total: $${calcTotal(products)}
        `);

function detailCreator(list) {
    let detailText = [];
    for (let i = 0; i < list.length; i++) {
        if (products[i].quantity > 0) {
            detailText.push(`\n\-${list[i].name} x ${list[i].quantity} :   ${calcDetail(list, i)}`);
        }
    }
    return detailText.join('');
}

btnCalculate.addEventListener('click', function() {
    if(calcTotal(products)>0) {
        showResult();
    }
});

btnCustom.addEventListener('click', function() {
    products[0].quantity=0;
    lblProd1Quant.textContent = products[0].quantity;
    products[1].quantity=0;
    lblProd2Quant.textContent = products[1].quantity;
    products[2].quantity=0;
    lblProd3Quant.textContent = products[2].quantity;
    let value;
    for (let i = 0; i < products.length; i++){
        value = parseFloat(window.prompt(`Ingrese la cantidad de ${products[i].name}s`));
        if (!Number.isNaN(value) && value>0){
            products[i].quantity=value;
        }
    }
    if(calcTotal(products)>0) {
        showResult();
    } else {
        alert("No se ha introducido ningún valor válido. Por favor, vuelva a intentarlo.")
    }
});

btnReset.addEventListener('click', function() {
    if (confirm("¿Está seguro de que desea reiniciar? Esto eliminará todos los datos del carrito.")) {
        products[0].quantity=0;
        lblProd1Quant.textContent = products[0].quantity;
        products[1].quantity=0;
        lblProd2Quant.textContent = products[1].quantity;
        products[2].quantity=0;
        lblProd3Quant.textContent = products[2].quantity;
    }
});
 */