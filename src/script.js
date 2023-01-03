let shop = document.getElementById('shop');




// the or statement is to prevent the error in case we don't have data. 
let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {

    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;

        //this function is added to keep the quantity appearing in the ws even if it refreshed.
        let search = basket.find((x) => x.id === id) || []
        //It'll check for all the id one by one. the or statement command if we don't find anything return an empty array. 

        return `<div class="img-grid">
        <div id=product-id-${id} class="img-row"> 
             <a href="#" target="_blank" class="img-link">
             <img class="product-img" src="${img}"></a>
             <div class="heart-icon"><a href=""><i class="bi bi-heart"></i></a></div>
        </div>

        <div class="product-info">
            <a href="#" target="_blank" class="img-link">
            <p class="product-name">${name}</p></a>
            <div class="shop">
                <p class="price">${price}$</p>
            <div class ="buttons"> 
            <button style="padding:0; border:0; background:transparent;" onclick="decrement('${id}')" class="bi bi-dash"></button>
             <div id=${id} class="quantity">${search.quantity === undefined? 0: search.quantity}
             </div>
           <i onclick="increment('${x.id}')" class="bi bi-plus"></i>
            </div>
            </div>   
            </div>
    </div>`

    //If the search.quantity is equal to undefined than we return 0 (:)but if we find it we return search.quantity .
    }).join(""));
};

generateShop();

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

    
    update(id)
    localStorage.setItem("data", JSON.stringify(basket))

};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);
   
    if (search == undefined) {}
    else if (search.quantity === 1) {
        basket = basket.filter(x=>x.id !== selectedItem);
        localStorage.setItem("data", JSON.stringify(basket))
        document.getElementById(id).innerHTML = 0;

    }
    else {
            search.quantity -= 1
        }

 
update(id)

//basket = basket.filter(x=>x.quantity !== 0); target all the object one by one, the function will remove the object with a 0 quantity.


};


/*let update = (id,action) => { 
if(action =="increment"){
    let search = basket.find((x) => x.id === id);
    let cartcount= parseInt(document.getElementsByClassName('cart-count')[0].innerText)

    if (search == undefined) {
        document.getElementById(id).innerText=0
    }
    else {
        document.getElementsByClassName('bi-dash')[id[id.length-1]-1].disabled=false
        document.getElementById(id).innerText=search.quantity
        document.getElementsByClassName('cart-count')[0].innerText=cartcount+1
    }
}
else{
    let search = basket.find((x) => x.id === id);
    let cartcount= parseInt(document.getElementsByClassName('cart-count')[0].innerText)
    
    if (search == undefined) {
        document.getElementById(id).innerText=0
     document.getElementsByClassName('cart-count')[0].innerText=cartcount-1
     document.getElementsByClassName('bi-dash')[id[id.length-1]-1].disabled=true

    }
    else {
        document.getElementById(id).innerText=search.quantity
        document.getElementsByClassName('cart-count')[0].innerText=cartcount-1
    }
}
 
} */


let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.quantity;
    calculation()
}
let calculation =() => {
 let cartIcon = document.getElementById("cart-count");
 cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x,y) => x+y, 0);
 
 //x and y one of them is the previous number and the other one is the next, ex: const sumWithInitial = array1.reduce((accumulator, currentValue) => accumulator + currentValue,initialValue.
}

calculation()