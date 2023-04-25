import React from 'react'
import style from './CallRequest.module.scss'
import photo from '../../assets/img/call-photo.jpg'
import classNames from 'classnames'

const CallRequest = () => {
  return (
    <div className={style.Call}>
      <div>
        <span className={style.tel}>+7 (777) 490-00-91</span>
        <span className={style.workTime}>время работы: 9:00-20:00</span>
        <a href="!#" className={style.requestCall}>Заказать звонок</a>
      </div>
      <div className={classNames(style.photo, style.active)}>
        <img src={photo} alt="" />
      </div>
    </div>
  )
}

export default CallRequest