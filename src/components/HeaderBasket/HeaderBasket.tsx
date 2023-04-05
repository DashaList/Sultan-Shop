import React from 'react'
import { useNavigate } from 'react-router-dom'
import icon from '../../assets/img/svg/basket-black.svg'
import { useAppSelector } from '../../hooks/redux'
import { BASKET_ROUTE } from '../../utils/consts'
import style from './HeaderBasket.module.scss'
import { useWindowWidth } from '@react-hook/window-size'

const HeaderBasket = () => {

  const navigate = useNavigate();
  const clickHandler = () => navigate(BASKET_ROUTE)

  const {basketProducts} = useAppSelector( state => state.basketReducer)
  const quantity = basketProducts.reduce((sum, item) => sum + item.count, 0)
  const sum =  Math.round(basketProducts.reduce((sum, item) => sum + item.product.price * item.count, 0) * 100) / 100

  const windowWidth = useWindowWidth()

  return (
    <div className={style.Basket}>
      <button onClick={clickHandler} className={style.icon}>
        <img src={icon} alt="" />
        <span className={style.quantity}>{quantity}</span>
      </button>
      
      {windowWidth > 900 &&<div className={style.right}>
        <button onClick={clickHandler} className={style.title}>Корзина</button>
        <span className={style.sum}>{sum} ₸</span>
      </div>}
    </div>
  )
}

export default HeaderBasket