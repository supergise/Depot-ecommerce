import React from 'react';
import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        if (isInCart(item.id)) {
            addQuantity(item);
        } else {
            setCart([...cart, item]);
        }
    }; 

    console.log(cart);  
    
    const isInCart = (id) => cart.some((product) => product.id === id);

    const addQuantity = (item) => {
        const currentCart = cart.map((product) => 
            product.id === item.id
                ? { ...product, quantity:product.quantity + item.quantity }
                : product
        );
        setCart(currentCart);
    };

    const deleteProduct = (id) => {
        console.log('eliminando producto ' + id)
        setCart(cart.filter((product) => product.id !== id));
    };
    
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, deleteProduct }}>
            { children }
        </CartContext.Provider>
    );
};

export default CartProvider;

