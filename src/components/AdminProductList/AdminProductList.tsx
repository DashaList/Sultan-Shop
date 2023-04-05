import React from 'react'
import { IProduct } from '../../types/types'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import style from './AdminProductList.module.scss'
import AdminProduct from '../AdminProduct/AdminProduct';
import { useWindowWidth } from '@react-hook/window-size';

interface AdminProductsListProps {
  products: IProduct[];
  loading: boolean;
  error: null | string
}

const AdminProductsList: React.FC<AdminProductsListProps> = ({products, loading, error}) => {

  const windowWidth = useWindowWidth()
  let perPage: number;
  if (windowWidth <= 520) perPage = 15
  else if (windowWidth <= 900) perPage = 10
  else if (windowWidth <= 1000) perPage = 15
  else if (windowWidth <= 1250) perPage = 12
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
            <AdminProduct key={product.barcode} product={product}></AdminProduct>
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

export default AdminProductsList