import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getProductDetail } from '../actions/index';
import './product.css';
import store from '../store/store.js'
import axios from 'axios';
import {Link,Route} from "react-router-dom";


class ProductDetail extends React.Component {

  componentDidMount(){
    const { match: { params: { id }}} = this.props;
    this.props.getProductDetail(id);
    console.log(this.props);
  }

    render() {
        return (
          <div>
            <div className="product-detail">
                Detalle del producto
                <div>
                    <img className="foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                </div>
                <div>
                    <h3>{this.props.name}</h3>
                    <p>{this.props.description}</p>
                    <p>{this.props.price}</p>
                    <p>{this.props.stock}</p>
                </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    product: state.getProductDetail
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProductDetail: (id) => dispatch(getProductDetail(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);



/*
export default function ProductDetail (props) {

    const[detail,setDetail] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/products/${props.id}`)
       .then((res)=>{
        setDetail(() => res.data)
        })
    },[])

    return (
      <div>
        <Route exact path='/FormProduct' render = { () =>
          <FormProduct name={detail.name} description={detail.description} price={detail.price} stock = {detail.stock} />} />
        <div className="card">
            <div>
                <img className="foto" src="https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            </div>
            <div>
                <h3>{detail.name}</h3>
                <p>{detail.description}</p>
                <p>{detail.price}</p>
                <p>{detail.stock}</p>
            </div>
        </div>
      </div>
    );
}
*/
