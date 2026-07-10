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
    const viewRecipesBtn = document.getElementById("recipe-button");
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

// اسکریپت مدیریت منوی همبرگری برای هدر
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav'); // انتخاب دقیق منوی اصلی

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
});

/* ==========================
   Newsletter
========================== */

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("newsletter-email").value.trim();

        try {

            const response = await fetch("https://foodieland-oq9b.onrender.com/api/subscribe", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email
                })

            });

            if (!response.ok) {
                throw new Error("Subscription failed");
            }

            alert("Subscribed successfully!");

            newsletterForm.reset();

        }
        catch (error) {

            console.error(error);

            alert("Subscription failed.");

        }

    });

}