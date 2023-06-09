import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProduct} from '../../types/types';
import Button from '../UI/Button/Button';
import style from './Product.module.scss';
import VolumeIcon from '../../assets/img/svg/Volume-icon.svg'
import WeightIcon from '../../assets/img/svg/Weight-icon.svg'
import basketIcon from '../../assets/img/svg/basket-white.svg'
import { useAppDispatch} from '../../hooks/redux';
import {basketSlice} from "../../store/reducers/basketSlice";
import { PRODUCT_ROUTE } from '../../utils/consts';


interface ProductProps {
    product: IProduct;
}

const Product: React.FC<ProductProps> = ({product}) => {

  const dispatch = useAppDispatch()

  const addHandler = () => {
    dispatch(basketSlice.actions.basketAdd({product}))
  }

  const navigate = useNavigate();

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
        <div className={style.name} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.barcode}`)}>
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