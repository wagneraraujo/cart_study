import React, { useState } from "react";

interface IBook {
    id: number;
    title: string;
    price: number;
}

interface IShoppingCartItem {
    product: IBook;
    quantity: number;
}

const books: IBook[] = [
    {
        id: 1,
        title: "Product 1",
        price: 9.99,
    },
    {
        id: 2,
        title: "Product 2",
        price: 19.99,
    },
    {
        id: 3,
        title: "Product 3",
        price: 29.99,
    },
];

function Shopping() {
    const [shoppingCart, setShoppingCart] = useState<IShoppingCartItem[]>([]);

    const handleAddToCart = (id: number) => {
        const book = books.find((book) => book.id === id);
        const alreadyInShoppingCart = shoppingCart.find(
            (item) => item.product.id === id
        );

        if (alreadyInShoppingCart) {
            const newShoppingCart = shoppingCart.map((item) =>
                item.product.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setShoppingCart(newShoppingCart);
            return;
        }

        const cartItem: IShoppingCartItem = {
            product: book!,
            quantity: 1,
        };

        const newShoppingCart = [...shoppingCart, cartItem];
        setShoppingCart(newShoppingCart);
    };

    const handleRemoveCart = (id: number) => {
        const alreadyInShoppingCart = shoppingCart.find(
            (item) => item.product.id === id
        );

        if (alreadyInShoppingCart?.quantity && alreadyInShoppingCart.quantity > 1) {
            const newShoppingCart = shoppingCart.map((item) =>
                item.product.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            setShoppingCart(newShoppingCart);
            return;
        }

        const newShoppingCart = shoppingCart.filter(
            (item) => item.product.id !== id
        );
        setShoppingCart(newShoppingCart);
    };

    const handleCleanCart = () => {
        setShoppingCart([]);
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div>
                <h3>Produtos</h3>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <h4>{book.title}</h4>
                            <p>{book.price}</p>
                            <button onClick={() => handleAddToCart(book.id)}>Adicionar ao Carrinho</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="cart" style={{ padding: "20px", background: "#f1f1f1", width: "50%" }}>
                <h3>Carrinho</h3>
                <ul>
                    {shoppingCart.length === 0 ? (
                        <p>Carrinho vazio</p>
                    ) :
                        (
                            shoppingCart.map((item) => (
                                <li key={item.product.id}>
                                    <h4>{item.product.title}</h4>
                                    <p>{item.product.price}</p>
                                    <p>QTD: {item.quantity}</p>
                                    <p>Total: {item.quantity * item.product.price}</p>
                                    <button onClick={() => handleRemoveCart(item.product.id)}>Remover do Carrinho</button>
                                </li>
                            ))
                        )}      
                </ul>
            </div>
        </div>
    );
}

export default Shopping