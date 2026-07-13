/**
 * Theme Switcher
 * Cycles through: default (brown) → green → dark → default
 */

(function() {
    const themes = ['theme-default', 'theme-green', 'theme-dark'];
    let currentIndex = 0;

    // 检测 localStorage 中保存的主题
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        const index = themes.indexOf(savedTheme);
        if (index !== -1) {
            currentIndex = index;
            applyTheme(savedTheme);
        }
    } else {
        // 默认使用第一个主题（不添加任何 class）
        applyTheme('theme-default');
    }

    // 获取切换按钮
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // 循环到下一个主题
            currentIndex = (currentIndex + 1) % themes.length;
            const nextTheme = themes[currentIndex];
            applyTheme(nextTheme);
            localStorage.setItem('preferred-theme', nextTheme);
        });
    }

    function applyTheme(themeName) {
        // 移除所有主题 class
        document.body.classList.remove('theme-green', 'theme-dark', 'theme-default');
        
        if (themeName === 'theme-default') {
            // 默认主题不添加任何 class（因为默认样式就是它）
            // 但为了统一，可以添加一个空 class 或者不添加
            return;
        }
        
        // 添加对应的主题 class
        document.body.classList.add(themeName);
    }
})();

// ========================================
// 汉堡菜单切换
// ========================================
(function() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggle.classList.toggle('active');
            nav.classList.toggle('open');
        });
        
        // 点击菜单链接 → 自动关闭
        nav.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                nav.classList.remove('open');
            });
        });
        
        // 点击页面其他地方 → 关闭菜单
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                toggle.classList.remove('active');
                nav.classList.remove('open');
            }
        });
        
        // 窗口放大到桌面端时 → 关闭菜单
        window.addEventListener('resize', function() {
            if (window.innerWidth > 820) {
                toggle.classList.remove('active');
                nav.classList.remove('open');
            }
        });
    }
})();