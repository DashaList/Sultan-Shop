import React, { useRef } from 'react'
import { IProduct } from '../../types/types'
import Product from '../Product/Product'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import style from './ProductList.module.scss'
import { useWindowWidth } from '@react-hook/window-size';

interface ProductListProps {
  products: IProduct[];
  loading: boolean;
  error: null | string
}

const ProductList: React.FC<ProductListProps> = ({products, loading, error}) => {
  
  const windowWidth = useWindowWidth()
  let perPage: number;
  if (windowWidth <= 520) perPage = 15
  else if (windowWidth <= 720) perPage = 10
  else if (windowWidth <= 900) perPage = 15
  else if (windowWidth <= 1200) perPage = 10
  else perPage = 15

  const productsPerPage = perPage
  const [productOffset, setProductOffset] = useState(0);

  const endOffset = productOffset + productsPerPage;
  const currentProducts = products.slice(productOffset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);


  const pageChangeHandler = ({selected}: {selected: number}) => {
    const newOffset = (selected * productsPerPage) % products.length;
    setProductOffset(newOffset);
  };


  return (
    <div className={style.ProductList}>

      <div className={style.list}>
        {loading && <p>Идёт загрузка...</p>}
        {error && <p>{error}</p>}
        {currentProducts.map( product =>
            <Product key={product.barcode} product={product}></Product>
        )}
      </div>

      { (products.length > productsPerPage) && <ReactPaginate className={style.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={pageChangeHandler}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"

        pageClassName={style.pageNumber}
        pageLinkClassName={style.pageNumberLink}
        nextClassName={style.next}
        previousClassName={style.prev}
        activeClassName={style.activePageNumber}
      />}

    </div>
  )
}

export default ProductList