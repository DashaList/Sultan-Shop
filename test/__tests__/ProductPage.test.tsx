import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { getStoreWithState } from "../../src/store/store";
import { getInitialState } from "../helpers/getInitialState";
import CatalogPage from "../../src/pages/CatalogPage/CatalogPage";
import ProductPage from "../../src/pages/ProductPage/ProductPage";
import HeaderBasket from "../../src/components/HeaderBasket/HeaderBasket";


describe("ProductPage", () => {

    let state = getInitialState()

    beforeAll(() => {
        state.adminReducer.adminProducts, state.adminReducer.adminProductsContainer = [
            {
                imgUrl: "https://avatars.mds.yandex.net/get-mpic/4721581/img_id7739073593422149788.jpeg/orig",
                name: "Средство для мытья посуды Crystal",
                sizeType: "Volume",
                size: 450,
                barcode: 1,
                manufacturer: "Нэфис",
                brand: "AOS",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.",
                price: 48.76,
                careTypes: [
                "Уход за посудой",
                "Уход за кухней"
                ]
            },
        ]
    })

    test("ProductPage link click", () => {
        const testStore = getStoreWithState(state)

        render(
        <Provider store={testStore}>
            <MemoryRouter initialEntries={['/catalog']}>
                <Routes>
                    <Route path='/catalog' element={<CatalogPage/>}/>
                    <Route path='/catalog/product/:barcode' element={<ProductPage/>}/>
                </Routes>
            </MemoryRouter>
        </Provider>      
        );

        const name = screen.getByText("Средство для мытья посуды Crystal")
        fireEvent.click(name)
        expect(screen.queryByText("Характеристики"))
        expect(screen.queryByRole("heading", {level: 2})).toHaveTextContent("Средство для мытья посуды Crystal")
    });


    test("ProductPage add to basket (+ button)", async () => {
        const testStore = getStoreWithState(state)

        render(
        <Provider store={testStore}>
            <MemoryRouter initialEntries={['/catalog']}>
                <HeaderBasket/>
                <Routes>
                    <Route path='/catalog' element={<CatalogPage/>}/>
                    <Route path='/catalog/product/:barcode' element={<ProductPage/>}/>
                </Routes>
            </MemoryRouter>
        </Provider>       
        );

        const name = screen.getByText("Средство для мытья посуды Crystal")
        fireEvent.click(name)

        expect(screen.getByTestId("quantity")).toHaveTextContent("0")
        const addBtn = screen.getByRole("button", {name: "+"})
        act(() => {
            fireEvent.click(addBtn)
        })
        await waitFor(() => {
            expect(screen.getByTestId("quantity")).toHaveTextContent("1")
        })        
    });
})