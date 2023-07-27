var ProductNameInput = document.getElementById("ProductName");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductCategoryInput = document.getElementById("ProductCategory");
var ProductDescriptionInput = document.getElementById("ProductDescription");

var productContainer = [];
var search = document.getElementById("searchInput");
var indexUpDate = 0;

var btnAdd = document.getElementById("addBtn");
var btnUpdate = document.getElementById("updateBtn");

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  showData();
}

function addData() {
  if (regexName() == true & regexPrice() == true & regexCategory() == true) {
    var product = {
      name: ProductNameInput.value,
      price: ProductPriceInput.value,
      category: ProductCategoryInput.value,
      desc: ProductDescriptionInput.value,
    };

    productContainer.unshift(product);

    localStorage.setItem("products", JSON.stringify(productContainer));
    showData();
    clearData();
  }
}

function showData() {
  var cartona = "";

  for (var i = 0; i < productContainer.length; i++) {
    cartona += `
      <tr>
              <td>${productContainer[i].name}</td>
              <td>${productContainer[i].price}</td>
              <td>${productContainer[i].category}</td>
              <td>${productContainer[i].desc}</td>
              <td>
                <button class="btn btn-outline-warning btn-sm" onclick="setData(${i})">Edit</button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
              </td>
            </tr>
    `;
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function deleteProduct(elementNumber) {
  productContainer.splice(elementNumber, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  showData();
}

function searchProduct() {
  var term = search.value;
  var cartona = "";

  for (var i = 0; i < productContainer.length; i++) {
    if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `
      <tr>
              <td>${productContainer[i].name}</td>
              <td>${productContainer[i].price}</td>
              <td>${productContainer[i].category}</td>
              <td>${productContainer[i].desc}</td>
              <td>
                <button class="btn btn-outline-warning btn-sm" onclick="setData(${i})">Edit</button>
                <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
              </tr>
            </tr>
    `;
    }
  }
  document.getElementById("tableData").innerHTML = cartona;
}

function setData(index) {
  indexUpDate = index;
  var carrantProduct = productContainer[index];

  ProductNameInput.value = carrantProduct.name;
  ProductPriceInput.value = carrantProduct.price;
  ProductCategoryInput.value = carrantProduct.category;
  ProductDescriptionInput.value = carrantProduct.desc;

  btnUpdate.classList.remove("d-none");
  btnAdd.classList.add("d-none");
}

function updateProduct() {
  var product = {
    name: ProductNameInput.value,
    price: ProductPriceInput.value,
    category: ProductCategoryInput.value,
    desc: ProductDescriptionInput.value,
  };

  productContainer.splice(indexUpDate, 1, product);
  btnUpdate.classList.add("d-none");
  btnAdd.classList.remove("d-none");

  localStorage.setItem("products", JSON.stringify(productContainer));
  showData();
  clearData();
}

function clearData() {
  ProductNameInput.value = " ";
  ProductPriceInput.value = " ";
  ProductCategoryInput.value = " ";
  ProductDescriptionInput.value = " ";
}


// Resgex Name Input
function regexName() {
  var regexName = /^[A-Z][a-z]{2,10}$/;
  var text = ProductNameInput.value;
  var msgName = document.getElementById("alertName");

  if (regexName.test(text) == true) {
    ProductNameInput.classList.add("is-valid");
    ProductNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");
    return true;
  } else {
    ProductNameInput.classList.add("is-invalid");
    ProductNameInput.classList.remove("is-valid");
    msgName.classList.remove("d-none");
    return false;
  }
}

// Resgex Price Input

function regexPrice() {
  var regexPrice = /^[0-9]{2,6}$/;
  var price = ProductPriceInput.value;
  var alert = document.getElementById("alertPrice");

  if (regexPrice.test(price) == true) {
    ProductPriceInput.classList.add("is-valid");
    ProductPriceInput.classList.remove("is-invalid");
    alert.classList.add("d-none");
    return true;
  } else {
    ProductPriceInput.classList.add("is-invalid");
    ProductPriceInput.classList.remove("is-valid");
    alert.classList.remove("d-none");
    return false
  }
}

// Resgex Category Input
function regexCategory(){
  var regexCat = /^[A-Z][a-z]{2,10}$/
  var category = ProductCategoryInput.value;
  var alert = document.getElementById("alertCategory");

  if(regexCat.test(category)== true){
    ProductCategoryInput.classList.add("is-valid");
    ProductCategoryInput.classList.remove("is-invalid");
    alert.classList.add("d-none");
    return true;
  }else{
    ProductCategoryInput.classList.add("is-invalid");
    ProductCategoryInput.classList.remove("is-valid");
    alert.classList.remove("d-none");
    return false;
  }
}