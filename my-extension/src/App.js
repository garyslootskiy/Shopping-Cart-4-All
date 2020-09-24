/*global chrome*/

import React, { Component } from 'react';
import './App.css';
// import init from './content-script.js';

function App() {
  return (
    <div className="App">
      <Title />
      <Cart />
    </div>
  );
}

function Title() {
  return (
    <div>
      <h1 id="title">SHOPPING CART FOR ALL</h1>
    </div>
  )
}

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      total: 0
    }

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem() {
    
    const cart = this.state.cart.slice();
    let item = {
      qty: 1,
      name: localStorage.getItem('name'),
      imageUrl: localStorage.getItem('image'),
      price: parseFloat(localStorage.getItem('price')).toFixed(2),
      url: localStorage.getItem('url'),
      store: localStorage.getItem('store')
    }
    cart.push(item);

    const stringified = JSON.stringify(cart);
    
    localStorage.setItem('cart', stringified);

    let total = 0;
    cart.forEach(item => {
      total += parseInt(item.price);
    });

    const newState = {
      ...this.state,
      cart,
      total
    }
    this.setState(newState);
  }

  removeItem(index) {

    const cart = this.state.cart.slice();
    cart.splice(index,1);

    const stringified = JSON.stringify(cart);
    
    localStorage.setItem('cart', stringified);

    let total = 0;
    cart.forEach(item => {
      total += parseInt(item.price);
    });

    const newState = {
      ...this.state,
      cart,
      total
    }
    this.setState(newState);
  }

  componentDidMount() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) cart = [];
    let total = 0;
    cart.forEach(item => {
      total += parseInt(item.price);
    });
    
    const newState = {
      ...this.state,
      cart,
      total
    }
    this.setState(newState);
  }

  render() {
    const shopList = [];
    this.state.cart.forEach((item,index) => {
      const { qty, name, imageUrl, price, url, store } = item;
      shopList.push(<Item className="listItems" qty={qty} name={name} imageUrl={imageUrl} price={price} url={url} store={store} indexItem={index} key={`Item${index}`} removeItem={this.removeItem}/>);
    });

    
    
    // EACH OBJECT GETS:
    // item.qty
    // item.name
    // item.imageUrl
    // item.price
    // item.url
    // item.store
    
    return (
      <div>
        {shopList}
        <AddItem addItem = {this.addItem}/>
    <span>Total: ${this.state.total}</span>
      </div>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <div className="itemDiv">
        <span><img className="images" src={this.props.imageUrl} alt="Display Item"/></span>
        <span className={this.props.className}><a href={this.props.url} >{this.props.name}</a></span>
        <span className={this.props.className + " price"}>${this.props.price}</span>
        <span>{this.props.store}</span>
        <button className={this.props.className + " remove"} onClick={() => this.props.removeItem(this.props.indexItem)}> - </button>
      </div>
    )
  }
}

class AddItem extends Component {
  render() {
    return (
      <div>
      <hr></hr>
      <button onClick={() => this.props.addItem()}>Add Item</button>
    </div>
    )
  }
}

export default App;


// /////////
// tapIntoBrowser = () => {
//   // var config = {
//   //   code: this.state.uniqueCode
//   // };
// // chrome.tabs.executeScript({
// //     code: 'var config = ' + JSON.stringify(config)
// //   }, function() {
//     chrome.tabs.executeScript({
//       file: 'content-script.js'
//     });
//   // })
// }