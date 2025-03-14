document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面类型
    const isLoginPage = document.querySelector('#loginForm') !== null;
    const isRegisterPage = document.querySelector('#registerForm') !== null;

    // 密码显示切换
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    });

    // 登录表单处理
    if (isLoginPage) {
        const loginForm = document.querySelector('#loginForm');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.querySelector('#username').value;
            const password = document.querySelector('#password').value;
            const rememberMe = document.querySelector('#rememberMe').checked;

            // TODO: 发送登录请求到服务器
            console.log('登录信息：', { username, password, rememberMe });

            // 模拟登录成功
            showToast('登录成功！正在跳转...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // 注册表单处理
    if (isRegisterPage) {
        const registerForm = document.querySelector('#registerForm');
        const passwordInput = document.querySelector('#password');
        const confirmPasswordInput = document.querySelector('#confirmPassword');
        const sendCodeButton = document.querySelector('#sendCode');

        // 密码强度检测
        passwordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });

        // 发送验证码
        let countdown = 60;
        sendCodeButton.addEventListener('click', function() {
            const phone = document.querySelector('#phone').value;
            if (!phone) {
                showToast('请输入手机号', 'error');
                return;
            }
            
            // TODO: 发送验证码到服务器
            console.log('发送验证码到：', phone);
            
            // 开始倒计时
            this.disabled = true;
            const originalText = this.textContent;
            const timer = setInterval(() => {
                this.textContent = `重新发送(${countdown}s)`;
                countdown--;
                if (countdown < 0) {
                    clearInterval(timer);
                    this.disabled = false;
                    this.textContent = originalText;
                    countdown = 60;
                }
            }, 1000);
        });

        // 注册表单提交
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.querySelector('#username').value;
            const phone = document.querySelector('#phone').value;
            const verificationCode = document.querySelector('#verificationCode').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const agreeTerms = document.querySelector('#agreeTerms').checked;

            // 表单验证
            if (password !== confirmPassword) {
                showToast('两次输入的密码不一致', 'error');
                return;
            }

            if (!agreeTerms) {
                showToast('请同意服务条款和隐私政策', 'error');
                return;
            }

            // TODO: 发送注册请求到服务器
            console.log('注册信息：', { username, phone, verificationCode, password });

            // 模拟注册成功
            showToast('注册成功！正在跳转到登录页面...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
});

// 密码强度检测
function updatePasswordStrength(password) {
    const strengthBox = document.querySelector('#passwordStrength');
    const strengthText = strengthBox.querySelector('.strength-text');
    
    // 移除所有强度类
    strengthBox.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    
    if (!password) {
        strengthText.textContent = '密码强度：弱';
        strengthBox.classList.add('strength-weak');
        return;
    }

    // 密码强度评分
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // 更新强度显示
    if (score <= 2) {
        strengthText.textContent = '密码强度：弱';
        strengthBox.classList.add('strength-weak');
    } else if (score <= 3) {
        strengthText.textContent = '密码强度：中';
        strengthBox.classList.add('strength-medium');
    } else {
        strengthText.textContent = '密码强度：强';
        strengthBox.classList.add('strength-strong');
    }
}

// Toast提示
function showToast(message, type = 'info') {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.classList.add('show'), 10);
    
    // 自动关闭
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
