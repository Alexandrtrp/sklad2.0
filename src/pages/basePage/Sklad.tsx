import React, { useState, ChangeEvent } from "react";
import "./sklad.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../services/store";

interface Product {
  id: number;
  name: string;
  count: number;
}

interface finishProduct {
  id: number;
  name: string;
  quantity: number;
}

interface SkladState {
  sklad: {
    scladItems: Product[];
    myMoney :number;
    finishProducts: finishProduct[];
    skladChina: Product[]
  }
}

export const Sklad: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const skladProducts = useSelector((state: SkladState) => state.sklad.scladItems);
  const myMoneyOnSklad = useSelector((state: SkladState) => state.sklad.myMoney);
  const finishProducts = useSelector((state: SkladState) => state.sklad.finishProducts);
  const skladChina = useSelector((state: SkladState) => state.sklad.skladChina);

  const [changedValue, setChangedValue] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setChangedValue(isNaN(value) ? 0 : value)
  }

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleTransfer = () => {
    if (changedValue <= 0 || selectedIds.length === 0) return;

    selectedIds.forEach((id) => {
      console.log(`Перемещено ${changedValue} шт. товара ID ${id}`);
    });

    setSelectedIds([]);
    setChangedValue(0);
  };

  return (
    <div className="sklad">
      <ul>
        <h3>Готовая продукция</h3>
        {finishProducts.map((el) => (
          <li key={el.id} className="skladItem">
            Название: {el.name} <span>Готово: {el.quantity}</span>
          </li>
        ))}
      </ul>
      <span className="total">Общий заработок: {myMoneyOnSklad} руб</span>
      <h3>Склад Мироновская</h3>
      <ul>
        {skladProducts.map((el) => (
          <li key={el.id} className="skladItem text">
            Название: {el.name} <span>Остаток: {el.count}</span>
          </li>
        ))}
      </ul>
      <h3>Склад Китай</h3>
      <div>
        <input
          value={changedValue}
          onChange={handleChange}
          className="skladItemInput"
          type="number"
          min="1"
        />
        <button 
          onClick={handleTransfer} 
          disabled={changedValue <= 0 || selectedIds.length === 0}
        >
          Переместить
        </button>
      </div>
      <ul>
        {skladChina.map((el) => (
          <li key={el.id} className="skladItem chinaItems">
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(el.id)}
                onChange={() => handleCheckboxChange(el.id)}
              />
              <p className="skladItem text">
                Название: {el.name} <span>Остаток: {el.count}</span>
              </p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
