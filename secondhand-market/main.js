// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化Bootstrap的工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    // 初始化轮播图
    const carousel = new bootstrap.Carousel(document.querySelector('#mainCarousel'), {
        interval: 5000, // 自动播放间隔，5秒
        touch: true,    // 允许触摸滑动
        ride: 'carousel'
    });

    // 给轮播图按钮添加点击事件
    document.querySelectorAll('.carousel .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            switch(action) {
                case '立即选购':
                    console.log('跳转到商品列表页');
                    break;
                case '查看详情':
                    console.log('跳转到特惠页面');
                    break;
                case '我要卖货':
                    console.log('跳转到发布页面');
                    break;
            }
        });
    });

    // 监听轮播图切换事件
    document.querySelector('#mainCarousel').addEventListener('slide.bs.carousel', function (e) {
        console.log('切换到第', e.to + 1, '张轮播图');
    });

    // 添加商品卡片点击事件
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productTitle = this.querySelector('h3').textContent;
            let productId = '';
            
            // 根据商品标题生成ID
            switch(productTitle) {
                case 'iPhone 13 Pro Max':
                    productId = 'iphone13promax';
                    break;
                // 可以添加更多商品的映射...
                default:
                    productId = productTitle.toLowerCase().replace(/\s+/g, '');
            }
            
            // 跳转到商品详情页
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });

    // 添加分类卡片点击事件
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // 这里可以添加分类页面跳转逻辑
            console.log('分类卡片被点击');
        });
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchTags = document.querySelectorAll('.tag');

    // 搜索按钮点击事件
    searchButton.addEventListener('click', function() {
        handleSearch();
    });

    // 回车键触发搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // 标签点击事件
    searchTags.forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = this.textContent;
            handleSearch();
        });
    });

    // 处理搜索
    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const description = product.querySelector('.description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                product.style.display = '';
                // 添加匹配动画
                product.classList.add('search-match');
                setTimeout(() => {
                    product.classList.remove('search-match');
                }, 1000);
            } else {
                product.style.display = 'none';
            }
        });
    }

    // 搜索框获得焦点时的动画效果
    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('search-focus');
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.classList.remove('search-focus');
    });

    // 搜索表单
    const searchForm = document.querySelector('.d-flex');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            if (searchInput) {
                console.log('搜索关键词:', searchInput.value);
                // 这里可以添加搜索逻辑
            }
        });
    }

    // 回到顶部按钮
    const backToTopButton = document.getElementById('backToTop');
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // 点击按钮滚动到顶部
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
