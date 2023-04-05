import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/types"

interface HandbookState {
    loading: boolean;
    manufacturer: string[];
    //manufacturerQty: Map<string, Number>;
    careType: string[]
}

const initialState: HandbookState  = {
    loading: false,
    manufacturer: [],
    //manufacturerQty: new Map(),
    careType: []
}

interface ProductPayload {
    products: IProduct[];
    count: number
}


export const handbookSlice = createSlice({
    name: 'handbook',
    initialState,
    reducers: {

        handbookFetching(state) {
            state.loading = true;
        },

        handbookFetchingSuccess(state, action: PayloadAction<ProductPayload>) {
            state.loading = false;
            state.manufacturer = Array.from(new Set(action.payload.products.map(item => item.manufacturer)))
            // state.manufacturer.forEach(item => {
            //     const value = action.payload.products.filter(el => el.manufacturer == item).length
            //     state.manufacturerQty.set(item, value)
            // })

            let careTypeSet = new Set<string>();
            action.payload.products.forEach(element => {
                element.careTypes.forEach(item => {
                    careTypeSet.add(item)
                }); 
            });
            state.careType = Array.from(careTypeSet);
        }
    }
})

export default handbookSlice.reducer;