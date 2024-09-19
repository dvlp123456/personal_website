// 照片轮播功能
const carousel = document.querySelector('.carousel');
const images = carousel.querySelectorAll('img');
const prevBtn = carousel.querySelector('.prev');
const nextBtn = carousel.querySelector('.next');
const indicators = carousel.querySelector('.carousel-indicators');
let currentIndex = 0;

function showImage(index) {
    images[currentIndex].classList.remove('active');
    images[index].classList.add('active');
    updateIndicators(index);
    currentIndex = index;
}

function showNextImage() {
    let nextIndex = (currentIndex + 1) % images.length;
    showImage(nextIndex);
}

function showPrevImage() {
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex);
}

prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// 创建指示器
images.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.addEventListener('click', () => showImage(index));
    indicators.appendChild(indicator);
});

function updateIndicators(activeIndex) {
    const indicatorDots = indicators.querySelectorAll('.indicator');
    indicatorDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// 自动播放
setInterval(showNextImage, 5000);

// 聊天功能
const chatToggle = document.getElementById('chat-toggle');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.querySelector('#chat-input input');
const chatSendButton = document.querySelector('#chat-input button');

chatToggle.addEventListener('click', () => {
    chatContainer.style.display = 'block';
    chatToggle.style.display = 'none';
    if (chatMessages.children.length === 0) {
        addMessage('AI', '您好！我是AI助手。有什么我可以帮您的吗？');
    }
});

chatClose.addEventListener('click', () => {
    chatContainer.style.display = 'none';
    chatToggle.style.display = 'block';
});

chatSendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage('用户', message);
        chatInput.value = '';
        // 这里可以添加AI回复的逻辑
        setTimeout(() => {
            addMessage('AI', '这是一个AI自动回复的示例消息。');
        }, 1000);
    }
}

function addMessage(sender, text) {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 暗黑模式切换
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// 检查用户之前的暗黑模式偏好
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}