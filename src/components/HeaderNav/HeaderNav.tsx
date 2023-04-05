import React from 'react'
import style from './HeaderNav.module.scss'
import place from '../../assets/img/svg/place-icon.svg'
import mail from '../../assets/img/svg/mail-icon.svg'
import burger from '../../assets/img/svg/burger-icon.svg'
import logo from '../../assets/img/svg/logo-dark-small.svg'
import { useWindowWidth } from '@react-hook/window-size'
import HeaderBasket from '../HeaderBasket/HeaderBasket'

const HeaderNav = () => {

    const windowWidth = useWindowWidth()

  return (
    <div className={style.HeaderNav}>
        <div className='container'>
            {windowWidth > 900 &&<div className={style.HeaderNavLarge}>
                <div className={style.left}>
                    <div className={style.contact}>
                        <div className={style.icon}>
                            <img src={place} alt="" />
                        </div>
                        <div>
                            <span className={style.address}>г. Кокчетав, ул. Ж. Ташенова 129Б</span>
                            <span className={style.add}>(Рынок Восточный)</span>
                        </div>
                    </div>

                    <div className={style.contact}>
                        <div className={style.icon}>
                            <img src={mail} alt="" />
                        </div>
                        <div>
                            <span className={style.address}>opt.sultan@mail.ru</span>
                            <span className={style.add}>На связи в любое время</span>
                        </div>
                    </div>
                </div>

                <nav>
                    <ul>
                        <li><a href="!#">О компании</a></li>
                        <li><a href="!#">Доставка и оплата</a></li>
                        <li><a href="!#">Возврат</a></li>
                        <li><a href="!#">Контакты</a></li>
                    </ul>
                </nav>
            </div>}

            {windowWidth <= 900 && <div className={style.HeaderNavSmall}>
                <button className={style.burgerBtn}>
                    <img src={burger} alt="" />
                </button>
                <div className={style.logo}>
                    <img src={logo} alt="" />
                </div>

                <HeaderBasket></HeaderBasket>
            </div>}
        </div>
    </div>
  )
}

export default HeaderNav