document.addEventListener('DOMContentLoaded', () => {
    // ---- ۱. متغیرهای اولیه ----
   
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.btn-search');
    
    
    const articlesNodeList = document.querySelectorAll('.blog-card'); // کلاس کارت مقالات
    if (articlesNodeList.length === 0) return; // اگر مقاله‌ای نبود کد متوقف شود
    
    const articlesContainer = articlesNodeList[0].parentNode; // کانتینری که مقالات داخلش هستند
    const originalArticles = Array.from(articlesNodeList); // ذخیره ترتیب اصلی مقالات
    
    const paginationContainer = document.querySelector('.pagination');
    const pageLinks = document.querySelectorAll('.pagination .page-link:not(.next-page)');
    
    let currentPage = 1;

    // ---- ۲. تابع نمایش مقالات (تغییر ترتیب) ----
    function showPage(page) {
        currentPage = page;
        
        let orderedArticles = [...originalArticles];

        // تغییر ترتیب مقالات بر اساس شماره صفحه برای شبیه‌سازی محتوای جدید
        if (page === 2) {
            // صفحه دوم: دو مقاله اول می‌روند به آخر
            orderedArticles = [...originalArticles.slice(2), ...originalArticles.slice(0, 2)];
        } else if (page === 3) {
            // صفحه سوم: ترتیب کاملا برعکس می‌شود
            orderedArticles = [...originalArticles].reverse();
        }

        orderedArticles.forEach(article => {
            article.style.display = 'flex'; // مطمئن می‌شویم قابل دیدن هستند
            articlesContainer.appendChild(article); 
        });

        // بروزرسانی استایل دکمه‌های صفحه‌بندی
        if (pageLinks.length > 0) {
            pageLinks.forEach(link => link.classList.remove('active'));
            const activeLink = Array.from(pageLinks).find(link => link.textContent.trim() === String(page));
            if (activeLink) activeLink.classList.add('active');
        }
    }

    // مقداردهی اولیه: نمایش صفحه ۱ 
    showPage(1);

    // ---- ۳. منطق کلیک روی دکمه‌های صفحه‌بندی ----
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pageText = link.textContent.trim();
            if (!isNaN(pageText)) {
                e.preventDefault();
                const pageNum = parseInt(pageText);
                
                if (pageNum >= 1 && pageNum <= 3) {
                    if (searchInput) searchInput.value = ''; // پاک کردن متن سرچ موقع تغییر صفحه
                    if (paginationContainer) paginationContainer.style.display = 'flex';
                    showPage(pageNum);
                }
            }
        });
    });

    // ---- ۴. تابع جستجو ----
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            // اگر باکس جستجو خالی شد، برگرد به حالت صفحه‌بندی فعلی
            if (paginationContainer) paginationContainer.style.display = 'flex';
            showPage(currentPage);
        } else {
            // اگر متنی تایپ شد، صفحه‌بندی مخفی شده و کل ۶ مقاله فیلتر می‌شوند
            if (paginatioCnontainer) paginationContainer.style.display = 'none';
            
            originalArticles.forEach(article => {
                const title = article.querySelector('h2').textContent.toLowerCase();
                if (title.includes(searchTerm)) {
                    article.style.display = 'flex';
                } else {
                    article.style.display = 'none';
                }
            });
        }
    }

    // اتصال رویداد جستجو هم به تایپ کردن (آنی) و هم به کلیک روی دکمه سرچ
    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault(); // جلوگیری از رفرش صفحه در فرم‌های احتمالی
            performSearch();
        });
    }
});
