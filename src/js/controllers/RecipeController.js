import Recipe from "../models/Recipe";
import * as recipeView from "../views/RecipeView";
import * as listCtrl from "../controllers/ListController";
import { isLiked } from "../models/Likes";
import { elements, renderLoader, clearLoader } from "../views/base";
import { state } from "../index";
/**
 * Recipe Controller
 */

export const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace("#", "");

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    //Highlight selected search item
    if (state.search) {
      recipeView.highlightSelected(id);
    }

    // Create new recipe object
    state.recipe = new Recipe(id);

    // Get recipe data and parse ingredients
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      alert(error);
      alert("Error processing recipe!");
    }
  }
};

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

//Handling recipe button clicks
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    //increase button is clicked
    state.recipe.updateServings("inc");
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    listCtrl.controlList();
  }
  recipeView.updateServingsIngredients(state.recipe);
});
