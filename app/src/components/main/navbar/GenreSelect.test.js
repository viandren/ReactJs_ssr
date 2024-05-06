import GenreSelect from "./GenreSelect.js";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

const onSelect = jest.fn();
const genreList=["horror","comedy","fantasy","docu","adventure"]

describe ("GenreSelect", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    test('GenreSelect is rendered', () => {
        renderComponent();
        const genreSelect = screen.getByTestId("genreSelect");
        expect(genreSelect).toBeInTheDocument();
    })

    test('All genres are rendered', () => {
        renderComponent();
        genreList.forEach(genre => {
            const button = screen.getByText(genre);
            expect(button).toBeInTheDocument();
        });
    })

    test('Highlighting works', () => {
        renderComponent();
        const fantasy = screen.getByText("fantasy");
        expect(fantasy.classList.contains('selected')).toBe(true);
        const comedy = screen.getByText("comedy");
        fireEvent.click(comedy);
        expect(fantasy.classList.contains('selected')).toBe(false);
        expect(comedy.classList.contains('selected')).toBe(true);
        const adventure = screen.getByText("adventure");
        fireEvent.click(adventure);
        expect(fantasy.classList.contains('selected')).toBe(false);
        expect(comedy.classList.contains('selected')).toBe(false);
        expect(adventure.classList.contains('selected')).toBe(true);
    })

    test('OnSelect event is fired', () => {
        renderComponent();
        genreList.forEach(genre => {
            const button = screen.getByText(genre);
            fireEvent.click(button);
        });
        expect(onSelect).toHaveBeenCalledTimes(5);
    })

});

function renderComponent() {
    render(<GenreSelect  
        genreList={genreList}
        selected="fantasy"
        onSelect={onSelect}
        />);
}