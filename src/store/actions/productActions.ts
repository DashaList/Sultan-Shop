import axios from "axios";
import { IProduct, ProductResponse } from "../../types/types";
import {productSlice} from "../reducers/productSlice";
import { AppDispatch } from "../store";

export const fetchProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.productsFetching())
        const response = await axios.get<ProductResponse>('https://dashalist.github.io/Sultan-Shop/products.json')
        dispatch(productSlice.actions.productsFetchingSuccess({
            products: response.data.results,
            count: response.data.count
        }))
    } catch (e) {
        dispatch(productSlice.actions.productsFetchingError(e as Error))
    }
}