import {productsError, productsLoading, productsReceived, setSearchQuery, setOffset, productsAppend, topSalesReceived} from "../redux/productsSlice";

export const appendProducts = (category, query, offset) => (dispatch) => {
  dispatch(productsLoading());

  const path = `/api/items?${offset ? 'offset='+offset : ''}${query ? '&q='+ query : ''}${category ? '&categoryId='+category : ''}`

  fetch(process.env.REACT_APP_URL + path)
    .then(request => {
      if (request.status === 200) {
        return request.json();
      } else {
        dispatch(productsError('Произошла ошибка' + request.statusMessage));
        return;
      }
    })
    .then(json => {
      dispatch(productsAppend(json))
    })
    .catch((err) => dispatch(productsError(`Произошла ошибка: ${err}`)));
}

export const fetchProducts = (category, query, offset, id) => (dispatch) => {
  dispatch(productsLoading());
  const path = `/api/items${id ? '/' + id : ''}?${offset ? 'offset='+offset : ''}${query ? '&q='+ query : ''}${category ? '&categoryId='+category : ''}`

  fetch(process.env.REACT_APP_URL + path)
    .then(request => {
      if (request.status === 200) {
        return request.json();
      } else {
        dispatch(productsError('Произошла ошибка' + request.statusMessage));
        return;
      }
    })
    .then(json => {
      dispatch(productsReceived(json))
    })
    .catch((err) => dispatch(productsError(`Произошла ошибка: ${err}`)));
}

export const fetchTopSales = () => (dispatch) => {
  dispatch(productsLoading());

  const path = `/api/top-sales`

  fetch(process.env.REACT_APP_URL + path)
    .then(request => {
      if (request.status === 200) {
        return request.json();
      } else {
        dispatch(productsError('Произошла ошибка' + request.statusMessage));
        return;
      }
    })
    .then(json => {
      dispatch(topSalesReceived(json))
    })
    .catch((err) => dispatch(productsError(`Произошла ошибка: ${err}`)));
}

export const setStateQuery = (str) => (dispatch) => {
  dispatch(setSearchQuery(str))
}

export const setStateOffset = (category, query, offset) => (dispatch) => {
  const pathNext = `/api/items?${offset ? 'offset='+offset : ''}${query ? '&q='+ query : ''}${category ? '&categoryId='+category : ''}`
  fetch(process.env.REACT_APP_URL + pathNext)
    .then(request => {
      if (request.status === 200) {
        return request.json();
      } else {
        dispatch(productsError('Произошла ошибка' + request.statusMessage));
        return;
      }
    })
    .then(json => {
      dispatch(setOffset(json))
    })
    .catch((err) => dispatch(productsError(`Произошла ошибка: ${err}`)));
}
