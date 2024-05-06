import Navbar from "./Navbar.js";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { Route, Routes, MemoryRouter } from "react-router-dom";

const onSelect = jest.fn();
const genreList=["horror","comedy","fantasy","docu","adventure"]

describe ("Navbar", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    test('Navbar is rendered', () => {
        renderComponent();
        const genreSelect = screen.getByTestId("genreSelect");
        expect(genreSelect).toBeInTheDocument();
        const sortControl = screen.getByTestId("sortControl");
        expect(sortControl).toBeInTheDocument();
    })

});

function renderComponent() {
    render(createWrapper(<Navbar filterByGenre={() => {}}
        setSortBy={() => {}}/>));
}

export function createWrapper(children) {
    return <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={children}>
        </Route>
        </Routes>
      </MemoryRouter>;
  }