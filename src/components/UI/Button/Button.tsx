import React from 'react'
import style from './Button.module.scss'

interface ButtonProps {
  name: string;
  img: string;
  type: string;
  onClickProps?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({name, img, type, onClickProps}) => {
  return (
    <button className={style[type]} onClick={onClickProps}>
      {name}
      <img src={img} alt="" />
    </button>
  )
}

export default Button