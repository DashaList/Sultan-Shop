import React from 'react'
import ProductList from '../../components/ProductList/ProductList'
import style from './CatalogPage.module.scss'
import '../../App/App.scss'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useSortProducts, useWindowWidth } from '../../hooks/redux'
import Filters from '../../components/Filters/Filters'
import { fetchHandbook } from '../../store/actions/handbookActions'
import { IFilter } from '../../types/types'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import {adminSlice} from '../../store/reducers/adminSlice'
import { fetchAdminProducts } from '../../store/actions/adminActions'
import classNames from 'classnames'


function CatalogPage() {
  
  const {adminProducts, loading, error} = useAppSelector(state => state.adminReducer)
  const {careType} = useAppSelector( state => state.handbookReducer)
  const dispatch = useAppDispatch()

  const [filter, setFilter] = useState<IFilter>({
    price: {
      from: 0,
      to: 10000
    },
    manufacturer: [],
    careType: ''
  })


  useEffect( () => {
    dispatch(fetchHandbook())
    if (adminProducts.length < 1) {
      dispatch(fetchAdminProducts())
    }
    
    dispatch(adminSlice.actions.adminFilter(filter))
  
  }, [])


  const {selectedSort, setSelectedSort, sortedProducts} = useSortProducts(adminProducts)

  const sortProducts = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setSelectedSort(value)
  }

  const [careTypeSelect, setCareTypeSelect] = useState('')

  const careTypeChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilter({...filter, careType: e.currentTarget.name})
    setCareTypeSelect(e.currentTarget.name)
  }

  const windowWidth = useWindowWidth()

  
  return (
    <div className="container">
      <div className={style.Catalog}>
        <Breadcrumbs></Breadcrumbs>
        <div className={style.titleSort}>
          <h1>Каталог товаров</h1>
          {windowWidth > 900 && <div className={style.sort}>
            <span>Сортировка:</span>

            <select className=''
              value={selectedSort}
              onChange={sortProducts}
            >
              <option value='priceLow'>По цене: от низкой к высокой</option>
              <option value='priceHigh'>По цене: от высокой к низкой</option>
              <option value='nameLow'>По названию: от А до Я</option>
              <option value='nameHigh'>По названию: от Я до А</option>
            </select>
          </div>}
        </div>

        {windowWidth > 900 && <div className={style.careType}>
        {careType.map( item =>
          <div key={item} className={classNames(style.careItem, careTypeSelect == item ? style.active : null)}>
            <button onClick={careTypeChangeHandler} name={item}>{item}</button>
          </div>
        )}
        </div>}


        <div className={style.main}>
          <div className={style.left}>
            <Filters filter={filter} setFilter={setFilter}
            careTypeSelect={careTypeSelect} setCareTypeSelect={setCareTypeSelect}></Filters>

            {windowWidth <= 900 && <div className={style.sort}>
              <span>Сортировка:</span>

              <select className=''
                value={selectedSort}
                onChange={sortProducts}
              >
                <option value='priceLow'>По цене: от низкой к высокой</option>
                <option value='priceHigh'>По цене: от высокой к низкой</option>
                <option value='nameLow'>По названию: от А до Я</option>
                <option value='nameHigh'>По названию: от Я до А</option>
              </select>
            </div>}

          </div>
          <div className={style.content}>
            {(sortedProducts.length > 0) && <ProductList products={sortedProducts} loading={loading} error={error}></ProductList>}
            {(sortedProducts.length < 1) && <span>Продуктов не найдено</span>}
          </div>
        </div>
      </div> 
    </div>
  )
}

export default CatalogPage
