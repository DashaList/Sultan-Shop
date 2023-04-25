import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../src/store/store";
import AdminPage from "../../src/pages/AdminPage/AdminPage";

describe("AdminProductModal", () => {
    test("show AdminProductModal", () => {
        render(
        <Provider store={store}>
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        </Provider>      
        );

        const addBtn = screen.getByRole("button", { name: "Добавить товар" })
        expect( screen.queryByRole("heading", { name: "Добавить товар" })).toBeNull()
        fireEvent.click(addBtn)
        expect(screen.queryByRole("heading", { name: "Добавить товар" })).toBeInTheDocument()
    });
});