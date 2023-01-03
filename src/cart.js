let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let basket = JSON.parse(localStorage.getItem("data")) || [];
// It's here to pull data from the Local storage


let calculation = () => {
    let cartIcon = document.getElementById("cart-count");
    cartIcon.innerText = basket.map((x) => x.quantity).reduce((x,y) => x + y, 0);
    
    //x and y one of them is the previous number and the other one is the next, ex: const sumWithInitial = array1.reduce((accumulator, currentValue) => accumulator + currentValue,initialValue.
   };
   
   calculation();

   let generateCartItems = () => {
    if(basket.length !== 0){
     return (shoppingCart.innerHTML = basket
      .map((x) => {
        let {id, quantity } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
        <div class="cart-item">
          <img width= 100px src= ${search.img}>

          <div class="details">
          <div class="title-price-x">
          <h4 class="title-price-x">
          <p>${search.name}</p>
          <p>$ ${search.price}</p>
          </h4>
          <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
          </div>
          <div class ="buttons"> 
          <button style="padding:0; border:0; background:transparent;" onclick="decrement('${id}')" class="bi bi-dash"></button>
            <div id=${id} class="quantity">${quantity}</div>
            <i onclick="increment('${x.id}')" class="bi bi-plus"></i>
            </div>
         
          <h3>$ ${quantity*search.price}</h3>
          </div>
        </div>
        `
     }).join(""));
    }else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
          <h2>Cart is Empty</h2>
          <a href="index.html">
          <button class="HomeBtn">Back to home</button>
          </a>
        `;
    }
   };

   generateCartItems();

   function increment(id) {

    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search == undefined) {
        basket.push({
            id: selectedItem,
            quantity: 1
        })

    }
    else {
        search.quantity += 1

    }

    generateCartItems();
    update(id)
    localStorage.setItem("data", JSON.stringify(basket))

};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === id);
   
    if (search == undefined) {}
   else if (search.quantity === 1) {
    basket = basket.filter(x=>x.id !== selectedItem)
    localStorage.setItem("data", JSON.stringify(basket))
    document.getElementById(id).innerHTML = 0;
    removeItem(id)

    }
    else {
            search.quantity -= 1
        }

 
update(id)
//basket = basket.filter(x=>x.quantity !== 0); target all the object one by one, the function will remove the object with a 0 quantity.

generateCartItems();
localStorage.setItem("data", JSON.stringify(basket));
};


let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.quantity;
    calculation()
}


let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));

};

let totalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((x) => {
            let {quantity, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];

            return quantity * search.price;
        }).reduce((x,y) => x+y,0);

        label.innerHTML = `
        <h2>Total: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button class="removeAll">Clear Cart</button>
        `
     console.log(amount)

    }else return
};

totalAmount ();