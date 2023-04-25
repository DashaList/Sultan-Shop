import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getStoreWithState } from "../../src/store/store";
import { getInitialState } from "../helpers/getInitialState";
import AdminPage from "../../src/pages/AdminPage/AdminPage";

describe("AdminProduct", () => {
    test("edit product", async () => {
        let state = getInitialState()
        state.adminReducer.adminProducts = [
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
            }
        ]
        state.handbookReducer.careType = ["Уход за посудой", "Уход за кухней"]
        const testStore = getStoreWithState(state)

        render(
        <Provider store={testStore}>
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        </Provider>     
        );        

        await waitFor(() => {
            expect(screen.getAllByTestId('name')[0]).toHaveTextContent('Средство для мытья посуды Crystal')
        })

        const editBtn = screen.getAllByTestId("edit-btn")[0]
        
        fireEvent.click(editBtn)

        const nameInput = screen.getByTestId('name-input')
        const confirmEditBtn = screen.getByRole("button", { name: "Изменить товар" })

        act(() => {
            fireEvent.change(nameInput, {target: {value: 'Новое название'}})
            fireEvent.click(confirmEditBtn)
        })
        
        await waitFor(() => {
            expect(screen.getAllByTestId('name')[0]).toHaveTextContent('Новое название')
        })

    });
})