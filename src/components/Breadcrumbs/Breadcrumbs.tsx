import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Crumb from './Crumb';
import style from './Breadcrumbs.module.scss'
import { MAIN_ROUTE } from '../../utils/consts';

interface BreadcrumbsProps {
    productName?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({productName}) => {

    const location = useLocation()

    let currentLink = ''
    const crumbsArray = location.pathname.split('/')
        .filter(crumb => crumb != '')

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb != '')
        .map((crumb, index) => {
            currentLink += `/${crumb}`
            
            return (
                <span key={crumb}>
                    <Link to={currentLink}>
                        <Crumb crumbName={crumb} productName={productName} className={style.crumb}></Crumb>
                    </Link>
                    <span className={style.delimiter}>
                    {`${((index === crumbsArray.length-1 || crumb == 'product') ? "" : "|")}`}
                    </span>
                </span>
            )
        })

  return (
    <div className={style.Breadcrumbs}>
        <span>
        <Link to={MAIN_ROUTE}>
            <Crumb crumbName='main' productName={productName} className={style.crumb}></Crumb>
        </Link>
        <span className={style.delimiter}>|</span>
        </span>
        {crumbs}
    </div>
  )
}

export default Breadcrumbs

