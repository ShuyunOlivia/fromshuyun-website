class LikeButton {
    constructor() {
        // 创建点赞容器
        this.container = document.createElement('div');
        this.container.className = 'like-container';
        
        // 创建点赞按钮
        this.button = document.createElement('button');
        this.button.className = 'like-button';
        this.button.innerHTML = '<i class="fas fa-heart"></i>';
        this.button.setAttribute('aria-label', '点赞按钮');
        
        // 创建计数器显示
        this.counter = document.createElement('div');
        this.counter.className = 'like-count';
        this.counter.textContent = '520';
        this.counter.setAttribute('aria-label', '当前有 520 个赞');
        
        // 添加到容器
        this.container.appendChild(this.button);
        this.container.appendChild(this.counter);
        
        // 添加点击事件
        this.button.addEventListener('click', () => this.handleClick());
        this.button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleClick();
        });
        
        // 添加到页面
        document.body.appendChild(this.container);
    }

    createFloatingNumber() {
        const floatingNum = document.createElement('div');
        floatingNum.className = 'like-animation';
        floatingNum.textContent = '+1';
        
        // 随机位置
        const randomOffset = (Math.random() - 0.5) * 30;
        floatingNum.style.left = `${randomOffset}px`;
        
        this.button.appendChild(floatingNum);
        
        // 动画结束后移除元素
        setTimeout(() => {
            floatingNum.remove();
        }, 1200);
    }

    handleClick() {
        // 创建浮动数字动画
        this.createFloatingNumber();
        
        // 按钮点击动画
        this.button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.button.style.transform = '';
        }, 100);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new LikeButton();
});