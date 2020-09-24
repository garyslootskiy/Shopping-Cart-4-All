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
      <h1>SHOPPING CART FOR ALL</h1>
    </div>
  )
}

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: []
    }

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(url) {

    
    const cart = this.state.cart.slice();
    let item = {
      qty: 1,
      name: "item name ",
      imageUrl: "./logo.svg",
      price: "$55",
      url: url,
      store: "Amazon"
    }
    cart.push(item);

    const stringified = JSON.stringify(cart);
    
    localStorage.setItem('cart', stringified);

    const newState = {
      ...this.state,
      cart
    }
    this.setState(newState);
  }

  removeItem(index) {

    const cart = this.state.cart.slice();
    cart.splice(index,1);

    const stringified = JSON.stringify(cart);
    
    localStorage.setItem('cart', stringified);

    const newState = {
      ...this.state,
      cart
    }
    this.setState(newState);
  }

  componentDidMount() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) cart = [];
    
    const newState = {
      ...this.state,
      cart
    }
    this.setState(newState);
  }

  render() {
    const shopList = [];
    this.state.cart.forEach((item,index) => {
      const { qty, name, imageUrl, price, url, store } = item;
      shopList.push(<Item qty={qty} name={name} imageUrl={imageUrl} price={price} url={url} store={store} indexItem={index} key={`Item${index}`} removeItem={this.removeItem}/>);
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
      </div>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <div>
        <hr></hr>
        <span>{this.props.name}</span>
        <span>{this.props.qty}</span>
        <span>{this.props.imageUrl}</span>
        <span>{this.props.price}</span>
        <span>{this.props.url}</span>
        <span>{this.props.store}</span>
        <button onClick={() => this.props.removeItem(this.props.indexItem)}>REMOVE ITEM</button>
      </div>
    )
  }
}

class AddItem extends Component {
  render() {
    return (
      <div>
      <hr></hr>
      <button onClick={() => this.props.addItem(window.location.href)}>Add Item</button>
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