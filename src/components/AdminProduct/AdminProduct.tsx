import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/types';
import Button from '../UI/Button/Button';
import style from './AdminProduct.module.scss';
import deleteIcon from '../../assets/img/svg/delete-icon.svg'
import editIcon from '../../assets/img/svg/edit.svg'
import VolumeIcon from '../../assets/img/svg/Volume-icon.svg'
import WeightIcon from '../../assets/img/svg/Weight-icon.svg'
import { useAppDispatch } from '../../hooks/redux';
import {adminSlice} from '../../store/reducers/adminSlice';
import { PRODUCT_ROUTE } from '../../utils/consts';
import Modal from 'react-responsive-modal';
import AdminProductModal from '../../modals/AdminProductModal/AdminProductModal';

interface AdminProductProps {
    product: IProduct;
}

const AdminProduct: React.FC<AdminProductProps> = ({product}) => {

  const dispatch = useAppDispatch()

  const removeHandler = () => {
    dispatch(adminSlice.actions.adminRemove({product}))
  }

  const navigate = useNavigate();

  const [addModalActive, setAddModalActive] = useState(false)

  let size: string = product.size.toString();
  size += (product.sizeType === "Volume") ? " мл" : " г";

  return (
    <div className={style.Product}>
        <button data-testid='edit-btn' className={style.edit} onClick={() => setAddModalActive(true)}>
            <img src={editIcon} alt="" />
        </button>
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
        <div data-testid='name' className={style.name} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.barcode}`)}>
          <span>{product.brand} </span>
          {product.name}
        </div>
        
        <div className={style.bottom}>
          <div className={style.desc}>
            Штрихкод:
            <span> {product.barcode}</span>
          </div>
          <div data-testid='manufacturer' className={style.desc}>
            Производитель:
            <span> {product.manufacturer}</span>
          </div>
          <div className={style.desc}>
            Бренд:
            <span> {product.brand}</span>
          </div>
          <div data-testid='careTypes' className={style.desc}>
            Типы ухода:
            <span> {product.careTypes.map((item,index) =>
              <span key={item}>{`${item.toLowerCase() + (index === product.careTypes.length-1 ? "" : ",")}`} </span>)}
            </span>
          </div>
          <div data-testid='price-wrap' className={style.price}>
              <div >{product.price} ₸</div>
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