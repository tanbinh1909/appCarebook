import {
    LOADING_CATEGORIES,
    LOAD_CATEGORIES_FULFILLED,
    LOAD_CATEGORIES_FAILED,
    LOADING_ARTICLES,
    LOAD_ARTICLES_FULFILLED,
    LOAD_ARTICLES_FAILED,
    TOGGLE_TABBAR,
} from "../actions/home.action";

const initState = {
    categories: [],
    categoriesLoading: false,
    categoriesLoaded: false,
    categoriesError: null,

    articles: [],
    articlesLoading: false,
    articlesLoaded: false,
    articlesError: null,
    currentCategoryID: null,

    hideTabBar: false
};

export default function homeReducer(state = initState, action) {
    switch (action.type) {
        case LOADING_CATEGORIES:
            return Object.assign({}, state, {
                categoriesLoading: true,
                categoriesLoaded: false,
                categoriesError: null
            });
        case LOAD_CATEGORIES_FULFILLED:
            return Object.assign({}, state, {
                categories: action.categories,
                categoriesLoading: false,
                categoriesLoaded: true,
                categoriesError: null
            });
        case LOAD_CATEGORIES_FAILED:
            return Object.assign({}, state, {
                categoriesLoading: false,
                categoriesLoaded: true,
                categoriesError: action.categoriesError
            });
        case LOADING_ARTICLES:
            return Object.assign({}, state, {
                articlesLoading: true,
                articlesLoaded: false,
                articlesError: null
            });
        case LOAD_ARTICLES_FULFILLED:
            return Object.assign({}, state, {
                articles: action.articles,
                articlesLoading: false,
                articlesLoaded: true,
                articlesError: null,
                currentCategoryID: action.currentCategoryID
            });
        case LOAD_ARTICLES_FAILED:
            return Object.assign({}, state, {
                articlesLoading: false,
                articlesLoaded: true,
                articlesError: action.articlesError
            });
        case TOGGLE_TABBAR:
            return Object.assign({}, state, {
                hideTabBar: action.hideTabBar
            });
        default:
            return state;
    }
}
