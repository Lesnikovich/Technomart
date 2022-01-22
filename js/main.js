//Start_JS_Task #1
var PRODUCT_COUNT = 6;

var goodsCards = [];
var urls = ['bosch-2000', 'bosch-3000', 'bosch-6000', 'bosch-9000', 'makita-td-110'];
var brands = ['BOSCH', 'Makita', 'Vagner', 'Mega', 'Proline'];
var titles = [
    'Перфоратор BOSCH BFG 2000',
    'Перфоратор BOSCH BFG 3000',
    'Перфоратор BOSCH BFG 6000', 
    'Перфоратор BOSCH BFG 9000', 
    'Шуруповерт Makita TD-110'
];

var flags = ['new', 'promo', ''];
var isElectricValue = [false, true];

//End_JS_Task #1

var contactBtn = document.querySelector('.contacts-button');
var modalWrite = document.querySelector('.modal-write');
var modalWriteClose = modalWrite.querySelector('.modal-close');

//Start_JS_Task #1
function getRN(min, max) {
    return Math.floor((Math.random() * (max - min) + min)/500)*500;
}

function createGoodCards(){
    for(let i = 0; i < PRODUCT_COUNT; i++){
        let title = titles[Math.floor(Math.random()*titles.length)];
        let price = getRN(5000, 20000);
        let discount = Math.round(price*1.15);
            discount = Math.floor(discount/500)*500;
        let flag = flags[Math.floor(Math.random()*3)];
        let isElectric = isElectricValue[Math.round(Math.random())];

        goodsCards.push({
            name: urls[getRN(0, urls.length)],
            brand: brands[Math.floor(Math.random()*brands.length)],
            title: title,
            price: price,
            discount: (Math.round(Math.random()))?'':discount,
            flag: flag, 
            isElectric: isElectric
        });   

        console.log(goodsCards[i]);
    }
}

createGoodCards();
//End_JS_Task #1

//Start_JS_Task #2

var catalogList = document.querySelector('.catalog-list');
var catalogListItems = catalogList.querySelectorAll('li');
var fragmentCatalogList = document.createDocumentFragment();
var templateCatalogItem = document.querySelector('#catalog-item').content.querySelector('li');

function removeAllGoodCards(){
    for(var i=0; i<catalogListItems.length; i++){
        catalogListItems[i].remove();
    }
}

function appendGoodCards(){

    for(var i=0; i<PRODUCT_COUNT; i++){     
        var tempCatalogItem = templateCatalogItem.cloneNode(true);
    
        tempCatalogItem.querySelector('img').src = `img/catalog/${goodsCards[i].name}.jpg`;
        tempCatalogItem.querySelector('.item-title').textContent = goodsCards[i].title;
        tempCatalogItem.querySelector('.price').textContent = goodsCards[i].price;
        tempCatalogItem.querySelector('.discount').textContent = goodsCards[i].discount;
        
        if(goodsCards[i].flag!=''){
            var templateFlag = document.querySelector('#flag-new').content.querySelector('.flag');
            var tempFlag = templateFlag.cloneNode(true);
    
            if(goodsCards[i].flag==='promo'){
                tempFlag.classList.remove('flag-new');
                tempFlag.classList.add('flag-promo');
                tempFlag.querySelector('.visually-hidden').textContent="Акция";
            }  
            tempCatalogItem.insertAdjacentHTML('afterbegin', tempFlag.outerHTML);
        }
    
        fragmentCatalogList.appendChild(tempCatalogItem);
    }
    
    catalogList.appendChild(fragmentCatalogList);
}

removeAllGoodCards();
appendGoodCards();

//End_JS_Task #2

contactBtn.addEventListener('click', onContactBtnClick);

function openModalWrite() {
    modalWrite.classList.add('modal-show');
}

function closeModalWrite() {
    destroyModalWriteEventListeners();
    modalWrite.classList.remove('modal-show');
}

contactBtn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    openModalWrite();
    initModalWriteEventListeners();
});

function initModalWriteEventListeners() {
    document.addEventListener('keydown',onModalWriteKeyDown);
    modalWriteClose.addEventListener('click',onModalWriteClose);
    modalWriteClose.addEventListener('keydown',onModalWriteCloseKeyDown);
}

function destroyModalWriteEventListeners() {
    document.removeEventListener('keydown',onModalWriteKeyDown);
    modalWriteClose.removeEventListener('click',onModalWriteClose);
    modalWriteClose.removeEventListener('keydown',onModalWriteCloseKeyDown);
}

function onContactBtnClick(evt){
    evt.preventDefault();
    modalWrite.classList.add('modal-show');
}

function onModalWriteKeyDown(evt){
    if(evt.key==='Escape'){
        evt.preventDefault();
        closeModalWrite();
    }
}

function onModalWriteClose(evt){
    evt.preventDefault();
    closeModalWrite();
}

function onModalWriteCloseKeyDown(evt){
    if(evt.key==='Enter'){
        evt.preventDefault();
        closeModalWrite();
    }
}








