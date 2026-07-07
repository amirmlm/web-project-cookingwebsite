document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById('recipeCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!track || !prevBtn || !nextBtn) return;

    let isTransitioning = false; // برای جلوگیری از کلیک‌های سریع و پشت سر هم

    // دکمه بعدی (حرکت به راست)
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        const firstItem = track.children[0];
        // محاسبه عرض کارت + فاصله (gap)
        const itemWidth = firstItem.offsetWidth + 30; 

        // انیمیشن حرکت به سمت چپ
        track.style.transition = 'transform 0.4s ease-in-out';
        track.style.transform = `translateX(-${itemWidth}px)`;

        // وقتی انیمیشن تمام شد، کارت اول را ببر آخر صف
        track.addEventListener('transitionend', function handleNext() {
            track.style.transition = 'none'; // خاموش کردن موقت انیمیشن
            track.style.transform = 'translateX(0)'; // ریست کردن جایگاه
            track.appendChild(firstItem); // انتقال کارت اول به آخر
            
            isTransitioning = false;
            track.removeEventListener('transitionend', handleNext);
        });
    });

    // دکمه قبلی (حرکت به چپ)
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        const lastItem = track.children[track.children.length - 1];
        const firstItem = track.children[0];
        const itemWidth = firstItem.offsetWidth + 30;

        // اول کارت آخر را به صورت نامرئی می‌آوریم اول صف
        track.insertBefore(lastItem, firstItem);
        
        // جایگاه را موقتاً شیفت می‌دهیم تا تغییر حس نشود
        track.style.transition = 'none';
        track.style.transform = `translateX(-${itemWidth}px)`;

        // یک رفرش کوچک برای مرورگر (Force Reflow)
        void track.offsetHeight;

        // حالا انیمیشن را روشن می‌کنیم و برمی‌گردیم به نقطه صفر
        track.style.transition = 'transform 0.4s ease-in-out';
        track.style.transform = 'translateX(0)';

        track.addEventListener('transitionend', function handlePrev() {
            isTransitioning = false;
            track.removeEventListener('transitionend', handlePrev);
        });
    });
});
