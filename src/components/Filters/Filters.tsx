import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useWindowWidth } from '../../hooks/redux'
import { IFilter } from '../../types/types'
import MultipleChecks from '../MultipleChecks/MultipleChecks'
import Button from '../UI/Button/Button'
import style from './Filters.module.scss'
import arrowDown from '../../assets/img/svg/arrow-down.svg'
import arrowUp from '../../assets/img/svg/arrow-up.svg'
import {adminSlice} from '../../store/reducers/adminSlice'
import classNames from 'classnames'
import deleteIcon from '../../assets/img/svg/delete-icon.svg'

interface FiltersProps {
  filter: IFilter;
  setFilter: (arg: IFilter) => void;
  careTypeSelect: string;
  setCareTypeSelect: (arg: string) => void;
}

const Filters: React.FC<FiltersProps> = ({filter, setFilter, careTypeSelect, setCareTypeSelect}) => {

  const {manufacturer, careType} = useAppSelector( state => state.handbookReducer)
  const dispatch = useAppDispatch()

  const [currentFilter, setCurrentFilter] = useState(filter)

  useEffect( () => {
    dispatch(adminSlice.actions.adminFilter(filter))
  }, [filter])

  
  const priceChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    setCurrentFilter({...currentFilter, price: {...currentFilter.price, [name]: +e.currentTarget.value}})
  }

  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setCurrentFilter({...currentFilter, manufacturer: [...currentFilter.manufacturer, value]})
    } else {
      setCurrentFilter({...currentFilter, manufacturer: currentFilter.manufacturer.filter(e => (e != value))})
    }

  }

  const filterProducts = () => {
    setFilter(currentFilter)
  }

  const careTypeChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFilter({...filter, careType: e.currentTarget.name})
    setCareTypeSelect(e.currentTarget.name)
  }

  const removeFilters = () => {
    setFilter({
      price: {
        from: 0,
        to: 10000
      },
      manufacturer: [],
      careType: ''
    })
  }

  const windowWidth = useWindowWidth()
  const [isOpen, seIsOpen] = useState(false)


  return (
    <div className={style.Filters}>
      <div className={style.titleWrap}>
        <h3 className={style.title}>ПОДБОР ПО ПАРАМЕТРАМ</h3>
        {windowWidth <= 900 &&
        <button className={style.openBtn} onClick={() => seIsOpen(!isOpen)}>
          {!isOpen && <img src={arrowDown} alt="" />}
          {isOpen && <img src={arrowUp} alt="" />}
        </button>}
      </div>
      
      {(isOpen || windowWidth > 900) && <div className={style.dropDown}>
        <div className={style.price}>
          <span className={style.priceText}>Цена <span>₸</span></span>
          <div className={style.priceNumbers}>
            <input type="text" defaultValue={0} name='from' onInput={priceChangeHandler}/>
            <span>-</span>
            <input type="text" defaultValue={10000} name='to' onInput={priceChangeHandler}/>
          </div>
        </div>

        <div className={style.manufacturer}>
          <MultipleChecks name='manufacturer' options={manufacturer} onChange={checkboxChangeHandler}></MultipleChecks>
        </div>

        <div className={style.buttons}>
          <Button name='Показать' img='' type='Large' onClickProps={filterProducts}></Button>
          <Button name='' img={deleteIcon} type={'Small'} onClickProps={removeFilters}></Button>
        </div>
      </div>}

      <div className={style.careType}>
        {careType.map( item =>
          <div key={item} className={style.careItem}>
            <button onClick={careTypeChangeHandler} name={item}
             className={classNames(style.careBtn, careTypeSelect == item ? style.active : null)}>{item}</button>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default Filters