import Admin from "../pages/AdminPage/AdminPage"
import Basket from "../pages/BasketPage/BasketPage"
import Catalog from "../pages/CatalogPage/CatalogPage"
import Product from "../pages/ProductPage/ProductPage"
import Main from "../pages/MainPage/MainPage"
import { ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, MAIN_ROUTE, PRODUCT_ROUTE } from "../utils/consts"

interface IRoute {
    path: string;
    Component: React.FC;
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
        Component: Main
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: PRODUCT_ROUTE + '/:barcode',
        Component: Product
    }
]