// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật hiển thị số lượng giỏ hàng
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((total,item)=> total + item.quantity, 0);
}

// Thêm sản phẩm vào giỏ
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseInt(button.dataset.price),
            image: button.dataset.image,
            quantity: 1,
        };

        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Product has been added to cart!');
    });
});

// Hiển thị giỏ hàng
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" class="cart-img"></td>
                <td>${item.name}</td>
                <td><input type="number" value="${item.quantity}" class="form-control text-center quantity-input" min="1" data-index="${index}"></td>
                <td>${item.price.toLocaleString()}đ</td>
                <td>${itemTotal.toLocaleString()}đ</td>
                <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `;
    });

    cartTotal.textContent = `${total.toLocaleString()}đ`;
}

// Xử lý cập nhật và xóa sản phẩm trong giỏ
document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
});

document.body.addEventListener('change', function (e) {
    if (e.target.classList.contains('quantity-input')) {
        const index = e.target.dataset.index;
        cart[index].quantity = parseInt(e.target.value) || 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
});
// Xử lý sự kiện nút "Thanh Toán"
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let bill = 'YOUR BILL:\n\n';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        bill += `${item.name} - ${item.quantity} x ${item.price.toLocaleString()}đ = ${itemTotal.toLocaleString()}đ\n`;
    });

    bill += `\nTotal: ${total.toLocaleString()}đ`;

    // Hiển thị hóa đơn qua alert hoặc modal
    alert(bill);

    // Làm trống giỏ hàng sau khi thanh toán
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
});

// Cập nhật giao diện khi tải trang
if (document.getElementById('cart-items')) renderCart();
updateCartCount();


