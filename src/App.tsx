import { ChangeEvent, useState } from 'react';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar';
import FilterableRestaurantsTable from './components/FilterableRestaurantsTable';
import ReceiptPrinter from './components/ReceiptPrinter';
import filterRestaurant from './utils/filterRestaurant';
import Menu from './types/Menu';
import Receipt from './types/Receipt';

export default function App() {
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('전체');
  const [cart, setCart] = useState<Menu[]>([]);
  const [receipt, setReceipt] = useState<Receipt | undefined>(undefined);

  const filteredRestaurants = filterRestaurant({ filterText, filterCategory });

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterText(value);
  };

  const handleChangeCategory = (name: string) => {
    setFilterCategory(name);
  };

  const handleAddCart = (menuItem: Menu) => {
    setCart([
      ...cart,
      menuItem,
    ]);
  };

  const handleDeleteCart = (index: number) => {
    const menus = cart.filter((_, i) => i !== index);
    setCart(menus);
  };

  return (
    <>
      <h1>푸드코트 키오스크</h1>
      <h2>🛒 점심 바구니</h2>
      <Cart
        cart={cart}
        setCart={setCart}
        setReceipt={setReceipt}
        onDeleteCart={handleDeleteCart}
      />
      <SearchBar
        filterText={filterText}
        onChange={handleChangeText}
        onClick={handleChangeCategory}
      />
      <FilterableRestaurantsTable
        restaurants={filteredRestaurants}
        onAddCart={handleAddCart}
      />
      <ReceiptPrinter
        receipt={receipt}
      />
    </>
  );
}
