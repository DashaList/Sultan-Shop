import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBasketProduct, IProduct } from "../../types/types"

interface BasketState {
    basketProducts: IBasketProduct[]
}

const initialState: BasketState = {
    basketProducts: []
}

interface BasketAddPayload {
    product: IProduct;
}

interface BasketRemovePayload {
    barcode: number;
}


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {

        basketAdd(state, action: PayloadAction<BasketAddPayload>) {
            const foundProduct = state.basketProducts.find(item => item.product.barcode == action.payload.product.barcode)

            if (foundProduct) {
                foundProduct.count += 1;
            } else {
                //state.basketProducts.push({...action.payload.basketProduct, count: count++})
                state.basketProducts.push({product: action.payload.product,
                count: 1})
                //state.basketProducts.push(action.payload.product)
            }
        },

        basketRemove(state, action: PayloadAction<BasketRemovePayload>) {
            state.basketProducts.forEach((item, index) => {
                if (item.product.barcode == action.payload.barcode) state.basketProducts.splice(index, 1)
            })
        },

        basketDecrease(state, action: PayloadAction<BasketRemovePayload>) {
            state.basketProducts.forEach((item, index) => {
                if (item.product.barcode == action.payload.barcode) {
                    if (item.count > 1) item.count--
                    if (item.count == 1) state.basketProducts.splice(index, 1)
                    //item.count = (item.count > 0) ? item.count - 1 : 0
                } //item.co state.basketProducts.splice(index, 1)
            })
        }
    }
})

export default basketSlice.reducer;