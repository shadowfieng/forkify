
import Search from '../models/Search'
import * as searchView from '../views/SearchView'
import { elements, renderLoader, clearLoader } from '../views/base'
import {state} from '../index'
/**
 * Search Controller
 */
export const controlSearch = async () => {
    //1. Get query from view
    const query = searchView.getInput();
    
    if (query) {
        //2. New search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4. Search for recipes
            const result = await state.search.getResults()

            //5. Save result in global state
            state.search.result = result;

            //6. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result.recipes);
        }
        catch (error) {
            alert(error);
            clearLoader();
        }
    }
}

const initEventListeners = () =>{
    elements.searchForm.addEventListener('submit', e => {
        e.preventDefault();
        controlSearch();
    });
    
    elements.searchResPages.addEventListener('click', e => {
        const btn = e.target.closest('.btn-inline');
        if (btn) {
            const goToPage = parseInt(btn.dataset.goto, 10);
            searchView.clearResults();
            searchView.renderResults(state.search.result.recipes, goToPage);
        }
    });
}

//0. Init event listeners for search control
initEventListeners();

