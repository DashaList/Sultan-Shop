import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/types';
import Button from '../UI/Button/Button';
import style from './AdminProduct.module.scss';
import deleteIcon from '../../assets/img/svg/delete-icon.svg'
import editIcon from '../../assets/img/svg/edit.svg'
import VolumeIcon from '../../assets/img/svg/Volume-icon.svg'
import WeightIcon from '../../assets/img/svg/Weight-icon.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {adminSlice} from '../../store/reducers/adminSlice';
import { PRODUCT_ROUTE } from '../../utils/consts';
import Modal from 'react-responsive-modal';
import AdminProductModal from '../../modals/AddProductModal/AdminProductModal';

interface AdminProductProps {
    product: IProduct;
}

const AdminProduct: React.FC<AdminProductProps> = ({product}) => {

  const {adminProducts} = useAppSelector( state => state.adminReducer)
  const dispatch = useAppDispatch()

  const removeHandler = () => {
    dispatch(adminSlice.actions.adminRemove({product}))
    //console.log('addHandler', adminProducts)
  }

  const editHandler = () => {
    dispatch(adminSlice.actions.adminEdit({product}))
  }

  const navigate = useNavigate();
  const clickHandler = () => navigate(`${PRODUCT_ROUTE}/${product.barcode}`)

  const [addModalActive, setAddModalActive] = useState(false)

  let size: string = product.size.toString();
  size += (product.sizeType === "Volume") ? " мл" : " г";

  return (
    <div className={style.Product}>
        <button className={style.edit} onClick={() => setAddModalActive(true)}>
            <img src={editIcon} alt="" />
        </button>
        <div className={style.productImg}>
          <img src={product.imgUrl} alt="" />
          {/* <img src={`/src/assets/img/products${product.imgUrl}`} alt="" /> */}
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
          <div className={style.price}>
              <div className="">{product.price} ₸</div>
              <Button name='' img={deleteIcon} type={'Small'} onClickProps={removeHandler}></Button>
          </div>
        </div>

      <Modal open={addModalActive} onClose={() => setAddModalActive(false)} center>
        <AdminProductModal setActive={setAddModalActive} product={product}></AdminProductModal>
      </Modal>

    </div>
    
  )
}

export default AdminProduct