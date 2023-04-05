import React from 'react'
import '../../App/App.scss'
import logo from '../../assets/img/svg/logo-dark.svg'
import catalogLight from '../../assets/img/svg/catalog-light.svg'
import catalogDark from '../../assets/img/svg/catalog-dark.svg'
import searchDark from '../../assets/img/svg/search-dark.svg'
import downloadIcon from '../../assets/img/svg/download-white.svg'
import HeaderBasket from '../HeaderBasket/HeaderBasket'
import Search from '../UI/Search/Search'
import Button from '../UI/Button/Button'
import style from './Header.module.scss'
import Call from '../Call/Call'
import { useNavigate } from 'react-router-dom'
import { CATALOG_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import classNames from 'classnames'
import { useWindowWidth } from '@react-hook/window-size'

const Header = () => {
  const navigate = useNavigate();
  const mainClickHandler = () => navigate(MAIN_ROUTE)
  const catalogClickHandler = () => navigate(CATALOG_ROUTE)

  const windowWidth = useWindowWidth()
  return (
    <div className={style.Header}>
      {windowWidth > 900 &&<div className={style.HeaderLarge}>
        <div className={classNames('container', `${style.container}`)}>
          <div className={style.left}>
            <div className={style.logo} onClick={mainClickHandler}>
              <img src={logo} alt="Султан" />
            </div>
            <Button name='Каталог' img={catalogLight} type="Large" onClickProps={catalogClickHandler}></Button>
            <Search></Search>
          </div>
          <div className={style.right}>
            <Call></Call>
            <Button name='Прайс-лист' img={downloadIcon} type="Large"></Button>
            <HeaderBasket></HeaderBasket>
          </div>
        </div>
      </div>}

      {windowWidth <= 900 &&<div className={style.HeaderSmall}>
        <div className={style.left}>
          <button onClick={catalogClickHandler}>
            <img src={catalogDark} alt="" />
            Каталог
          </button>
        </div>
        <div className={style.right}>
          <button>
            <img src={searchDark} alt="" />
            Поиск
          </button>
        </div>
      </div>}
    </div>
  )
}

export default Header