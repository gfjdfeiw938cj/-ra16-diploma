import { useDispatch, useSelector } from "react-redux";
import Preloader from "./Preloader";
import { fetchTopSales } from '../thunks/productsThunk'
import { useEffect } from "react";
import ProductItem from "./Catalog/ProductItem";

export default function TopSales() {
  const dispatch = useDispatch();
  const topSales = useSelector(state => state.products.topSales)
  const loading = useSelector(state => state.products.loading)
  const error = useSelector(state => state.products.error)

  useEffect(() => {
    dispatch(fetchTopSales())
  },[dispatch])

  return (
    topSales ? <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {error && <div className="alert alert-danger">Призошла ошибка {error}</div>}
      {loading === 'pending' ? <Preloader/> :
        <div className="row">
          {topSales.map(product => <ProductItem  key={product.id} product={product} />)}
        </div>}
    </section> : null
        )
}
