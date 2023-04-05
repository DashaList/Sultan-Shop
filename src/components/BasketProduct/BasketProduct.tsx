import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/types';
import Button from '../UI/Button/Button';
import style from './BasketProduct.module.scss'
import deleteIcon from '../../assets/img/svg/delete-icon.svg'
import VolumeIcon from '../../assets/img/svg/Volume-icon.svg'
import WeightIcon from '../../assets/img/svg/Weight-icon.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {basketSlice} from '../../store/reducers/basketSlice';
import { PRODUCT_ROUTE } from '../../utils/consts';

interface BasketProductProps {
    product: IProduct;
}

const BasketProduct: React.FC<BasketProductProps> = ({product}) => {

    const {basketProducts} = useAppSelector( state => state.basketReducer)
    const dispatch = useAppDispatch()
    
    let size: string = product.size.toString();
    size += (product.sizeType.toString() === "Volume") ? " мл" : " г";

    const navigate = useNavigate();
    const clickHandler = () => navigate(`${PRODUCT_ROUTE}/${product.barcode}`)

    //const [count, setCount] = useState(0)
    let count = 0
    basketProducts.forEach((item, index) => {
        if (item.product.barcode == product.barcode) count = item.count
    })

    const QuantityChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.name == 'plus') dispatch(basketSlice.actions.basketAdd({product}))
        if (e.currentTarget.name == 'minus') dispatch(basketSlice.actions.basketDecrease({barcode: product.barcode}))
    }

    const removeHandler = () => {
        dispatch(basketSlice.actions.basketRemove({barcode: product.barcode}))
        console.log('removeHandler', basketProducts)
    }

  return (
    <div className={style.BasketProduct}>
        <div className={style.left}>
            <div className={style.productImg}>
            <img src={product.imgUrl} alt="" />
            </div>

            <div className={style.content}>
                <div className={style.size}>
                    <div className="">
                        {product.sizeType == 'Volume' && <img src={VolumeIcon} alt="" />}
                        {product.sizeType == 'Weight' && <img src={WeightIcon} alt="" />}
                    </div>
                    <span>{size}</span>
                </div>
                <div className={style.name} onClick={clickHandler}>
                    <span>{product.brand} </span>
                    {product.name}
                </div>
                <div className={style.description}>
                    {product.description}
                </div>
            </div>
        </div>

        <div className={style.right}>
            <div className={style.quantity}>
            <button name='minus' onClick={QuantityChangeHandler}>-</button>
            <span>{count}</span>
            <button name='plus' onClick={QuantityChangeHandler}>+</button>
            </div>

            <div className={style.price}>
                <div className="">{product.price} ₸</div>
            </div>
            <Button name='' img={deleteIcon} type={'Large'} onClickProps={removeHandler}></Button>
        </div>
    </div>
  )
}

export default BasketProduct