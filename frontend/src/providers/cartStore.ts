import { proxy, useSnapshot } from "valtio";

export interface CartItems {
  id: string;
  imageThumb: string;
  title: string;
  price: number;
  qty: number;
}

const getCartItems = () => {
  if (localStorage.getItem("cart_items")) {
    return JSON.parse(localStorage.getItem("cart_items") || "[]");
  }
  return [];
};

const setCartItems = (cartItemsData: CartItems[]) => {
  localStorage.setItem("cart_items", JSON.stringify(cartItemsData));
  state.cartItems = cartItemsData;
};

const actions = {
  addCartItem: (cartItemData: CartItems) => {
    const tempItems = getCartItems();
    tempItems.push(cartItemData);
    setCartItems(tempItems);
  },
  removeCartItem: (cartItemId: string) => {
    const tempItems = state.cartItems.filter(
      (item: CartItems) => item.id !== cartItemId
    );
    setCartItems(tempItems);
  },

  changeCartItemQty: (cartItemId: string, sum: number) => {
    const tempItems = state.cartItems.map((item: CartItems) => {
      if (item.id === cartItemId) {
        if (item.qty <= 1 && sum < 1) {
          return item;
        }
        item.qty += sum;
        return item;
      }
      return item;
    });

    setCartItems(tempItems);
  },
};

const state = proxy({
  cartItems: getCartItems(),
});

function cartStore() {
  const snap = useSnapshot(state);

  return {
    ...snap,
    ...actions,
  };
}

export default cartStore;
