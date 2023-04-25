import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../utils/consts';
import style from './AdminButton.module.scss'

const AdminButton = () => {

    const navigate = useNavigate();
    
  return (
    <div className={style.AdminButton}>
        <div className={style.container}>
            <button onClick={() => navigate(ADMIN_ROUTE)}>Страница администратора</button>
        </div>
    </div>
  )
}

export default AdminButton