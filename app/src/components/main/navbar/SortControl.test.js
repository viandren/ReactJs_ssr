import { userEvent } from "@storybook/test";
import SortControl from "./SortControl.js";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

describe ("SortControl", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    test('SortControl is rendered', () => {
        renderComponent(["testOption1", "testOption2", "testOption3"], () => {}, "testOption1");
        const sortControl = screen.getByTestId("sortControl");
        expect(sortControl).toBeInTheDocument();
        const testOption1 = screen.getByText("testOption1");
        expect(testOption1).toBeInTheDocument();
        const testOption2 = screen.getByText("testOption2");
        expect(testOption2).toBeInTheDocument();
        const testOption3 = screen.getByText("testOption3");
        expect(testOption3).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toHaveValue("testOption1");

    })
     
    test('Change selection', async () => {
        const mockedOptions = [
            'Mocked option 1',
            'Mocked option 2',
            'Mocked option 3'
        ];
        const mockedOnChange = jest.fn();
        const defaultValue = 'Mocked option 3';
        renderComponent(mockedOptions, mockedOnChange, defaultValue);
        expect(screen.getByRole("combobox")).toHaveValue(defaultValue);
        const sortControl = screen.getByTestId("sortControlSelect");
        expect(sortControl).toBeTruthy();
        await userEvent.selectOptions(sortControl, "Mocked option 2")

        expect(sortControl).toHaveValue("Mocked option 2");
        expect(mockedOnChange).toHaveBeenCalledTimes(1);
        expect(mockedOnChange).toHaveBeenCalledWith('Mocked option 2');

    })
});

function renderComponent(options, sortByCallback, defaultValue) {
    render(<SortControl sortByOptions={options} 
        setSortBy={sortByCallback}
        defaultValue={defaultValue}/>);
}