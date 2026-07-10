const categoryContainer = document.getElementById("category-list");

async function loadCategories() {

    if (!categoryContainer) return;

    try {

        const response = await fetch("https://foodieland-oq9b.onrender.com/api/categories");

        if (!response.ok) {
            throw new Error("Failed to load categories");
        }

        const categories = await response.json();

        categoryContainer.innerHTML = "";

        categories.forEach(category => {

            const bgClass = `bg-${category.name.toLowerCase()}`;

            categoryContainer.innerHTML += `
                <div class="category-item ${bgClass}">
                    <img src="${category.image}" alt="${category.name}">
                    <p>${category.name}</p>
                </div>
            `;

        });

    }
    catch(error){

        console.error(error);

        categoryContainer.innerHTML =
        "<p>Unable to load categories.</p>";

    }

}

loadCategories();