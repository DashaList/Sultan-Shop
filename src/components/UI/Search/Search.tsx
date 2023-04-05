import React from 'react'
import style from './Search.module.scss'

interface SearchProps {
  onChangeProps?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickProps?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Search: React.FC<SearchProps> = ({onChangeProps, onClickProps}) => {
  return (
    <form className={style.Search}>
      <input type="text" placeholder='Поиск...' onChange={onChangeProps}/>
      <button className={style.btn} onClick={onClickProps}></button>
    </form>
  )
}

export default Search