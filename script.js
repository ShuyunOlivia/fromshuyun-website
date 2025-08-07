script.js
// 给每个泡泡绑定点击跳转
document.querySelectorAll('.bubble').forEach(b => {
  b.addEventListener('click', () => {
    const url = b.getAttribute('data-link');
    // 直接跳转到对应页面
    window.location.href = url;
  });
});
