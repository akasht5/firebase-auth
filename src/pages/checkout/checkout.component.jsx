import React from 'react'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCartItems,selectCartItemsTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.styles.scss'

const CheckoutPage = ({ cartItems,cartItemsTotal }) => {
    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span> 
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.length ? ( cartItems.map(item => (
                    <CheckoutItem key={item.id} item={item} />
                ))
                ) : (
                    <span className="empty-cart">No items in your cart !</span>
                )
            }
            <div className="total">Total : ${cartItemsTotal}</div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems : selectCartItems,
    cartItemsTotal : selectCartItemsTotal
})

export default connect(mapStateToProps)(CheckoutPage)
