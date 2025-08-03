// 聊天界面控制
const chatContainer = document.getElementById('chat-container');
const chatToggle = document.getElementById('chat-toggle');
const closeChat = document.querySelector('.close-chat');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

// 聊天界面显示/隐藏
chatToggle.addEventListener('click', function() {
    chatContainer.classList.add('active');
});

closeChat.addEventListener('click', function() {
    chatContainer.classList.remove('active');
});

// 发送消息
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        messageInput.value = '';
        
        // 模拟AI回复
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'ai');
        }, 1000);
    }
}

// 添加消息到聊天界面
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 生成AI回复
function generateResponse(message) {
    const responses = [
        '这张照片真温馨，让我想起了我们在一起的快乐时光。',
        '妈妈和姐姐的笑容总是那么温暖。',
        '这是我最喜欢的照片之一，每次看到都会感到幸福。',
        '感谢你分享这些美好的回忆。',
        '这些照片让我感受到了家的温暖。'
    ];
    
    // 简单的关键词匹配
    if (message.includes('照片')) {
        return '是的，这些照片记录了我们最珍贵的时刻。';
    } else if (message.includes('妈妈') || message.includes('姐姐')) {
        return '妈妈和姐姐是我们生命中最重要的人。';
    } else if (message.includes('爱') || message.includes('喜欢')) {
        return '爱是我们家庭最强大的纽带。';
    }
    
    // 随机回复
    return responses[Math.floor(Math.random() * responses.length)];
}

// 事件监听
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 初始化欢迎消息
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        addMessage('你好！我是你的AI助手，很高兴能和你一起回忆这些美好的时刻。', 'ai');
    }, 1000);
}); 