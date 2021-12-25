import './App.css';
import { useState } from 'react';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './components/Cart/CartProvider';
import ErrorHandler from './components/UI/ErrorHandler/ErrorHandler';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login/Login';

function App() {
  const [isShowCart, setShowCart] = useState(false);
  const token = useSelector(state => state.token.value);

  const onShowCart = () => setShowCart(true);
  const onHideCart = () => setShowCart(false);

  const loginPage = (
    <ErrorHandler>
      <Login />
    </ErrorHandler>
  );

  const app = (
    <CartProvider>
      <ErrorHandler>
        {isShowCart && <Cart onClose={onHideCart} />}
        <Header onShowCart={onShowCart} />
        <main>
          <ErrorHandler>
            <Meals />
          </ErrorHandler>
        </main>
      </ErrorHandler>
    </CartProvider>
  );

  return (
    <>
      {!token && loginPage}
      {token && app}
    </>
  );
}

export default App;
