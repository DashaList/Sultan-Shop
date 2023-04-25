import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getStoreWithState } from "../../src/store/store";
import HeaderBasket from "../../src/components/HeaderBasket/HeaderBasket";
import { getInitialState } from "../helpers/getInitialState";

describe("HeaderBasket", () => {
    test("sum in basket with 3 products", () => {
        let state = getInitialState()
        state.basketReducer.basketProducts = [
            {
                product: {
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
                count: 2
            },
            {
                product: {
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
                },
                count: 1
            }
        ]
        const store = getStoreWithState(state)

        render(
        <Provider store={store}>
            <MemoryRouter>
                <HeaderBasket />
            </MemoryRouter>
        </Provider>      
        );        

        const sum = screen.getByTestId("sum")
        expect(sum).toHaveTextContent('148.28 ₸')
    });

    test("sum in basket without products", () => {
        let state = getInitialState()
        const store = getStoreWithState(state)

        render(
        <Provider store={store}>
            <MemoryRouter>
                <HeaderBasket />
            </MemoryRouter>
        </Provider>      
        );        

        const sum = screen.getByTestId("sum")
        expect(sum).toHaveTextContent('0 ₸')
    });
})