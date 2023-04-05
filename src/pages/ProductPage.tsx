import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/UI/Button/Button'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IProduct, ProductResponse } from '../types/types'
import { fetchProducts } from '../store/actions/productActions'
import style from './ProductPage.module.scss'
import '../App/App.scss'
import VolumeIcon from '../assets/img/svg/Volume-icon.svg'
import WeightIcon from '../assets/img/svg/Weight-icon.svg'
import basketIcon from '../assets/img/svg/basket-white.svg'
import share from '../assets/img/svg/share-icon.svg'
import download from '../assets/img/svg/download-black.svg'
import triangleUp from '../assets/img/svg/triangle-up.svg'
import triangleDown from '../assets/img/svg/triangle-down.svg'
import {basketSlice} from '../store/reducers/basketSlice'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'



const ProductPage = () => {
  
  const params = useParams()
  console.log(params.barcode)

  const {adminProducts} = useAppSelector(state => state.adminReducer)

  const [product, setProduct] = useState<IProduct>()
  const [loading, setLoading] = useState(true)

  const {basketProducts} = useAppSelector( state => state.basketReducer)
  const dispatch = useAppDispatch()

  // async function fetchProduct() {
  //   const response = await axios.get<ProductResponse>('../../products.json')
  //   const product = response.data.results.find(item => item.barcode.toString() == params.barcode)
  //   setProduct(product)
  //   setLoading(false)
  // }



  useEffect(() => {
    //fetchProduct()
    setProduct(adminProducts.find(item => item.barcode.toString() == params.barcode))
  }, [])


  const addHandler = () => {
    if (product) dispatch(basketSlice.actions.basketAdd({product}))
  }  
  
  let size: string | undefined = product?.size.toString();
  size += (product?.sizeType.toString() === 'Volume') ? " мл" : " г";

  //if (loading) return <p>Идёт загрузка</p>
  

  let count = 0
  basketProducts.forEach((item, index) => {
    if (item.product.barcode == product?.barcode) count = item.count
  })

  const QuantityChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (product) {
      if (e.currentTarget.name == 'plus') dispatch(basketSlice.actions.basketAdd({product}))
      if (e.currentTarget.name == 'minus') dispatch(basketSlice.actions.basketDecrease({barcode: product.barcode}))
    }    
  }

  const [isCharacterOpen, setIsCharacterOpen] = useState(false)
  const [isDescOpen, setIsDescOpen] = useState(false)


  return (
    <div className="container">
      <Breadcrumbs productName={product?.name}></Breadcrumbs>

      <div className={style.ProductPage}>

        <div className={style.photo}>
          <img src={product?.imgUrl} alt="" />
        </div>

        <div className={style.content}>
          <span className={style.inStock}>В наличии</span>
          <h2 className={style.name}>
            <span>{product?.brand} </span>
            {product?.name}
          </h2>
          <div className={style.size}>
            <div className="">
            {product?.sizeType == 'Volume' && <img src={VolumeIcon} alt="" />}
            {product?.sizeType == 'Weight' && <img src={WeightIcon} alt="" />}
            </div>
            <span>{size}</span>
          </div>

          <div className={style.priceWrap}>
            <div className={style.price}>{product?.price} ₸</div>

            <div className={style.quantity}>
            <button name='minus' onClick={QuantityChangeHandler}>-</button>
            <span>{count}</span>
            <button name='plus' onClick={QuantityChangeHandler}>+</button>
            </div>

            <Button name={'В КОРЗИНУ'} img={basketIcon} type={'Large'} onClickProps={addHandler}></Button>
          </div>

          <div className={style.share}>
            <div className=''>
              <img src={share} alt="" />
            </div>
            <p className={style.buy}>При покупке от <span>10 000 ₸</span> бесплатная доставка по Кокчетаву и области</p>
            <button className={style.download}>Прайс-лист
              <img src={download} alt="" />
            </button>
          </div>

          <div className={style.bottom}>
            <div className={style.desc}>
              Производитель:
              <span> {product?.manufacturer}</span>
            </div>
            <div className={style.desc}>
              Бренд:
              <span> {product?.brand}</span>
            </div>
            <div className={style.desc}>
              Штрихкод:
              <span> {product?.barcode}</span>
            </div>
          </div>

          <div className={style.description}>
            <button className={style.openBtn} onClick={() => setIsDescOpen(!isDescOpen)}>
              Описание
              {!isDescOpen && <img src={triangleDown} alt="" />}
              {isDescOpen && <img src={triangleUp} alt="" />}
            </button>
            {isDescOpen && <p>{product?.description}</p>}
          </div>

          <div className={style.character}>
            <button className={style.openBtn} onClick={() => setIsCharacterOpen(!isCharacterOpen)}>
              Характеристики
              {!isCharacterOpen && <img src={triangleDown} alt="" />}
              {isCharacterOpen && <img src={triangleUp} alt="" />}
            </button>
            {isCharacterOpen && <div className={style.characterList}>
              <div className={style.desc}>
                Штрихкод:
                <span> {product?.barcode}</span>
              </div>
              <div className={style.desc}>
                Производитель:
                <span> {product?.manufacturer}</span>
              </div>
              <div className={style.desc}>
                Бренд:
                <span> {product?.brand}</span>
              </div>
              <div className={style.desc}>
                Типы ухода:
                <span> {product?.careTypes.map((item,index) =>
                  <span key={item}>{`${item.toLowerCase() + (index === product.careTypes.length-1 ? "" : ",")}`} </span>)}
                </span>
              </div>
            </div>}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductPage