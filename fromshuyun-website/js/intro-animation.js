class IntroAnimation {
    constructor() {
        this.container = null;
        this.currentPhotoIndex = 0;
        this.isAnimationStopped = false;
        this.isPaused = false;
        this.autoPlayTimer = null;
        this.isProcessingAction = false;
        
        // 预设所有照片路径和描述
        this.photos = [
            // 我和妈妈的照片
            {
                src: 'images/images_family/我和媽媽/我和媽媽在張家港香山.jpg',
                description: '我和媽媽在張家港香山'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在上海花園酒店.jpg',
                description: '我和媽媽在上海花園酒店'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在公司電梯2.jpg',
                description: '我和媽媽在公司電梯2'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在日本.jpg',
                description: '我和媽媽在日本'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在初中大禮堂.jpg',
                description: '我和媽媽在初中大禮堂'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在初中畢業典禮上.jpg',
                description: '我和媽媽在初中畢業典禮上'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在機場停車場.jpg',
                description: '我和媽媽在機場停車場'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在公司電梯裏.jpg',
                description: '我和媽媽在公司電梯裏'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在大提琴演出牌子前.jpg',
                description: '我和媽媽在大提琴演出牌子前'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在來舊金山的飛機上.jpg',
                description: '我和媽媽在來舊金山的飛機上'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在mt diablo.jpg',
                description: '我和媽媽在mt diablo'
            },
            {
                src: 'images/images_family/我和媽媽/我和媽媽在danville做馬拉松志願者.jpg',
                description: '我和媽媽在danville做馬拉松志願者'
            },
            // 我和姐姐的照片
            {
                src: 'images/images_family/我和姐姐/我和姐姐在ktv.jpg',
                description: '我和姐姐在KTV'
            },
            {
                src: 'images/images_family/我和姐姐/我送姐姐去香港讀書.jpg',
                description: '我送姐姐去香港讀書'
            },
            {
                src: 'images/images_family/我和姐姐/我和姐姐在機場.jpg',
                description: '我和姐姐在機場'
            },
            {
                src: 'images/images_family/我和姐姐/我和姐姐在張家港舅舅家.jpg',
                description: '我和姐姐在張家港舅舅家'
            },
            {
                src: 'images/images_family/我和姐姐/我在上海家中拍的姐姐.jpg',
                description: '我在上海家中拍的姐姐'
            },
            {
                src: 'images/images_family/我和姐姐/我和姐姐在mt diablo山.jpg',
                description: '我和姐姐在Mt Diablo山'
            },
            {
                src: 'images/images_family/我和姐姐/我和姐姐在床上.jpg',
                description: '我和姐姐在床上'
            },
            // 妈妈和姐姐的照片
            {
                src: 'images/images_family/媽媽和姐姐/浦東機場搞笑照片.jpg',
                description: '浦東機場搞笑照片'
            },
            {
                src: 'images/images_family/媽媽和姐姐/媽媽送姐姐去香港讀研究生.jpg',
                description: '媽媽送姐姐去香港讀研究生'
            },
            // 三口之家的照片
            {
                src: 'images/images_family/我們三口/mt diablo夕陽.jpg',
                description: 'Mt Diablo夕陽'
            },
            {
                src: 'images/images_family/我們三口/2025張家港春節.jpg',
                description: '2025張家港春節'
            }
        ];
        
        // 背景音乐
        this.bgMusic = new Audio('https://cdn.pixabay.com/download/audio/2022/02/22/audio_d3c9562e48.mp3?filename=relaxing-piano-music-116967.mp3');
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.5;
    }

    initialize() {
        console.log('Initializing animation...');
        this.container = document.getElementById('intro-container');
        if (!this.container) {
            console.error('找不到入场动画容器');
            return;
        }

        const photoContainer = this.container.querySelector('.photo-container');
        if (!photoContainer) {
            console.error('找不到照片容器');
            return;
        }

        // 确保容器可接收键盘事件
        this.container.tabIndex = 0;
        this.container.focus();

        // 添加进度指示器
        this.createProgressIndicator();

        // 添加控制按钮组
        this.createControls();

        // 添加键盘控制
        document.addEventListener('keydown', (e) => {
            if (this.isProcessingAction) return;
            
            // 左箭头：上一张
            if (e.key === 'ArrowLeft' || e.keyCode === 37) {
                e.preventDefault();
                this.showPreviousPhoto(true);
            }
            // 右箭头/空格：下一张
            else if (e.key === 'ArrowRight' || e.keyCode === 39 || e.key === ' ') {
                e.preventDefault();
                this.showNextPhoto(true);
            }
        });

        // 开始播放背景音乐
        this.bgMusic.play().catch(e => console.log('Auto-play prevented:', e));

        // 开始显示照片
        this.showNextPhoto();
    }

    createProgressIndicator() {
        const progressContainer = this.container.querySelector('.progress-container');
        if (!progressContainer) return;
        
        progressContainer.innerHTML = '';
        this.photos.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (index === 0) dot.classList.add('active');
            progressContainer.appendChild(dot);
        });
    }

    createControls() {
        const controls = this.container.querySelector('.controls');
        if (!controls) return;

        controls.innerHTML = '';

        // 暂停/播放按钮
        const playPauseBtn = document.createElement('button');
        playPauseBtn.className = 'control-button play-pause';
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playPauseBtn.onclick = () => this.togglePause();

        // 音乐开关按钮
        const musicBtn = document.createElement('button');
        musicBtn.className = 'control-button music';
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        musicBtn.onclick = () => this.toggleMusic();

        // 跳过按钮
        const skipButton = document.createElement('button');
        skipButton.className = 'control-button skip';
        skipButton.innerHTML = '<i class="fas fa-forward"></i>';
        skipButton.onclick = () => this.endAnimation();

        controls.appendChild(playPauseBtn);
        controls.appendChild(musicBtn);
        controls.appendChild(skipButton);
    }

    togglePause() {
        if (this.isProcessingAction) return;
        
        this.isPaused = !this.isPaused;
        const playPauseBtn = this.container.querySelector('.play-pause');
        if (this.isPaused) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.bgMusic.pause();
            if (this.autoPlayTimer) {
                clearTimeout(this.autoPlayTimer);
            }
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.bgMusic.play();
            this.showNextPhoto();
        }
    }

    toggleMusic() {
        if (this.isProcessingAction) return;
        
        if (this.bgMusic.paused) {
            this.bgMusic.play();
            this.container.querySelector('.music').classList.remove('off');
        } else {
            this.bgMusic.pause();
            this.container.querySelector('.music').classList.add('off');
        }
    }

    updateProgress() {
        const dots = this.container.querySelectorAll('.progress-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentPhotoIndex);
        });
    }

    showNextPhoto(isManual = false) {
        if (this.isAnimationStopped || (this.isPaused && !isManual)) return;
        if (this.isProcessingAction) return;
        
        this.isProcessingAction = true;
        setTimeout(() => {
            this.finishIntro(); //
        }, 300);
 

        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
        }

        if (this.currentPhotoIndex >= this.photos.length) {
            this.endAnimation();
            return;
        }

        const photo = this.photos[this.currentPhotoIndex];
        const photoElement = document.createElement('div');
        photoElement.className = 'photo-item';

        const img = document.createElement('img');
        img.src = photo.src;
        img.onload = () => {
            photoElement.classList.add('show');
        };

        const description = document.createElement('div');
        description.className = 'photo-description';
        description.textContent = photo.description;

        photoElement.appendChild(img);
        photoElement.appendChild(description);

        photoElement.addEventListener('click', (e) => {
            if (this.isProcessingAction) return;
            
            const clickX = e.clientX;
            const rect = photoElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            
            if (clickX < centerX) {
                this.showPreviousPhoto(true);
            } else {
                this.showNextPhoto(true);
            }
        });

        const photoContainer = this.container.querySelector('.photo-container');
        const oldPhotos = photoContainer.querySelectorAll('.photo-item');
        oldPhotos.forEach(oldPhoto => {
            oldPhoto.classList.remove('show');
            setTimeout(() => oldPhoto.remove(), 500);
        });

        photoContainer.appendChild(photoElement);
        this.updateProgress();

        this.currentPhotoIndex++;
        
        if (!isManual && !this.isPaused) {
            this.autoPlayTimer = setTimeout(() => this.showNextPhoto(), 4000);
        }
        this.isProcessingAction = false;
    }

    showPreviousPhoto(isManual = false) {
        if (this.currentPhotoIndex <= 1) return;
        if (this.isProcessingAction) return;
        
        this.currentPhotoIndex = Math.max(0, this.currentPhotoIndex - 2);
        this.showNextPhoto(isManual);
    }

    endAnimation() {
        console.log('Ending animation');
        if (this.container) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
            
            this.isAnimationStopped = true;
            if (this.autoPlayTimer) {
                clearTimeout(this.autoPlayTimer);
            }
            
            this.container.style.animation = 'fadeOut 1s ease forwards';
            
            setTimeout(() => {
                document.querySelectorAll('.navbar, .hero, .gallery').forEach(element => {
                    element.style.display = 'block';
                    element.classList.add('show');
                });
                
                this.container.remove();
            }, 1000);
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const animation = new IntroAnimation();
    animation.initialize();
});