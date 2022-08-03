import CatalogComponent from "../components/Catalog/CatalogComponent";
import SearchForm from "../components/Catalog/SearchForm";

export default function Catalog() {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <SearchForm />
      <CatalogComponent />
    </section>
  )
}
