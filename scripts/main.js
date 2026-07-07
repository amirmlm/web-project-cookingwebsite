// main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // انتخاب تمام لینک‌های ناوبری (منوی هدر و فوتر)
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // جلوگیری از رفتار پیش‌فرض HTML (پرش صفحه)
            
            // دریافت آدرس مقصد از ویژگی data-path
            const targetPath = item.getAttribute('data-path');
            
            // هدایت کاربر به صفحه جدید در صورت وجود مسیر
            if (targetPath) {
                window.location.href = targetPath;
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
   
    const recipeCards = document.querySelectorAll('.recipe-card, .recipe-card-v2, .mini-recipe-card, .sidebar-recipe-item');
    
    recipeCards.forEach(card => {
        card.style.cursor = 'pointer'; 
        
        card.addEventListener('click', (e) => {
            // جلوگیری از تداخل کلیک روی دکمه لایک
            if (!e.target.closest('.favorite-btn')) {
                e.preventDefault(); // جلوگیری از اجرای href در تگ <a>
                window.location.href = 'Recipe-detail.html'; 
            }
        });
    });

    // ۲. هدایت دکمه View Recipes در صفحه اصلی
    const viewRecipesBtn = document.querySelector('.btn-primary');
    if (viewRecipesBtn) {
        viewRecipesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Recipe-detail.html';
        });
    }
});

document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // جلوگیری از تداخل با کلیک روی کارت مقاله/دستور پخت
        
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            btn.textContent = '❤️';
        } else {
            btn.textContent = '🤍';
        }
    });
});

