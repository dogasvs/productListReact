import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [card, setCard] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.czaylabs.com.tr/api/products")
        .then((res) => res.json())
        .then((res) => {
          setProducts(res.data);
        });
  }, []);

  function AddtoCard({product}) {
    const cardItem = card.find(x => x.productId === productId);
      if(cardItem) {
        setCard(
          card.map((x) => {
            if (cardItem.id === x.id) {
              x.quantity++;
            }
            return x;
          })
      );
      } else {
        //29uncu satırda bir sorun var çözemedim
        const productItem = products.find(x => x.id === product.id);
        setCard([...card, { 
          productId: productItem.id, 
          name: productItem.name, 
          price: productItem.price, 
          quantity: 1 
        }]);
      }
  }

  return (
    <>
    <h1 className='baslik'>Desserts </h1>
    <div className="container">
  <div className="Productcontainer">
    <ProductList products={products} AddtoCard={AddtoCard}/>
  </div>
    <div className="card">
      <div className="card-inner">
        <h1>Your Cart <span id="salesTotal"></span> </h1>
        <RenderProductCard card={card} />
          <h2 id="totalValue"></h2>
          <button className="confirmBtn">Order Confirm</button>
      </div>
    </div>
    </div>
    </>
  )
}

function ProductList({products, AddtoCard}) {
  //product liste ürünleri
  return (
    <> 
      {products?.map(product => (
        <div className="productItem" id={product.id}>
          <img src={product.image.desktop} alt={product.name} />
          <button className="ıtemAddBtn" onClick={() => AddtoCard(product)}> <img src="/img/shopping.svg" alt="" /> Add to Cart </button>
          <p>${product.category}</p>
          <h2>{product.name}</h2>
          <h3> $ ${product.price}</h3>
      </div>
      ))}
    </>
  )
}

function RenderProductCard({card}) {
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
      <div className="deleteCard">
        <button className="deleteFromCard">
          <img src="img/delete.svg" alt="Delete" />
        </button>
      </div>
    </div>
    ))}
    </>
  )
}


export default App
