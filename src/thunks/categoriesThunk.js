import { categoriesError, categoriesLoading, categoriesReceived, activeCategory } from "../redux/categoriesSlice";

export const fetchCategories = () => (dispatch) => {

  dispatch(categoriesLoading());

  fetch(process.env.REACT_APP_URL + '/api/categories')
    .then(request => {
      if (request.status === 200) {
        return request.json();
      } else {
        dispatch(categoriesError('Произошла ошибка' + request.statusText));
        return;
      }
    })
    .then(json => {
      dispatch(categoriesReceived(json))
    })
    .catch((err) => dispatch(categoriesError(`Произошла ошибка: ${err}`)));
}

export const setActiveCategory = (str) => (dispatch) => {
  dispatch(activeCategory(str))
}
