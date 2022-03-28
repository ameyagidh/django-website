console.log("Hello");

var updateBtns = document.getElementsByClassName("update-cart")

for(var i = 0; i < updateBtns.length; i++){

    updateBtns[i].addEventListener('click',function(){
        // function which is used when a button of
        // add to cart is clicked.active
        var productId = this.dataset.product
        var action = this.dataset.action
        
        if(user === 'AnonymousUser'){
            addCookie(productId,action);
        }
        else{
            console.log("Welcome user");
            updateUserOrder(productId,action)
        }
    
    })

function addCookie(productId, action){
    console.log("Unknown user");

    if(action == "add"){
        if(cart[productId] == undefined){
            // if cart is empty.
            cart[productId] = {'quantity':1};
        }
        else{
            cart[productId]['quantity'] += 1
        }
        
        if(action == "remove"){
            // if cart is empty.
            cart[productId]['quantity'] -= 1;
            if(cart[productId]['quantity'] <= 0){
                // if item is quantity is 0, it is
                // deleted from the cart
                delete cart[productId];
            }
}
document.cookie = 'cart='+JSON.stringify(cart) + ";domain=;path=/";
location.reload();
}
function updateUserOrder(productId,action){   
    // this function is used to send the data of views to the html file.
    // console.log("productId:",productId, "action:",action, "User:", user)
    var url = '/update_item/'
    
    // fetch send to a url then what is the data

    fetch(url,{
        method:'POST',
        header:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({"productId": productId, "action":action, "User": user})
    })
    // promise after sending that data.
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log("data",data)
        location.reload()
    })

}

}}
