import React from 'react'

export interface ProductBreadcrumbProps {
    productName: string
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ productName }) => {
  return (
    <span>{productName}</span>
  )
}

export default ProductBreadcrumb