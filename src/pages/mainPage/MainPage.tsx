import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFinishProduct } from "../../services/skladSlice";

interface Product {
  name: string;
  path: string;
  image: string;
  price: number;
  multiplier: number;
}

interface MainStateSideBar {
  sklad: {
    products: Product[];
  };
}

export const MainPage: React.FC = () => {
  const products = useSelector((state: MainStateSideBar) => state.sklad.products);
  const dispatch = useDispatch();

  const [filterInput, setFilterInput] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const isFilter = filterInput.trim().length > 0;

  const filteredProducts = isFilter
    ? products.filter((el) =>
        el.name.toLowerCase().includes(filterInput.toLowerCase())
      )
    : products;

  const handleQuantityChange = (name: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (name: string) => {
    const quantity = quantities[name];
    if (quantity > 0) {
      dispatch(addFinishProduct({ name, quantity }));
      setEditingProduct(null);
    }
  };

  return (
    <div className="productList">
      <div className="productFilter">
        <input
          placeholder="Фильтр"
          type="text"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
        <button onClick={() => setFilterInput("")} className="button">
          Очистить
        </button>
      </div>

      <div className="productGrid">
        {filteredProducts.map((prod) => {
          const isSelected = editingProduct === prod.name;
          const quantityValue = quantities[prod.name] ?? 0;
          const isButtonActive = quantityValue > 0;

          return (
            <div key={prod.name} className="productCard">
              <img src={prod.image} alt={prod.name} className="productImage" />
              <h3>{prod.name}</h3>
              <p>Цена: {prod.price}</p>

              <div className="quantitySection">
                {isSelected ? (
                  <input
                    type="number"
                    min={0}
                    value={quantityValue === 0 ? "" : quantityValue}
                    onChange={(e) =>
                      handleQuantityChange(prod.name, Number(e.target.value))
                    }
                    onBlur={() => {
                      setEditingProduct(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <p
                    onClick={() => setEditingProduct(prod.name)}
                    className="editableQuantity"
                  >
                    Кол-во: {quantityValue === 0 ? " " : quantityValue}
                  </p>
                )}
              </div>

              <button
                className="saveButton"
                onClick={() => handleSave(prod.name)}
                disabled={!isButtonActive}
              >
                Сохранить работу
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};