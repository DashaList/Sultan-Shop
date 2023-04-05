import React, { useEffect, useState } from 'react'
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'
import Button from '../components/UI/Button/Button'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchHandbook } from '../store/actions/handbookActions'
import { fetchProducts } from '../store/actions/productActions'
import '../App/App.scss'
import AdminProductModal from '../modals/AddProductModal/AdminProductModal'
import style from './AdminPage.module.scss'
import AdminProductList from '../components/AdminProductList/AdminProductList';
import { IProduct } from '../types/types';
import AdminProduct from '../components/AdminProduct/AdminProduct';
import {adminSlice} from '../store/reducers/adminSlice';
import { fetchAdminProducts } from '../store/actions/adminActions';

const AdminPage = () => {

  const {products, loading, error} = useAppSelector( state => state.productReducer)
  const {adminProducts} = useAppSelector(state => state.adminReducer)
  const dispatch = useAppDispatch()

  useEffect( () => {
    dispatch(fetchHandbook())
    dispatch(fetchProducts())
    //if (!adminProducts) dispatch(fetchAdminProducts())
    // if (adminProducts && adminProducts.length < 1) {
    //   dispatch(fetchAdminProducts())
    // }
  }, [])


  useEffect( () => {
    if (adminProducts && adminProducts.length < 1) {
      //dispatch(adminSlice.actions.adminAddAll({products}))
      dispatch(fetchAdminProducts())
    }    
  }, [adminProducts])

  

  const [addModalActive, setAddModalActive] = useState(false) 

  return (
    <div className={style.AdminPage}>
      <div className={style.container}>
        <Button name='Добавить товар' img='' type='Large' onClickProps={() => setAddModalActive(true)}></Button>
        <AdminProductList products={adminProducts} loading={loading} error={error}></AdminProductList>
        {/* <AdminProduct product={product}></AdminProduct> */}
      </div>

      {/* {addModalActive && <AddProductModal setActive={setAddModalActive}></AddProductModal>} */}
      <Modal open={addModalActive} onClose={() => setAddModalActive(false)} center>
        <AdminProductModal setActive={setAddModalActive}></AdminProductModal>
      </Modal>
    </div>
  )
}

export default AdminPage