import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  path: string;
  price: number;
  id: number;
  multiplier: number;
  name: string;
  image: string;
}

interface SkladItem {
  name: string;
  type: number;
  count: number;
  id?: string;
}

interface FinishProduct {
  name: string;
  quantity: number;
}

interface SkladState {
  products: Product[];
  scladItems: SkladItem[];
  skladChina: SkladItem[];
  finishProducts: FinishProduct[];
  myMoney: number;
}

const initialState: SkladState = {
  products: [
    { path: "bit004", price: 4, id: 2, multiplier: 4, name: "Bit-004", image: "https://picsum.photos/seed/image1/60/40" },
    { path: "kisti003", price: 8, id: 1, multiplier: 1, name: "Kisti-003", image: "https://picsum.photos/seed/image2/60/40" },
    { path: "nozh", price: 7, id: 3, multiplier: 1, name: "Нож", image: "https://picsum.photos/seed/image3/60/40" },
    {
      path: "salfetka-stirka",
      price: 15,
      id: 4,
      multiplier: 1,
      name: "Салфетки для стирки",
      image: "https://picsum.photos/seed/image4/60/40"
    },
    { path: "bit004", price: 4, id: 5, multiplier: 4, name: "Bit-004", image: "https://picsum.photos/seed/image1/60/40" },
    { path: "kisti003", price: 8, id: 6, multiplier: 1, name: "Kisti-003", image: "https://picsum.photos/seed/image2/60/40" },
    { path: "nozh", price: 7, id: 7, multiplier: 1, name: "Нож", image: "https://picsum.photos/seed/image3/60/40" },
    {
      path: "salfetka-stirka",
      price: 15,
      id: 8,
      multiplier: 1,
      name: "Салфетки для стирки",
      image: "https://picsum.photos/seed/image4/60/40"
    },
  ],
  scladItems: [
    { name: "kisti", type: 1, count: 1000, id: "1" },
    { name: "schetka", type: 1, count: 1000, id: "2" },
    { name: "sponzh", type: 1, count: 1000, id: "3" },
    { name: "bit1", type: 2, count: 1000, id: "4" },
    { name: "nozh", type: 3, count: 1000, id: "5" },
    { name: "salfetka-stirka", type: 4, count: 1000, id: "6" },
    { name: "bumagka-stirka", type: 4, count: 1000, id: "7" },
    { name: "test1", type: 8, count: 1000, id: "8" },
    { name: "test2", type: 9, count: 1000, id: "9" },
    { name: "test3", type: 10, count: 1000 },
  ],
  skladChina: [
    { name: "test1", type: 8, count: 10000, id: "8" },
    { name: "test2", type: 8, count: 10000, id: "9" },
  ],
  finishProducts: [],
  myMoney: 0,
};

export const skladSlice = createSlice({
  name: "sklad",
  initialState,
  reducers: {
    changeSklad: (
      state,
      action: PayloadAction<[number, number]>
    ) => {
      const changedItems = state.scladItems.filter(
        (item) => item.type === action.payload[0]
      );
      changedItems.forEach((el) => {
        el.count -= action.payload[1];
      });
    },

    addMoney: (state, action: PayloadAction<number>) => {
      state.myMoney += action.payload;
    },

    addFinishProduct: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      const existing = state.finishProducts.find(
        (el) => el.name === action.payload.name
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.finishProducts.push({
          name: action.payload.name,
          quantity: action.payload.quantity,
        });
      }
    },

    movingItem: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const skladItem = state.scladItems.find(
        (item) => item.id === action.payload.id
      );
      const chinaItem = state.skladChina.find(
        (item) => item.id === action.payload.id
      );
      if (skladItem && chinaItem) {
        skladItem.count += action.payload.count;
        chinaItem.count -= action.payload.count;
      }
    },
  },
});

export const { changeSklad, addMoney, addFinishProduct, movingItem } = skladSlice.actions;
export default skladSlice.reducer;