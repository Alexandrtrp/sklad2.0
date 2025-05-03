import React, { useState, ChangeEvent } from "react";
import { useDispatch } from 'react-redux'
import "./calculate.css";
import { addFinishProduct, addMoney, changeSklad } from "../../services/skladSlice";
import { AppDispatch } from "../../services/store";

interface CalculateProductProps {
  id: number;
  name: string;
  price: number;
  multiplier: number
}

export const CalculateProduct: React.FC<CalculateProductProps> = ({
  id,
  name,
  price,
  multiplier
}) => {
      const [sumOfProduct, setSumOfProduct] = useState<number>(0);
      const [plusProduct, setPlusProduct] = useState<string>('');
      // const [deleteProduct, setDeleteProduct] = useState<string>('');

      const sumMoney = sumOfProduct * price
      const dispatch = useDispatch<AppDispatch>();

      const handleAdd = () => {
        const amount = parseInt(plusProduct, 10);
        if (!isNaN(amount) && amount > 0) {
          setSumOfProduct(sumOfProduct + amount)
        }
        setPlusProduct('')
      }

      // const handleRemove = () => {
      //   const amount = parseInt(plusProduct, 10);
      //   if (!isNaN(amount) && amount > 0 && amount <= sumOfProduct) {
      //     setSumOfProduct(sumOfProduct - amount)
      //   }
      //   setDeleteProduct('')
      // }

      const handleSave = () => {
        dispatch(changeSklad([id, sumOfProduct*multiplier]))
        dispatch(addMoney(sumMoney))
        dispatch(addFinishProduct({name, quantity: sumOfProduct}))
        setSumOfProduct(0)
      }

      const isValidAdd = () => {
        const amount = parseInt(plusProduct, 10);
        return !isNaN(amount) && amount > 0;
      };
    
      // const isValidRemove = () => {
      //   const amount = parseInt(deleteProduct, 10);
      //   return !isNaN(amount) && amount > 0 && amount <= sumOfProduct;
      // };
  return (
      <div className="productValues">
        <h1>{name}</h1>
        <div className="productValuesWrapper">
          <input
            value={plusProduct}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPlusProduct(e.target.value)}
          />
          <button
            className="button"
            onClick={handleAdd}
            disabled={!isValidAdd()}
          >
            Добавить
          </button>
        </div>
        {/* <div className="productValuesWrapper">
          <input
            value={deleteProduct}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDeleteProduct(e.target.value)}
          />
          <button
            className="button"
            onClick={handleRemove}
            disabled={!isValidRemove()}
          >
            Убрать
          </button>
        </div> */}
        <div className="productValuesWrapper totlaValue">
          <span className="totlaValueText">Сделал: {sumOfProduct}</span>
          <span className="totlaValueText">
            Заработал: {sumMoney} руб
          </span>
        </div>
        <button onClick={handleSave} className="button" disabled={sumOfProduct <= 0}>Сохранить работу</button>
      </div>
  );
};
