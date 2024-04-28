/**
 get total
 creat new product
 save in local storage

 clear 
 read 
 count 
 delete
 update
 search

 clean data
 */
let mode = 'create'

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');

let count = document.getElementById('count');
let category = document.getElementById('category');

let total = document.getElementById('total');
let create = document.getElementById('create');

let show = document.getElementById('show');

let btndelete = document.getElementById('delete');
let tmp;

let products = [];

let buttons = document.getElementsByTagName('button');
function getTotal() {
    if (price.value != ''){
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        if (isNaN(result)){
             total.innerHTML = ''
             total.style.backgroundColor = '#a00';
             total.style.transition = '500ms';
            }
             else {
            total.innerHTML =  result;
            total.style.backgroundColor = '#222' ;
            total.style.transition = '500ms';
        }
    }
    
}
//create object
create.onclick = function (){
        title.style.border = 'none';
        product = {
        id: products.length,
    
        title:title.value ,
        price:price.value,
        taxes: taxes.value,
        discount:discount.value,
        ads:ads.value,
        category:category.value,
        total:total.innerHTML,
        count: count.value,        
    }
    let i = 1;
    //clean data
    if (title.value != ''){
    //create mod
        if (mode == 'create'){
    if (count.value != ''){
        i = count.value;
    }
    for (;i > 0 ; i--)
    save(product);
    }
    // update mode
else {
    products[tmp] = product;
    mode = 'create';
    count.style.display = 'block';
    create.innerHTML = 'create'
    popLocal();
    readData();
}
clearData();   
    }else {
        title.style.border = 'solid red 2px';
    }
}
function save(ob){
    let i = localStorage.length;
    if(products.length == 0){
        while(i > 0){
            i--;
           products.push(JSON.parse(localStorage.getItem(localStorage.key(i))));         
        }
    }
    products.push(ob);
    localStorage.setItem(localStorage.length , JSON.stringify(products[i]));
   
    readData();
}
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';

    total.innerHTML = '';
}
function load_Data(){
    let items = [];
    for(let i = 0 ; i < localStorage.length ; i++)
    {
    let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
    items.push(item);
    }
    return items;
}
function readData(any = load_Data()){
    products = any;
    let s = '';
    for (let i = 0 ; i < products.length; i++){
        let item = products[i];
        s += '<tr>';
        s += `<td>${i + 1}</td><td>${item.title}</td><td>${item.price}</td><td>${item.taxes}</td><td>${item.discount}</td><td>${item.category}</td><td><button class = 'UD Update' id = '${i}' onclick = "updateItem(${i})">Update</button></td><td><button class = 'UD Delete' id = '${i}' onclick ="DeleteItem(${i})">Delete</button></td>`
        s += `</tr>`;
    };
       show.innerHTML = s
    if (products.length > 0){
        btndelete.style.display = 'block';
    }else btndelete.style.display = 'none';
    products = load_Data();
}
readData();
//delete all l
btndelete.onclick = function clearStorage(){
     localStorage.clear();
     for (let i = 0 ; i < products.length ; i++){
        products.pop();
     }
     readData();
}
function DeleteItem(id){
    products.splice(id , 1);
   popLocal();
    readData();
}
function updateItem(id){
    scroll(0,0);
    fill(id);
    getTotal();
    count.style.display = 'none';
    create.innerHTML = 'Update';
    mode = 'update';
    tmp = id;
}
//fill
function fill(id){
     let item = products[id];
     title.value = item.title;
     price.value = item.price;
     taxes.value = item.taxes;
     ads.value = item.ads;
     discount.value = item.discount;
     category.value = item.category;
    }
    function popLocal(){
        localStorage.clear();
    for(let i = 0 ; i < products.length ; i++){
        localStorage.setItem(i , JSON.stringify(products[i]));
    }
    }
// search
let searchin = document.getElementById('search')
let searchMode = 'Title';
function setSearchMode(id){
    searchMode = id;
    searchin.placeholder = `serch by ${id}`;
    search(searchin.value)
}
function search(value){
    let t;
    if (searchMode == 'Title')
    {
    t = products.filter(e =>
        e.title.includes(value)
    )}
    else {
        t = products.filter(e =>
           e.category.includes(value)
        )        
    }
    readData(t);
}