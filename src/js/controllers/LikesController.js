import Likes from "../models/Likes";
import * as likesView from "../views/LikesView";
import { state } from "..";

//Testing
console.log(state)

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  //User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    //Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    //Toggle the like button
    likesView.toggleLikeBtn(true);
    //Add like to UI list
    likesView.renderItem(newLike);

    //User HAS liked current recipe
  } else {
    //Remove like from the state
    state.likes.deleteLike(currentID);
    //Toggle the like button
    likesView.toggleLikeBtn(false);
    //Remove like from UI list
    likesView.deleteLike(newLike);
  }
};

document.addEventListener("click", (e) => {
  if (e.target.closest(".recipe__love, recipe__love *")) {
    //Like controller
    controlLike();
  }
});
