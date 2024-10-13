const customerBtn = document.getElementById('customerBtn');
const merchantBtn = document.getElementById('merchantBtn');
const customerLogin = document.getElementById('customerLogin');
const merchantLogin = document.getElementById('merchantLogin');
const merchantDashboard = document.getElementById('merchantDashboard');
const addProductPage = document.getElementById('addProductPage');
const storePage = document.getElementById('storePage');
const productPage = document.getElementById('productPage');
const cartPage = document.getElementById('cartPage');
const profilePage = document.getElementById('profilePage');
const storeList = document.getElementById('storeList');
const productList = document.getElementById('productList');
const cartList = document.getElementById('cartList');
const profileName = document.getElementById('profileName');
const profileSurname = document.getElementById('profileSurname');
const purchasedItems = document.getElementById('purchasedItems');

let cart = [];
let completedSales = 0;
let customerInfo = { name: '', surname: '', purchases: [] };

// عرض صفحة الزبون
customerBtn.addEventListener('click', () => {
    customerLogin.classList.remove('hidden');
    merchantLogin.classList.add('hidden');
});

// عرض صفحة التاجر
merchantBtn.addEventListener('click', () => {
    merchantLogin.classList.remove('hidden');
    customerLogin.classList.add('hidden');
});

// تسجيل دخول الزبون
document.getElementById('loginCustomer').addEventListener('click', () => {
    const name = document.getElementById('customerName').value;
    const surname = document.getElementById('customerSurname').value;
    if (name && surname) {
        customerInfo = { name, surname, purchases: [] };
        profileName.textContent = name;
        profileSurname.textContent = surname;
        
        customerLogin.classList.add('hidden');
        document.getElementById('profileBtn').classList.remove('hidden');
        storePage.classList.remove('hidden');
        loadStores();
    }
});

// تسجيل دخول التاجر
document.getElementById('loginMerchant').addEventListener('click', () => {
    const name = document.getElementById('merchantName').value;
    const password = document.getElementById('merchantPassword').value;
    if (name && password) {
        merchantLogin.classList.add('hidden');
        merchantDashboard.classList.remove('hidden');
        document.getElementById('completedSales').textContent = completedSales;
    }
});

// تحميل المحلات
function loadStores() {
    const stores = ['محل 1', 'محل 2', 'محل 3'];
    storeList.innerHTML = '';
    stores.forEach(store => {
        const li = document.createElement('li');
        li.textContent = store;
        li.addEventListener('click', () => loadProducts(store));
        storeList.appendChild(li);
    });
}

// تحميل المنتجات
function loadProducts(store) {
    const products = ['منتج 1', 'منتج 2', 'منتج 3'];
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        const addButton = document.createElement('button');
        addButton.textContent = 'إضافة إلى السلة';
        addButton.addEventListener('click', () => addToCart(product));
        li.appendChild(addButton);
        productList.appendChild(li);
    });
    storePage.classList.add('hidden');
    productPage.classList.remove('hidden');
}

// إضافة إلى السلة
function addToCart(product) {
    cart.push(product);
    customerInfo.purchases.push(product); // حفظ المنتج في سجل الزبون
    updateCart();
}

// تحديث السلة
function updateCart() {
    cartList.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        cartList.appendChild(li);
    });
    cartPage.classList.remove('hidden');
}

// إتمام الشراء
document.getElementById('checkout').addEventListener('click', () => {
    const address = document.getElementById('address').value;
    if (address) {
        completedSales++;
        document.getElementById('completedSales').textContent = completedSales;
        alert(`تم إتمام الشراء! العنوان: ${address}`);
        cart = [];
        updateCart();
    } else {
        alert('يرجى إدخال العنوان.');
    }
});

// إضافة منتج جديد
document.getElementById('addProductBtn').addEventListener('click', () => {
    merchantDashboard.classList.add('hidden');
    addProductPage.classList.remove('hidden');
});

// تقديم المنتج الجديد
document.getElementById('submitProduct').addEventListener('click', () => {
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0];

    if (productName && productDescription && productImage) {
        alert(`تم إضافة المنتج: ${productName}`);
        addProductPage.classList.add('hidden');
        merchantDashboard.classList.remove('hidden');
    } else {
        alert('يرجى ملء جميع الحقول.');
    }
});

// عرض الملف الشخصي
document.getElementById('profileBtn').addEventListener('click', () => {
    profilePage.classList.remove('hidden');
    loadPurchasedItems();
});

// تحميل السلع التي اشتراها الزبون
function loadPurchasedItems() {
    purchasedItems.innerHTML = '';
    customerInfo.purchases.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        purchasedItems.appendChild(li);
    });
}
// إتمام الشراء
document.getElementById('checkout').addEventListener('click', () => {
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (address) {
        completedSales++;
        document.getElementById('completedSales').textContent = completedSales;

        let paymentMessage = `تم إتمام الشراء! العنوان: ${address}\n`;
        paymentMessage += `طريقة الدفع: ${paymentMethod === 'cash' ? 'نقدًا' : 'عبر الهاتف'}`;
        
        alert(paymentMessage);
        cart = [];
        updateCart();
    } else {
        alert('يرجى إدخال العنوان.');
    }
});
