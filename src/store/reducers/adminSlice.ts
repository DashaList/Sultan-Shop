import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter, IProduct } from "../../types/types"

interface AdminState {
    adminProducts: IProduct[];
    adminProductsContainer: IProduct[];    
    loading: boolean;
    error: null | string;
}

const initialState: AdminState = {
    adminProducts: [],
    adminProductsContainer: [],
    loading: false,
    error: null,
}

interface AdminPayload {
    product: IProduct;
}

interface AdminPayloadAll {
    products: IProduct[];
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminProductsFetching(state) {
            state.loading = true;
        },

        adminProductsFetchingSuccess(state, action: PayloadAction<AdminPayloadAll>) {
            state.loading = false;
            state.error = '';
            state.adminProducts = action.payload.products;
            state.adminProductsContainer = action.payload.products;
        },

        adminProductsFetchingError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = "Не удалось загрузить каталог товаров";
        },

        adminAdd(state, action: PayloadAction<AdminPayload>) {
            let isBarcode = false
            state.adminProducts.forEach((item, index) => {
                if (item.barcode == action.payload.product.barcode) isBarcode = true
            })
            if (!isBarcode) {
                state.adminProducts.push(action.payload.product)
                state.adminProductsContainer.push(action.payload.product)
            }
        },

        adminRemove(state, action: PayloadAction<AdminPayload>) {
            state.adminProducts.forEach((item, index) => {
                if (item.barcode == action.payload.product.barcode) {
                    state.adminProducts.splice(index, 1)
                }
            })

            state.adminProductsContainer.forEach((item, index) => {
                if (item.barcode == action.payload.product.barcode) {
                    state.adminProductsContainer.splice(index, 1)
                }
            })
        },

        adminEdit(state, action: PayloadAction<AdminPayload>) {
            state.adminProducts = state.adminProducts.map(item =>
                item.barcode == action.payload.product.barcode ? action.payload.product : item)

            state.adminProductsContainer = state.adminProductsContainer.map(item =>
                item.barcode == action.payload.product.barcode ? action.payload.product : item)
        },
        
        adminFilter(state, action: PayloadAction<IFilter>) {

            let currentProducts: IProduct[] = state.adminProductsContainer
            .filter(item => action.payload.manufacturer.includes(item.manufacturer))
            .filter(item => (item.price >= action.payload.price.from) && (item.price <= action.payload.price.to));

            state.adminProductsContainer.forEach(element => {
                element.careTypes.forEach(item => {
                    if (action.payload.careType == item && !currentProducts.includes(element)) currentProducts.push(element)
                }); 
            });

            if (action.payload.price.from == 0 &&
                action.payload.price.to == 10000 &&
                action.payload.manufacturer.length == 0 &&
                action.payload.careType == '') {
                    state.adminProducts = state.adminProductsContainer;
                } else state.adminProducts = currentProducts;
        }
    }
})

export default adminSlice.reducer;