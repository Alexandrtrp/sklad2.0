import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import './sideBar.css'

interface Product {
  name: string,
  path: string
}

interface MainStateSideBar {
  sklad: {
    products: Product[]
  }
}

export const SideBar: React.FC = () => {
  const products = useSelector((state: MainStateSideBar) => state.sklad.products);
  const [filterInput, setFilterInput] = useState<string>("");
  const isFilter = filterInput ? true : false;
  const renderProducts = isFilter ? products.filter(el=>el.name.toLowerCase().includes(filterInput.toLocaleLowerCase())) : products
  return (
      <div className="productList">
        <div className="productFilter">
        <input
          placeholder="Фильтр"
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <button onClick={()=>setFilterInput('')} className="button">Очистить</button>
        </div>
        {renderProducts.map((prod) => (
          <ul>
            <Link key={prod.name} className="productListLink" to={prod.path}>
              {prod.name}
            </Link>
          </ul>
        ))}
      </div>
  );
};
