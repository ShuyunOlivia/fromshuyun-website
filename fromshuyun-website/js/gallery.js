// 照片数据
const photos = [
    {
        src: 'images/family/photo1.jpg',
        alt: '我和姐姐',
        description: '我和姐姐的快乐时光',
        type: 'special',
        position: 'top-left'
    },
    {
        src: 'images/family/photo2.jpg',
        alt: '妈妈和姐姐',
        description: '妈妈和姐姐的温馨时刻',
        type: 'special',
        position: 'top-right'
    },
    {
        src: 'images/family/photo3.jpg',
        alt: '我和妈妈',
        description: '我和妈妈的幸福时刻',
        type: 'special',
        position: 'bottom-left'
    },
    {
        src: 'images/family/photo4.jpg',
        alt: '全家福',
        description: '我们的全家福',
        type: 'special',
        position: 'bottom-right'
    },
    {
        src: 'images/family/photo5.jpg',
        alt: '三人合照',
        description: '我们的快乐时光',
        type: 'special',
        position: 'center'
    }
];

// 初始化照片墙
function initGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    
    // 创建特殊布局容器
    const specialLayout = document.createElement('div');
    specialLayout.className = 'special-layout';
    
    // 添加中心照片
    const centerPhoto = photos.find(photo => photo.position === 'center');
    if (centerPhoto) {
        const centerItem = createGalleryItem(centerPhoto);
        centerItem.classList.add('center-photo');
        specialLayout.appendChild(centerItem);
    }
    
    // 添加周围照片
    const surroundingPhotos = photos.filter(photo => photo.position !== 'center');
    surroundingPhotos.forEach(photo => {
        const item = createGalleryItem(photo);
        item.classList.add(photo.position);
        specialLayout.appendChild(item);
    });
    
    galleryContainer.appendChild(specialLayout);
}

// 创建照片项
function createGalleryItem(photo) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.setAttribute('data-src', photo.src);
    img.alt = photo.alt;
    
    const description = document.createElement('div');
    description.className = 'gallery-description';
    description.textContent = photo.description;
    
    galleryItem.appendChild(img);
    galleryItem.appendChild(description);
    
    return galleryItem;
}

// 初始化Lightbox
function initLightbox() {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': '照片 %1 / %2'
    });
}

// 添加照片点击事件
function addPhotoClickEvents() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('data-src') || img.src;
            
            // 创建大图预览
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${src}" alt="${img.alt}">
                    <div class="lightbox-description">${this.querySelector('.gallery-description').textContent}</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // 点击关闭
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initLightbox();
    addPhotoClickEvents();
}); 