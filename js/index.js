const baseUrl = 'http://localhost:3000'
let addBtn = document.getElementById('addBtn');
let inputs = document.getElementsByClassName('form-control');
let productCountInput = document.getElementById("count")


// get products 
let products = [];
function getData(){
    axios({
        method:'get',
        url:`${baseUrl}/products`,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }).then(function(response){
        // console.log(response)
        const {message, result} = response.data
            products = result
            showData()   ///////////////////////////////////////////////////////////////////////////////////
            // console.log(products)
    }).catch(function(error){
        console.log(error)
    })
}
getData()


// Show Data (products)
function showData(){
    let cartona = ``;
    for (let i = 0; i < products.length; i++) {
        cartona += `  <tr>
        <td class="text-center">${products[i].title}</td>
        <td class="text-center">${products[i].price}</td>
        <td class="text-center">${products[i].description}</td>
        <td class="text-center">
        <button onclick='deleteItem(${products[i].p_id})' class="noselect deletebutton"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
        
        </td>
        <td>
        
        <button onclick='updateItem(${products[i].p_id})'  class="updateBtn"> Update
</button>
        </td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = cartona;
    let deleteAll = document.getElementById("deleteAll");
    if(products.length > 0){
        deleteAll.innerHTML = `
        <button onclick="deleteAll()" class="btn btn-danger" id="deleteBtn">Delete All (${products.length})</button> 
        `
    } else {
        deleteAll.innerHTML = ''
    }
}


function deleteAll(){
    // localStorage.clear()
    // products.splice(0)
    // getData()
    deleteData()
}

// delete All Date
function deleteData(){
    axios({
        method:'delete',
        url:`${baseUrl}/deleteAllProducts`,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }

    }).then(function(response){
        const {message} = response.data
         if(message == "Done"){
            getData()
         } else {
            console.log("Failed To Delete All")
         }
    })
}




// add Product
// $("#addBtn").click(()=> {
//  if (addBtn.innerHTML == "Add Product") {
//     addProduct()
//  } else {
//     console.log("No")
//  }
// })
addBtn.addEventListener("click", ()=> {
    if (addBtn.innerText == "Add Product" && productCountInput.value > 1) { // add mode
        for(let i=0; i < productCountInput.value; i++){
            addProduct()
        } 
    }else if(addBtn.innerText == "Add Product" && productCountInput.value <= 1){
        addProduct()
    }
    
    else {
       updateProduct() // update mode
    }
    showData()
    resetForm()
  
})



function addProduct(){
    const data = {
        title:$("#productName").val(),
        price:$("#productPrice").val(),
        description:$("#productDesc").val(),
        userID: localStorage.getItem("userID")
    }
    // console.log(data)
    axios({
        method:'post',
        url:`${baseUrl}/products/addProduct`,
        data,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }).then(function(response){
        console.log(response.data)
        const {message} = response.data
        if(message == "Done") {
            // alert("Added Done")
            getData()  //////////////////////////////////
        }else {
            console.log("Not Done")
        }
    })
}

// delete Item
function deleteItem(id){
    axios({
        method:'delete',
        url:`${baseUrl}/products/deleteProduct/${id}`,
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    }).then(function(response){
        const {message, result} = response.data
        if (message == "Done") {
            alert("Deleted Successful")
            getData()
        } else {
            console.log("Fail to delete")
        }
    })
}


//update Item
function updateItem(id){
    localStorage.setItem("productID", id)
    const productID = localStorage.getItem("productID")
    // console.log(productID)
   addBtn.innerHTML = 'Update Product'
    getProduct()
}

// get product 
function getProduct(){
    axios({
        method:'get',
        url:`${baseUrl}/products/getProduct/${localStorage.getItem("productID")}`,
        headers: { 'Content-Type': 'application/json; charset=UTF-8'}
    }).then(function(response){
        const {message, result} = response.data
        $("#productName").val(result[0].title)
        $("#productPrice").val(result[0].price)
        $("#productDesc").val(result[0].description)
    })
}

// update product
function updateProduct(){
    const data = {
        title:$("#productName").val(),
        price:$("#productPrice").val(),
        description:$("#productDesc").val(),
        userID:localStorage.getItem("userID")
    }
    axios({
        method:'put',
        url:`${baseUrl}/products/updateProduct/${localStorage.getItem("productID")}`,
        data,
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    }).then(function(response){
        const {message, result} =  response.data;
        if (message == "Done") {
            getData()
        } else {
            console.log("Failed To Update ")
        }
        // console.log(response)
    })
    addBtn.innerHTML = 'Add Product'
}

// reset value to ''
function resetForm() {
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }

// search 
function search(searchTxt){
    let cartona = '';
    for (let i = 0; i < products.length; i++) {
        if(products[i].title.toLowerCase().includes(searchTxt.toLowerCase())){
            cartona += `  <tr>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].description}</td>
            <td>
            <button onclick='deleteItem(${products[i].p_id})' class="btn btn-danger">Delete</button>
            <button onclick='updateItem(${products[i].p_id})' class="btn btn-success">Update</button>
     
            </td>
        </tr>`
        }
        
    }
    document.getElementById("tableBody").innerHTML = cartona
    
}



