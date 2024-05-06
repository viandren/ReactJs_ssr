import SearchForm from "./SearchForm.js";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";



describe ("SearchForm", () => {

    afterEach(() => {
        cleanup(); 
    })

    test('SearchForm is rendered', () => {
        renderComponent((query) => {console.log("search initiated with query: " + query)});
        const searchForm = screen.getByTestId("searchForm");
        expect(searchForm).toBeInTheDocument();
    })

    test('Snapshot', () => {
        const {asFragment} = renderComponent((query) => {console.log("search initiated with query: " + query)});
        expect(asFragment()).toMatchSnapshot();
    })

    test('SearchForm and serach button are rendered', () => {
        renderComponent((query) => {console.log("search initiated with query: " + query)});
        
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument();
        const searchButton = screen.getByText('Search')
        expect(searchButton).toBeInTheDocument();
    })

    test('SearchForm typing and submit', () => {
        const onSearch = jest.fn();
        renderComponent(onSearch);
        
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: 'whatever' } });
        expect(input).toHaveDisplayValue("whatever");
        const form = screen.getByTestId("form")
        fireEvent.submit(form);
    })

    test('SearchForm button clicked', () => {
        const onSearch = jest.fn();
        renderComponent(onSearch);
        
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument();
        const searchButton = screen.getByRole('button', 'Search')
        expect(searchButton).toBeInTheDocument();
        fireEvent.change(input, { target: { value: 'whatever and something' } });
        expect(input.value).toBe("whatever and something");
        fireEvent.click(searchButton);
    })
});

function renderComponent(onSearch) {
    return render(<SearchForm 
        placeholderText="horror"
        handleSubmit={onSearch}
        />);
}