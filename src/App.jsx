import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [card, setCard] = useState([]);
  const [basketProducts, setBasketProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.czaylabs.com.tr/api/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  function AddtoCard(product) {
    const cardItem = card.find(x => x.productId === product.id);
    if (cardItem) {
      setCard(
        card.map((x) => {
          if (x.productId === product.id) {
            return { ...x, quantity: x.quantity + 1 };
          }
          return x;
        })
      );
    } else {
      setCard([...card, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }]);
    }
  }

  const removeProductBasket = (id) => {
    setBasketProducts(basketProducts.filter(x => x.id !== id));
  };

  return (
    <>
      <h1 className='baslik'>Desserts</h1>
      <div className="container">
        <div className="Productcontainer">
          <ProductList products={products} AddtoCard={AddtoCard} />
        </div>
        <div className="card">
          <div className="card-inner">
            <h1>Your Cart <span id="salesTotal"></span></h1>
            <RenderProductCard
              card={card}
              removeProductBasket={removeProductBasket}
            />
            <h2 id="totalValue"></h2>
            <button className="confirmBtn">
              Order Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductList({ products, AddtoCard }) {
  return (
    <>
      {products?.map(product => (
        <div className="productItem" key={product.id} id={product.id}>
          <img src={product.image.desktop} alt={product.name} />
          <button className="itemAddBtn" onClick={() => AddtoCard(product)}>
            <img src="/img/shopping.svg" alt="" /> Add to Cart
          </button>
          <p>${product.category}</p>
          <h2>{product.name}</h2>
          <h3>${product.price}</h3>
        </div>
      ))}
    </>
  );
}

function RenderProductCard({ card, removeProductBasket }) {
  return (
    <>
      {card.map(x => (
        <div className="cardProductItem" key={x.productId}>
          <div className="cardProductInfo">
            <h3>{x.name}</h3>
            <div className="cardProductPrice">
              <h4>{x.quantity}x</h4>
              <p>@ ${x.price}</p>
              <strong>${x.quantity * x.price}</strong>
            </div>
          </div>
          <div className="deleteCard"  onClick={() => removeProductBasket(x.productId)}>
            <button className="deleteFromCard">
              <img src="/img/delete.svg" alt="Delete" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
