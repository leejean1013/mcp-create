// 商品数据
const products = {
    'iphone13promax': {
        title: 'iPhone 13 Pro Max',
        price: '¥6999',
        originalPrice: '9999',
        condition: '95新',
        image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=500&hei=500&fmt=jpeg&qlt=95',
        thumbnails: [
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=100&hei=100&fmt=jpeg&qlt=95',
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-max-blue-select?wid=100&hei=100&fmt=jpeg&qlt=95',
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-max-silver-select?wid=100&hei=100&fmt=jpeg&qlt=95',
            'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=100&hei=100&fmt=jpeg&qlt=95'
        ],
        specs: {
            '型号': 'iPhone 13 Pro Max',
            '容量': '256GB',
            '颜色': '远峰蓝',
            '购买日期': '2023年3月',
            '保修情况': '还剩8个月保修',
            '配件': '原装充电器、数据线'
        },
        description: `
            <h4>商品描述</h4>
            <p>这是一台95新的iPhone 13 Pro Max，具体情况如下：</p>
            <ul>
                <li>无维修史，无进水，原装屏幕</li>
                <li>电池健康度90%</li>
                <li>机身完好，细微使用痕迹</li>
                <li>国行正品，支持保修</li>
                <li>随机附送保护壳一个</li>
            </ul>
            <h4>交易方式</h4>
            <p>支持当面交易，也可以全国顺丰包邮。支持验机后付款。</p>
        `
    },
    // 其他商品数据...
};

// 当页面加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
    // 从URL获取商品ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId && products[productId]) {
        loadProductDetails(productId);
    } else {
        console.error('商品不存在');
        // 可以添加错误处理，比如显示404页面
    }

    // 缩略图点击事件
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // 移除其他缩略图的active类
            thumbnails.forEach(t => t.classList.remove('active'));
            // 给当前点击的缩略图添加active类
            this.classList.add('active');
            // 更新主图
            document.querySelector('#productImage').src = this.src.replace('100x100', '500x500');
        });
    });
});

// 加载商品详情
function loadProductDetails(productId) {
    const product = products[productId];
    
    // 更新标题
    document.title = `${product.title} - 二手交易平台`;
    
    // 更新商品信息
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productCondition').textContent = product.condition;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('originalPrice').textContent = product.originalPrice;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productDescription').innerHTML = product.description;

    // 更新商品规格
    const specsTable = document.getElementById('productSpecs');
    for (const [key, value] of Object.entries(product.specs)) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="spec-label">${key}</td>
            <td class="spec-value">${value}</td>
        `;
        specsTable.appendChild(row);
    }

    // 更新缩略图
    const thumbnailImages = document.querySelectorAll('.thumbnail');
    thumbnailImages.forEach((thumb, index) => {
        if (product.thumbnails[index]) {
            thumb.src = product.thumbnails[index];
        }
    });
}
