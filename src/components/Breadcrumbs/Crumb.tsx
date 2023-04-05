import React from 'react'

interface CrumbProps {
    crumbName: string
    productName?: string
    className: string
}

const Crumb: React.FC<CrumbProps> = ({crumbName, productName, className}) => {



    const crumbElem = () => {
        switch (crumbName) {
            case 'main':
                return (<span className={className}>Главная</span>)
                break;
            case 'catalog':
                return (<span className={className}>Каталог</span>)
                break;
            case 'basket':
                return (<span className={className}>Корзина</span>)
                break;
            case 'product':
                return (<span className={className}></span>)
                break;
        
            default:
                return (<span className={className}>{productName}</span>)
                break;
        }
    }

    

  return (
    <>
        {crumbElem()}
    </>
  )
}

export default Crumb