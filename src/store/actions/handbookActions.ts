import axios from "axios";
import { IProduct, ProductResponse } from "../../types/types";
import { handbookSlice } from "../reducers/handbookSlice";
import { AppDispatch } from "../store";

export const fetchHandbook = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(handbookSlice.actions.handbookFetching())
        const response = await axios.get<ProductResponse>('https://dashalist.github.io/Sultan-Shop/products.json')
        dispatch(handbookSlice.actions.handbookFetchingSuccess({
            products: response.data.results,
            count: response.data.count
        }))
    } catch (e) {
        
    }
}