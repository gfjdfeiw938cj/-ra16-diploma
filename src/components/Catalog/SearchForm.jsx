import {fetchProducts, setStateOffset, setStateQuery} from '../../thunks/productsThunk';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

export default function SearchForm() {

  const dispatch = useDispatch();
  const query = useSelector(state => state.products.searchQuery)
  const activeCategory = useSelector(state => state.categories.active)

  const [word, setWord] = useState(query ? query : '')

  const handleSearch = (e) => {
    setWord(e)
    if(e.trim().length > 3) {
      dispatch(setStateQuery(word))
      dispatch(fetchProducts(activeCategory, e))
      dispatch(setStateOffset(activeCategory, e, 12));
    }
  }

  return (
    <form className="catalog-search-form form-inline">
      <input className="form-control" value={word} placeholder="Поиск" onChange={(e) => handleSearch(e.target.value)} />
    </form>
  )
}
