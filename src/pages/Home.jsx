import TopSales from "../components/TopSales";
import CatalogComponent from "../components/Catalog/CatalogComponent";

export default function Home() {
  return (
    <>
      <TopSales />
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <CatalogComponent />
      </section>
    </>
  )
}
