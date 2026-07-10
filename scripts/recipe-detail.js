const recipeTitle = document.getElementById("recipe-title");

if (recipeTitle) {

    async function loadRecipe() {

        try {

            const response = await fetch(
                "https://foodieland-oq9b.onrender.com/api/recipe-details/1"
            );

            if (!response.ok) {
                throw new Error("Failed to load recipe");
            }

            const recipe = await response.json();

            document.getElementById("recipe-title").textContent =
                recipe.title;

            document.getElementById("author-name").textContent =
                recipe.author.name;

            document.getElementById("author-date").textContent =
                recipe.author.date;

            document.getElementById("author-image").src =
                recipe.author.image;

            document.getElementById("author-image").alt =
                recipe.author.name;

            document.getElementById("prep-time").textContent =
                recipe.prepTime;

            document.getElementById("cook-time").textContent =
                recipe.cookTime;

            document.getElementById("recipe-category").textContent =
                recipe.category;

            document.getElementById("recipe-image").src =
                recipe.mainImage;

            document.getElementById("recipe-description").textContent =
                recipe.description;

            document.getElementById("nutrition-list").innerHTML = `
                <li>
                    <span>Calories</span>
                    <span>${recipe.nutrition.calories}</span>
                </li>

                <li>
                    <span>Total Fat</span>
                    <span>${recipe.nutrition.totalFat}</span>
                </li>

                <li>
                    <span>Protein</span>
                    <span>${recipe.nutrition.protein}</span>
                </li>

                <li>
                    <span>Carbohydrate</span>
                    <span>${recipe.nutrition.carbohydrate}</span>
                </li>

                <li>
                    <span>Cholesterol</span>
                    <span>${recipe.nutrition.cholesterol}</span>
                </li>
            `;

        }
        catch (error) {

            console.error(error);

        }

    }

    loadRecipe();

}