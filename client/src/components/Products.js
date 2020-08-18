import React, { Component } from 'react';
import './product.css';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getProducts} from '../actions/index';
import Product from './Product.js';

export class Products extends Component {

  componentDidMount(){
    this.props.getProducts();
  }

/*
  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getMovies(this.state.title);
  }
*/

  render() {
    return (
      <div class="catalog">
          {this.props.products && this.props.products.map(item => <Product
           id={item.id}
           name={item.name}
           description={item.description}
           price={item.price}
           stock={item.stock}
           />)}
      </div>
    );
  }
}

//Funciones que mapean al store
function mapStateToProps(state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: products => dispatch(getProducts())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
