import React from 'react'
import '../../App/App.scss'
import style from './Footer.module.scss'
import logo from '../../assets/img/svg/logo-light.svg'
import logoSmall from '../../assets/img/svg/logo-light-small.svg'
import downloadIcon from '../../assets/img/svg/download-white.svg'
import arrow from '../../assets/img/svg/arrow.svg'
import watsapp from '../../assets/img/svg/watsappLogo.svg'
import telegram from '../../assets/img/svg/telegramLogo.svg'
import visa from '../../assets/img/svg/visa-icon.svg'
import mastercard from '../../assets/img/svg/mastercard-icon.svg'
import Button from '../UI/Button/Button'
import classNames from 'classnames'
import { useWindowWidth } from '../../hooks/redux'

const Footer = () => {

  const windowWidth = useWindowWidth()

  return (
    <div className={style.Footer}>
      <div className={classNames("container", style.wrapper)}>
        <div className={style.logoGroup}>
          {windowWidth > 1000 && <div className={style.logo}>
            <img src={logo} alt="" />
          </div>}

          {windowWidth <= 1000 &&
          <div className={style.logoPrice}>
            {windowWidth > 500 && <div className={style.logo}>
              <img src={logo} alt="" />
            </div>}
            {windowWidth <= 500 && <div className={style.logo}>
              <img src={logoSmall} alt="" />
            </div>}
           <Button name='Прайс-лист' img={downloadIcon} type='Large'></Button>
          </div>}
          
          <p className={style.desc}>Компания «Султан» — снабжаем розничные магазины товарами "под ключ" в Кокчетаве и Акмолинской области</p>
          <span className={style.subscribe}>Подпишись на скидки и акции</span>
          <div className={style.email}>
            <input type="text" placeholder='Введите ваш E-mail'/>
            <button className={style.inputBtn}>
              <img src={arrow} alt="" />
            </button>
          </div>
        </div>

        {windowWidth > 1000 && <><div className={style.menu}>
            <h4>Меню сайта:</h4>
            <ul>
              <li>О компании</li>
              <li>Доставка и оплата</li>
              <li>Возврат</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div className={style.menu}>
            <h4>Категории:</h4>
            <ul>
              <li>Бытовая химия</li>
              <li>Косметика и гигиена</li>
              <li>Товары для дома</li>
              <li>Товары для детей и мам</li>
              <li>Посуда</li>
            </ul>
          </div></>}
        
        {windowWidth <= 1000 && <div className={style.menuWrap}>
          <div className={style.menu}>
            <h4>Меню сайта:</h4>
            <ul>
              <li>О компании</li>
              <li>Доставка и оплата</li>
              <li>Возврат</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div className={style.menu}>
            <h4>Категории:</h4>
            <ul>
              <li>Бытовая химия</li>
              <li>Косметика и гигиена</li>
              <li>Товары для дома</li>
              <li>Товары для детей и мам</li>
              <li>Посуда</li>
            </ul>
          </div>
        </div>}

          {windowWidth > 1000 && <><div className={style.priceList}>
            <h4>Скачать прайс-лист:</h4>
            <Button name='Прайс-лист' img={downloadIcon} type='Large'></Button>
            <span className={style.connect}>Связь в мессенджерах:</span>
            <div className={style.logos}>
              <img src={watsapp} alt="" />
              <img src={telegram} alt="" />
            </div>
          </div>

          <div className="">
            <h4>Контакты:</h4>
            <span className={style.number}>+7 (777) 490-00-91</span>
            <span className={style.time}>время работы: 9:00-20:00</span>
            <span className={style.call}>Заказать звонок</span>
            <span className={style.email}>opt.sultan@mail.ru </span>
            <span className={style.anyTime}>На связи в любое время</span>
            <div className={style.logos}>
              <img src={visa} alt="" />
              <img src={mastercard} alt="" />
            </div>
          </div></>}

          {windowWidth <= 1000 && <div className={style.contactWrap}>
            <div className={style.priceList}>
            <span className={style.connect}>Связь в мессенджерах:</span>
            <div className={style.logos}>
              <img src={watsapp} alt="" />
              <img src={telegram} alt="" />
            </div>
          </div>

          <div className="">
            <h4>Контакты:</h4>
            <span className={style.number}>+7 (777) 490-00-91</span>
            <span className={style.time}>время работы: 9:00-20:00</span>
            <span className={style.call}>Заказать звонок</span>
            <span className={style.email}>opt.sultan@mail.ru </span>
            <span className={style.anyTime}>На связи в любое время</span>
            <div className={style.logos}>
              <img src={visa} alt="" />
              <img src={mastercard} alt="" />
            </div>
          </div></div>}

      </div>
    </div>
  )
}

export default Footer