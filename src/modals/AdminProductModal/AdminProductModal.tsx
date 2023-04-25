import React, { useState } from 'react'
import style from './AdminProductModal.module.scss'
import { IAdminProduct, IProduct } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Button from '../../components/UI/Button/Button';
import {adminSlice} from '../../store/reducers/adminSlice';
import { SubmitHandler, useForm } from 'react-hook-form';

interface AdminProductModalProps {
    setActive: (arg: boolean) => void;
    product?: IProduct
}

const AdminProductModal: React.FC<AdminProductModalProps> = ({setActive, product}) => {

    const {careType} = useAppSelector( state => state.handbookReducer)
    const {register, handleSubmit} = useForm<IAdminProduct>()

    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<IAdminProduct> = (adminProduct) => {

        const newProduct: IProduct = {
            name: adminProduct.name,
            size: adminProduct.size,
            sizeType: adminProduct.sizeType,
            manufacturer: adminProduct.manufacturer,
            barcode: adminProduct.barcode,
            careTypes: adminProduct.careTypes,
            description: adminProduct.description,
            brand: adminProduct.brand,
            price: adminProduct.price,
            imgUrl: adminProduct.file.length > 0 ? URL.createObjectURL(adminProduct.file[0]) : product ? product?.imgUrl : ''
        }

        if (product) dispatch(adminSlice.actions.adminEdit({product: newProduct}))
        else dispatch(adminSlice.actions.adminAdd({product: newProduct}))

        setActive(false)
    }

    const [sizeStr, setSizeStr] = useState(product?.sizeType == "Volume" ? "мл" : product?.sizeType == 'Weight' ?  "г" : '')

    const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSizeStr((e.target.value === "Volume") ? " мл" : " г");
    }

    const buttonName = product ? 'Изменить товар' : 'Добавить товар'
    const titleName = product ? 'Редактировать товар' : 'Добавить товар'

  return (
    <div className={style.AddProductModal}>
        <h3 className={style.title}>{titleName}</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
            <label className={style.label} htmlFor="name">Название продукта</label>
            <input data-testid='name-input' required type="text" id="name" {...register('name')} defaultValue={product?.name}/>

            <label className={style.label} htmlFor="manufacturer">Производитель</label>
            <input required type="text" id="manufacturer" {...register('manufacturer')} defaultValue={product?.manufacturer}/>

            <label className={style.label} htmlFor="brand">Бренд</label>
            <input required type="text" id="brand" {...register('brand')} defaultValue={product?.brand}/>

            <label className={style.label} htmlFor="barcode">Штрихкод</label>
            <input required type="number" id="barcode" {...register('barcode')} defaultValue={product?.barcode}/>

            <label className={style.label} htmlFor="sizeType">Вес/Объём</label>
            <div className={style.radioGroup}>
                <input required type="radio" id="weight"{...register('sizeType')}
                value={'Weight'} onChange={radioHandler} defaultChecked={product?.sizeType == 'Weight'}/>
                <label className={style.labelRadio} htmlFor="weight">Вес</label>
                <input required type="radio" id="volume" {...register('sizeType')}
                value={'Volume'} onChange={radioHandler} defaultChecked={product?.sizeType == 'Volume'}/>
                <label className={style.labelRadio} htmlFor="volume">Объём</label>
            </div>
            <input required className={style.sizeInput} type="number" id="size" {...register('size')} defaultValue={product?.size}/>
            <span>{sizeStr}</span>

            <label className={style.label} htmlFor="price">Цена</label>
            <input required type="number" id="price" {...register('price')} defaultValue={product?.price}/>

            <label className={style.label} htmlFor="description">Описание</label>
            <input type="text" id="description" {...register('description')} defaultValue={product?.description}/>

            <div className={style.careTypes}>
                <label className={style.label} htmlFor="careTypes">Типы ухода</label>
                    
                {careType.map( item =>
                    <div key={item} className={style.item}>
                        <input type="checkbox" {...register('careTypes')} value={item} defaultChecked={product?.careTypes.includes(item)} />
                        <label htmlFor="">{item}</label>
                    </div>
                )}
            </div>

            <div className={style.image}>
                <label className={style.label} htmlFor="image">Изображение товара</label>
                <input type="file" id="image" {...register('file')} accept="image/png, image/jpeg"/>
            </div>

            <Button name={buttonName} img='' type='Large'></Button>

        </form>
    </div>
  )
}

export default AdminProductModal