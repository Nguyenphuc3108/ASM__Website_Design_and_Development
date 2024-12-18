// Lấy form đăng ký
const registerForm = document.getElementById('registerForm');

// Bắt sự kiện khi submit form
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form gửi đi mặc định

    // Lấy giá trị từ các input
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Kiểm tra email có chứa cả chữ và số hay không
    const emailPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+@[a-zA-Z\d]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Email must contain both letters and numbers.");
        return; // Dừng việc gửi form nếu email không hợp lệ
    }

    // Tạo object user để lưu vào localStorage
    const user = {
        username,
        email,
        password,
        gender
    };

    // Lưu user vào localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị thông báo và reset form
    alert('Registration successful!');
    registerForm.reset();
});
