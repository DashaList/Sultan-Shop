import axios from "axios";
import { ProductResponse } from "../../types/types";
import { AppDispatch } from "../store";
import {adminSlice} from "../reducers/adminSlice";

export const fetchAdminProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(adminSlice.actions.adminProductsFetching())
        const response = await axios.get<ProductResponse>('https://raw.githubusercontent.com/DashaList/Sultan-Shop/main/db.json')
        dispatch(adminSlice.actions.adminProductsFetchingSuccess({
            products: response.data.results
        }))
    } catch (e) {
        dispatch(adminSlice.actions.adminProductsFetchingError(e as Error))
    }
}