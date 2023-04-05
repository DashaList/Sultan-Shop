import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProduct} from '../../types/types';
import Button from '../UI/Button/Button';
import style from './Product.module.scss';
import p1 from '../../assets/img/products/product_1.jpg'
import p2 from '../../assets/img/products/product_2.jpg'
import p3 from '../../assets/img/products/product_3.jpg'
import p5 from '../../assets/img/products/product_5.jpg'
import p6 from '../../assets/img/products/product_6.jpg'
import p7 from '../../assets/img/products/product_7.jpg'
import p8 from '../../assets/img/products/product_8.jpg'
import p9 from '../../assets/img/products/product_9.jpg'
import p10 from '../../assets/img/products/product_10.jpg'
import p11 from '../../assets/img/products/product_11.jpg'
import p12 from '../../assets/img/products/product_12.jpg'
import p13 from '../../assets/img/products/product_13.jpg'
import p14 from '../../assets/img/products/product_14.jpg'
import p15 from '../../assets/img/products/product_15.jpg'
import p16 from '../../assets/img/products/product_16.jpg'
import p17 from '../../assets/img/products/product_17.jpg'
import VolumeIcon from '../../assets/img/svg/Volume-icon.svg'
import WeightIcon from '../../assets/img/svg/Weight-icon.svg'
import basketIcon from '../../assets/img/svg/basket-white.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {basketSlice} from "../../store/reducers/basketSlice";
import { PRODUCT_ROUTE } from '../../utils/consts';

interface ProductProps {
    product: IProduct;
}

const Product: React.FC<ProductProps> = ({product}) => {

  const {basketProducts} = useAppSelector( state => state.basketReducer)
  const dispatch = useAppDispatch()

  const addHandler = () => {
    dispatch(basketSlice.actions.basketAdd({product}))
    console.log('addHandler', basketProducts)
  }

  const navigate = useNavigate();

  const clickHandler = () => navigate(`${PRODUCT_ROUTE}/${product.barcode}`)

  let size: string = product.size.toString();
  size += (product.sizeType.toString() === 'Volume') ? " мл" : " г";

  return (
    <div className={style.Product}>
        <div className={style.productImg}>
          <img src={product.imgUrl} alt="" />
        </div>
        <div className={style.size}>
          <div className="">
            {product.sizeType == 'Volume' && <img src={VolumeIcon} alt="" />}
            {product.sizeType == 'Weight' && <img src={WeightIcon} alt="" />}
          </div>
          <span>{size}</span>
        </div>
        <div className={style.name} onClick={clickHandler}>
          <span>{product.brand} </span>
          {product.name}</div>
        
        <div className={style.bottom}>
          <div className={style.characters}>
            <div className={style.desc}>
              Штрихкод:
              <span> {product.barcode}</span>
            </div>
            <div className={style.desc}>
              Производитель:
              <span> {product.manufacturer}</span>
            </div>
            <div className={style.desc}>
              Бренд:
              <span> {product.brand}</span>
            </div>
            <div className={style.desc}>
              Типы ухода:
              <span> {product.careTypes.map((item,index) =>
                <span key={item}>{`${item.toLowerCase() + (index === product.careTypes.length-1 ? "" : ",")}`} </span>)}
              </span>
            </div>
          </div>

          <div className={style.price}>
              <div className="">{product.price} ₸</div>
              <Button name={'В КОРЗИНУ'} img={basketIcon} type={'Small'} onClickProps={addHandler}></Button>
          </div>
        </div>
    </div>
    
  )
}

export default Product