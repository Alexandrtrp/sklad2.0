import "./App.css";
import React, { JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Main";
import { SideBar } from "./components/SideBar/SideBar";
import { Sklad } from "./pages/basePage/Sklad";
import { Auth } from "./pages/authorization/Authorization";
import { Registration } from "./pages/registration/Registration";
import { useSelector } from "react-redux";
import { CalculateProduct } from "./pages/basePage/CalculateProduct";
import { Profile } from "./pages/profile/Profile";
import { RootState } from "./services/store";

function App(): JSX.Element {
  const products = useSelector((state: RootState) => state.sklad.products);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/main" element={<Main />}>
          <Route path="sidebar" element={<SideBar />} />
          {products.map((product) => (
            <Route
              key={product.id}
              path={product.path}
              element={
                <CalculateProduct
                  price={product.price}
                  id={product.id}
                  multiplier={product.multiplier}
                  name={product.name}
                />
              }
            />
          ))}
          <Route path="sklad" element={<Sklad />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;