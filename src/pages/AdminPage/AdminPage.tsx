import React, { useEffect, useState } from 'react'
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'
import Button from '../../components/UI/Button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchHandbook } from '../../store/actions/handbookActions'
import '../../App/App.scss'
import AdminProductModal from '../../modals/AdminProductModal/AdminProductModal'
import style from './AdminPage.module.scss'
import AdminProductList from '../../components/AdminProductList/AdminProductList';
import { fetchAdminProducts } from '../../store/actions/adminActions';

const AdminPage = () => {

  const {adminProducts, loading, error} = useAppSelector(state => state.adminReducer)
  const dispatch = useAppDispatch()

  useEffect( () => {
    dispatch(fetchHandbook())
  }, [])

  useEffect( () => {
    if (adminProducts && adminProducts.length < 1) {
      dispatch(fetchAdminProducts())
    }    
  }, [adminProducts])


  const [addModalActive, setAddModalActive] = useState(false) 

  return (
    <div className={style.AdminPage}>
      <div className={style.container}>
        <Button name='Добавить товар' img='' type='Large' onClickProps={() => setAddModalActive(true)}></Button>
        <AdminProductList products={adminProducts} loading={loading} error={error}></AdminProductList>
      </div>

      <Modal open={addModalActive} onClose={() => setAddModalActive(false)} center>
        <AdminProductModal setActive={setAddModalActive}></AdminProductModal>
      </Modal>
      
    </div>
  )
}

export default AdminPage