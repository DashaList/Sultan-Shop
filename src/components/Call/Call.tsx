import React from 'react'
import style from './Call.module.scss'
import photo from '../../assets/img/call-photo.jpg'
import classNames from 'classnames'

const Call = () => {
  return (
    <div className={style.Call}>
      <div className="Call_left">
        <span className={style.tel}>+7 (777) 490-00-91</span>
        <span className={style.workTime}>время работы: 9:00-20:00</span>
        <a href="!#" className={style.makeCall}>Заказать звонок</a>
      </div>
      <div className={classNames(style.photo, style.active)}>
        <img src={photo} alt="" />
      </div>
    </div>
  )
}

export default Call