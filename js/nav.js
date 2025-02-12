document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    let isMenuOpen = false;

    // 切换菜单状态
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-active'); // 防止body滚动
    }

    // 关闭菜单
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-active');
        }
    }

    // 菜单按钮点击事件
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
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
                // 添加延迟以确保菜单完全关闭后再滚动
                setTimeout(() => {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    // 点击导航菜单外部关闭菜单
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });

    // 监听滚动事件，滚动时关闭菜单
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 50 && isMenuOpen) {
            closeMenu();
        }
        lastScrollTop = scrollTop;
    });

    // 添加触摸事件支持
    let touchStartY = 0;
    let touchEndY = 0;

    navMenu.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    navMenu.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const diffY = touchStartY - touchEndY;

        // 如果向上滑动超过50px，关闭菜单
        if (diffY > 50 && isMenuOpen) {
            closeMenu();
        }
    }, { passive: true });
});
