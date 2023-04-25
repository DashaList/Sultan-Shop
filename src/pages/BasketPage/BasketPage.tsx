import React, { useState } from 'react'
import BasketProduct from '../../components/BasketProduct/BasketProduct'
import Button from '../../components/UI/Button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {basketSlice} from '../../store/reducers/basketSlice'
import style from './BasketPage.module.scss'
import './BasketPage.module.scss'
import '../../App/App.scss'
import BasketModal from '../../modals/BasketModal/BasketModal'
import Modal from 'react-responsive-modal'
import close from '../../assets/img/svg/close-icon.svg'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

const BasketPage = () => {

  const {basketProducts} = useAppSelector( state => state.basketReducer)
  const sum =  Math.round(basketProducts.reduce((sum, item) => sum + item.product.price * item.count, 0) * 100) / 100
  const dispatch = useAppDispatch()

  const [modalActive, setModalActive] = useState(false)

  const orderHandler = () => {
    basketProducts.forEach(item => {
      dispatch(basketSlice.actions.basketRemove({barcode: item.product.barcode}))
    })

    setModalActive(true)
  }

  const closeIcon = (
    <img src={close}></img>
  )

  return (
    <div className={style.BasketPage}>
      <div className="container">
        <Breadcrumbs></Breadcrumbs>
        <h1>Корзина</h1>
        <div className={style.basketProducts}>
          {basketProducts.map( basketProduct =>
              <BasketProduct key={basketProduct.product.barcode} product={basketProduct.product}></BasketProduct>
          )}
        </div>

        {(basketProducts.length > 0) && <div className={style.bottom}>
          <Button name='Оформить заказ' img='' type='Large' onClickProps={orderHandler}></Button>
          <span className={style.sum}>{sum} ₸</span>
        </div>}
        {(basketProducts.length < 1) && <span className={style.empty}>Корзина пуста</span>}
      </div>

      <Modal open={modalActive} onClose={() => setModalActive(false)} center closeIcon={closeIcon} classNames={{closeButton: style.closeIcon}}>
        <BasketModal></BasketModal>
      </Modal>
    </div>
  )
}

export default BasketPage