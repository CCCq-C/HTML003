// 等待页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 在这里添加页面加载完成后需要执行的JavaScript代码
    console.log('页面已加载完成！');
    
    // 示例：为标题添加点击事件
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        mainTitle.addEventListener('click', function() {
            alert('你点击了标题！');
        });
    }
});
