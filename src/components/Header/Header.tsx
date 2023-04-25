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
import CallRequest from '../CallRequest/CallRequest'
import { useNavigate } from 'react-router-dom'
import { CATALOG_ROUTE, MAIN_ROUTE } from '../../utils/consts'
import classNames from 'classnames'
import { useWindowWidth } from '../../hooks/redux'

const Header = () => {

  const navigate = useNavigate();

  const windowWidth = useWindowWidth()

  return (
    <div className={style.Header}>
      
      {windowWidth > 900 && <div className={style.HeaderLarge}>
        <div className={classNames('container', `${style.container}`)}>
          <div className={style.left}>
            <div className={style.logo} onClick={() => navigate(MAIN_ROUTE)}>
              <img src={logo} alt="Султан" />
            </div>
            <Button name='Каталог' img={catalogLight} type="Large" onClickProps={() => navigate(CATALOG_ROUTE)}></Button>
            <Search></Search>
          </div>
          <div className={style.right}>
            <CallRequest></CallRequest>
            <Button name='Прайс-лист' img={downloadIcon} type="Large"></Button>
            <HeaderBasket></HeaderBasket>
          </div>
        </div>
      </div>}

      {windowWidth <= 900 && <div className={style.HeaderSmall}>
        <div className={style.left}>
          <button onClick={() => navigate(CATALOG_ROUTE)}>
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