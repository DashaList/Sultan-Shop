import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getStoreWithState } from "../../src/store/store";
import AdminPage from "../../src/pages/AdminPage/AdminPage";
import { getInitialState } from "../helpers/getInitialState";
import { act } from "react-dom/test-utils";

describe("AdminPage", () => {

    describe("deleteButton click event", () => {

        test("delete one of two products", async () => {
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
                },
                {
                    imgUrl: "https://ir.ozone.ru/s3/multimedia-w/wc1000/6353910380.jpg",
                    name: "Автомат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник",
                    sizeType: "Volume",
                    size: 65,
                    barcode: 2,
                    manufacturer: "Grifon",
                    brand: "ARIEL",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.",
                    price: 50.76,
                    careTypes: [
                      "Уход за бельём"
                    ]
                }
            ]
            const testStore = getStoreWithState(state)

            render(
                <Provider store={testStore}>
                    <MemoryRouter>
                        <AdminPage />
                    </MemoryRouter>
                </Provider>
            );

            expect(screen.queryByText("Средство для мытья посуды Crystal")).toBeInTheDocument()
            expect(screen.queryByText("Автомат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник")).toBeInTheDocument()

            const delBtn = screen.getAllByTestId("price-wrap")[0].lastElementChild || window
            
            act(() => {
                fireEvent.click(delBtn)
            })

            expect(screen.queryByText("Средство для мытья посуды Crystal")).toBeNull()
            expect(screen.queryByText("Автомат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник")).toBeInTheDocument()
        });
        
        test("delete all products", async () => {
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
            const testStore = getStoreWithState(state)

            render(
                <Provider store={testStore}>
                    <MemoryRouter>
                        <AdminPage />
                    </MemoryRouter>
                </Provider>
            );

            expect(screen.queryByText("Средство для мытья посуды Crystal")).toBeInTheDocument()

            const delBtn = screen.getByTestId("price-wrap").lastElementChild || window 
            
            act(() => {
                fireEvent.click(delBtn)
            })
           
            await waitFor(() => {
                expect( screen.getAllByTestId('name').length).toBeGreaterThan(10)
            })
          
        });
     });
})