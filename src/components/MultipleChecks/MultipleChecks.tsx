import React, { useEffect, useState } from 'react'
import style from './MultipleChecks.module.scss'
import Search from '../UI/Search/Search';

interface MultipleChecksProps {
    name: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MultipleChecks: React.FC<MultipleChecksProps> = ({name, options, onChange}) => {

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  const [currentValue, setCurrentValue] = useState('')
  const [searchedOptions, setSearchedOptions] = useState(options)

  useEffect( () => {
    setSearchedOptions(options)
  }, [options])


  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value)
    if (e.currentTarget.value == '') {
      setSearchedOptions(options)
    }
  }

  const searchClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchedOptions(options.filter(item => item.toLowerCase().includes(currentValue.toLowerCase())))
  }

  return (
    <div className={style.Checks}>
      <Search onChangeProps={searchChangeHandler} onClickProps={searchClickHandler}></Search>

      <div className={style.checkList}>
        {searchedOptions.map( item =>
          <div key={item} className={style.item}>
              <input id={item} type="checkbox" name={name} value={item} onChange={changeHandler}/>
              <label htmlFor={item}>{item}</label>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default MultipleChecks