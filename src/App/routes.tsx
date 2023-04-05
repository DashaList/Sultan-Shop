import Admin from "../pages/AdminPage"
import Basket from "../pages/BasketPage"
import Catalog from "../pages/CatalogPage"
import Product from "../pages/ProductPage"
import Main from "../pages/MainPage"
import { ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE } from "../utils/consts"
import ProductBreadcrumb, { ProductBreadcrumbProps } from "../components/Breadcrumbs/ProductBreadcrumb"

interface IRoute {
    path: string;
    Component: React.FC;
    breadcrumb: React.FC<ProductBreadcrumbProps> | string | undefined
}

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publicRoutes: IRoute[] = [
    {
        path: MAIN_ROUTE,
        Component: Main,
        breadcrumb: 'Главная'
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog,
        breadcrumb: 'Каталог'
    },
    {
        path: BASKET_ROUTE,
        Component: Basket,
        breadcrumb: 'Корзина'
    },
    {
        path: PRODUCT_ROUTE + '/:barcode',
        Component: Product,
        breadcrumb: ProductBreadcrumb
    }
]