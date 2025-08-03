// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// 图片懒加载
document.addEventListener('DOMContentLoaded', function() {
    // 确保所有内容可见
    document.querySelectorAll('.gallery-content').forEach(content => {
        content.style.display = 'block';
        content.style.maxHeight = 'none';
        content.style.opacity = '1';
    });

    // 为每个图片添加加载完成的处理
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.onload = function() {
            this.style.opacity = '1';
        };
        // 如果图片已经缓存，直接设置opacity
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // 处理图片加载错误
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.onerror = function() {
            this.src = 'path/to/placeholder.jpg'; // 添加一个默认的占位图
            console.error('Image failed to load:', this.src);
        };
    });

    // 为所有图片添加加载错误处理
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            console.error('图片加载失败:', this.src);
            this.style.border = '2px solid red';
            this.style.padding = '10px';
            this.style.width = '100px';
            this.style.height = '100px';
            this.style.objectFit = 'contain';
            this.style.backgroundColor = '#ffebee';
            
            // 创建错误提示
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.fontSize = '12px';
            errorDiv.textContent = '图片加载失败: ' + this.src;
            this.parentNode.appendChild(errorDiv);
        };
        
        img.onload = function() {
            console.log('图片加载成功:', this.src);
        };
    });
});

// 主题切换（可选）
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.querySelector('.nav-container').appendChild(themeToggle);

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// 添加暗色主题样式
const style = document.createElement('style');
style.textContent = `
    .dark-theme {
        --primary-color: #2d2d2d;
        --secondary-color: #3d3d3d;
        --text-color: #fff;
        --accent-color: #e67e7e;
        --background-color: #1a1a1a;
    }
`;
document.head.appendChild(style);

// 在主页面的script标签中添加
document.addEventListener('introAnimationEnd', () => {
    console.log('动画已结束，网站完全加载');
    // 这里可以添加动画结束后的其他操作
});

const photos = document.querySelectorAll(`#${category} .gallery-item img`);

// 在 collectPhotos 函数中添加
categories.forEach(category => {
    console.log(`Processing category: ${category}`);
    const photos = document.querySelectorAll(`#${category} .gallery-item img`);
    console.log(`Found ${photos.length} photos in category ${category}`);
    // ... 其余代码
});

// 在 createPhotoElement 函数中添加
createPhotoElement(photo) {
    const photoEl = document.createElement('div');
    photoEl.className = 'intro-photo';
    
    const img = document.createElement('img');
    img.src = photo.src;
    
    // 添加图片加载错误处理
    img.onerror = () => {
        console.error(`Failed to load image: ${photo.src}`);
    };
    
    img.onload = () => {
        console.log(`Successfully loaded image: ${photo.src}`);
    };
    
    const desc = document.createElement('div');
    desc.className = 'intro-description';
    desc.textContent = photo.description;
    
    photoEl.appendChild(img);
    photoEl.appendChild(desc);
    
    return photoEl;
}

<script src="js/intro-animation.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const animation = new IntroAnimation();
        animation.initialize();
    });
</script> 