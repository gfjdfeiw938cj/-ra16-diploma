import { useDispatch, useSelector } from "react-redux";
import Preloader from "../Preloader";
import { fetchCategories, setActiveCategory } from '../../thunks/categoriesThunk';
import {fetchProducts, setStateOffset} from '../../thunks/productsThunk';
import {useEffect, useState} from "react";

export default function CategoriesFilter() {

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data)
  const loading = useSelector(state => state.categories.loading)
  const error = useSelector(state => state.categories.error)
  const query = useSelector(state => state.products.searchQuery)

  const [active, setActive] = useState(0)

  useEffect(() => {
    dispatch(fetchCategories());
  },[dispatch])

  const handleCategoryClick = (id) => {
    setActive(id);
    dispatch(setActiveCategory(id));
    dispatch(fetchProducts(id, query));
    dispatch(setStateOffset(id, query, 12));
  };

  return (
    <>
      {error && <div className="alert alert-danger">Призошла ошибка {error}</div>}
      {loading === 'pending' ? <Preloader/> :
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            {/* eslint-disable-next-line*/}
            <a type="button" className={active === 0 ? "nav-link active" : "nav-link" }  onClick={() => handleCategoryClick(0)}>Все</a>
          </li>
          {categories && categories.map(cat =>
            <li className="nav-item" key={cat.id}>
              {/* eslint-disable-next-line*/}
              <a type="button" className={active === cat.id ? "nav-link active" : "nav-link" } onClick={() => handleCategoryClick(cat.id)}>{cat.title}</a>
            </li>)}
        </ul>}
    </>
  )
}
