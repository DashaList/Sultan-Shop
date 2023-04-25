import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/types"

interface HandbookState {
    loading: boolean;
    manufacturer: string[];
    careType: string[]
}

const initialState: HandbookState  = {
    loading: false,
    manufacturer: [],
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