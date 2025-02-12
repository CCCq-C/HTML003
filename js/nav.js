document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    let isMenuOpen = false;
    let touchStartY = 0;
    let touchEndY = 0;

    // 切换菜单状态
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // 添加/移除body的类，用于控制滚动
        document.body.classList.toggle('menu-open');
    }

    // 关闭菜单
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    // 菜单按钮点击事件
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        toggleMenu();
    });

    // 导航链接点击事件
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                closeMenu();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 触摸事件处理
    navMenu.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    navMenu.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;

        // 如果向上滑动超过50px，关闭菜单
        if (deltaY < -50) {
            closeMenu();
        }
    }, { passive: true });

    // 页面滚动事件
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 如果滚动超过30px，关闭菜单
            if (Math.abs(scrollTop - lastScrollTop) > 30) {
                closeMenu();
            }
            
            lastScrollTop = scrollTop;
        }, 100); // 添加100ms的防抖
    }, { passive: true });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.nav-container')) {
            closeMenu();
        }
    });

    // 阻止菜单内部点击事件冒泡
    navMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
