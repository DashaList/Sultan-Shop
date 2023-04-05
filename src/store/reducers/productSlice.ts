import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/types"
import { IFilter } from "../../types/types"

interface ProductState {
    products: IProduct[];
    count: number;
    loading: boolean;
    error: null | string;
    productsContainer: IProduct[]
}

const initialState: ProductState  = {
    products: [],
    count: 0,
    loading: false,
    error: null,
    productsContainer: []
}

interface ProductPayload {
    products: IProduct[];
    count: number
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        productsFetching(state) {
            state.loading = true;
        },

        productsFetchingSuccess(state, action: PayloadAction<ProductPayload>) {
            state.loading = false;
            state.error = '';
            state.products = action.payload.products;
            state.productsContainer = action.payload.products;
            state.count = action.payload.count;
            // console.log('state Products', current(state))

            // console.log('p', state.products)
            // console.log('pc', state.productsContainer)
        },

        productsFetchingError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = "Не удалось загрузить каталог товаров";
        },

        filter(state, action: PayloadAction<IFilter>) {
            let currentProducts: IProduct[] = state.productsContainer
            .filter(item => action.payload.manufacturer.includes(item.manufacturer))
            .filter(item => (item.price >= action.payload.price.from) && (item.price <= action.payload.price.to));

            state.productsContainer.forEach(element => {
                element.careTypes.forEach(item => {
                    if (action.payload.careType == item)  currentProducts.push(element)
                }); 
            });


             
            // console.log('pc', state.productsContainer)

            state.products = currentProducts;
            
            console.log('state filt prod', current(state))
             console.log('p', state.products)
        }
    }
})

export default productSlice.reducer;