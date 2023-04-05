import React from 'react'
import style from './BasketModal.module.scss'
import thanks from '../../assets/img/svg/thanks.svg'

const BasketModal = () => {
  return (
    <div className={style.BasketModal}>
      <div className={style.icon}>
        <img src={thanks} alt="" />
      </div>
      <h4>Спасибо за заказ</h4>
      <p>Наш менеджер свяжется с вами в ближайшее время</p>
    </div>
  )
}

export default BasketModal