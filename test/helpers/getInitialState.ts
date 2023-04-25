import { RootState } from "../../src/store/store"

export const getInitialState = (): RootState => {
    return ({
        handbookReducer: {
            loading: false,
            manufacturer: [],
            careType: []
        },
        basketReducer: {
            basketProducts: []
        },
        adminReducer: {
            adminProducts: [],
            adminProductsContainer: [],
            loading: false,
            error: null,
        }
    })
}