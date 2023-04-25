import { fireEvent, render, screen } from "@testing-library/react";
import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getStoreWithState } from "../../src/store/store";
import CatalogPage from "../../src/pages/CatalogPage/CatalogPage";
import { getInitialState } from "../helpers/getInitialState";

describe("Filters", () => {

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
              "Уход за посудой"
            ]
        },
        {
            imgUrl: "https://ir.ozone.ru/s3/multimedia-a/wc1000/6041915602.jpg",
            name: "Порошок стиральный Автомат 100 пятен COMPACT",
            sizeType: "Volume",
            size: 25,
            barcode: 3,
            manufacturer: "Grifon",
            brand: "BIMAX",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis vulputate feugiat massa vestibulum duis. Faucibus consectetur aliquet sed pellentesque consequat consectetur congue mauris venenatis. Nunc elit, dignissim sed nulla ullamcorper enim, malesuada.",
            price: 50.76,
            careTypes: [
              "Уход за бельём",
              "Уход за кухней"
            ]
        }
    ]
  })


  test("filer manufacturers", () => {
    
    state.handbookReducer.manufacturer = ["Нэфис", "Grifon"]
    const testStore = getStoreWithState(state)

    render(
      <Provider store={testStore}>
        <MemoryRouter>
            <CatalogPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText("Средство для мытья посуды Crystal")).toBeInTheDocument()
    expect(screen.queryByText("Автомат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник")).toBeInTheDocument()
    expect(screen.queryByText("Порошок стиральный Автомат 100 пятен COMPACT")).toBeInTheDocument()

    const showBtn = screen.getByRole("button", { name: "Показать" })
    const checkbox = screen.getByLabelText("Grifon")
    fireEvent.click(checkbox)
    fireEvent.click(showBtn)

    expect(screen.queryByText("Средство для мытья посуды Crystal")).toBeNull()
    expect(screen.queryByText("Автомат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник")).toBeInTheDocument()
    expect(screen.queryByText("Порошок стиральный Автомат 100 пятен COMPACT")).toBeInTheDocument()
  });


  test("filer careTypes", () => {
    
    state.handbookReducer.careType = ["Уход за посудой", "Уход за кухней", "Уход за бельём"]
    const testStore = getStoreWithState(state)

    render(
      <Provider store={testStore}>
        <MemoryRouter>
            <CatalogPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText("Средство для мытья посуды Crystal")).toBeInTheDocument()
    expect(screen.queryByText("Автомат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник")).toBeInTheDocument()
    expect(screen.queryByText("Порошок стиральный Автомат 100 пятен COMPACT")).toBeInTheDocument()

    const careTypeBtn = screen.getAllByRole("button", { name: "Уход за кухней" })[0]
    fireEvent.click(careTypeBtn)

    expect(screen.queryByText("Средство для мытья посуды Crystal")).toBeInTheDocument()
    expect(screen.queryByText("Автомат Гель СМС жидкое в растворимых капсулах Liquid Capsules Горный родник")).toBeNull()
    expect(screen.queryByText("Порошок стиральный Автомат 100 пятен COMPACT")).toBeInTheDocument()
  });
});
