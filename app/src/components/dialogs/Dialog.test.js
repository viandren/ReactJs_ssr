
import Dialog from "./Dialog.js";
import { render, screen, cleanup } from "@testing-library/react";


describe ("Dialog", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    test('Dialog is rendered', () => {
        const { container } = renderComponent();
        const dialog = screen.getByTestId("dialog");
        expect(dialog).toBeInTheDocument();
    })

    test('Dialog is rendered with title', () => {
        const { container } = renderComponent("this is a test title");
        const dialog = screen.getByTestId("dialog");
        expect(dialog).toBeInTheDocument();
        const title = screen.getByText("this is a test title");
        expect(title).toBeInTheDocument();
    })

    test('Dialog is rendered with children', () => {
        const { container } = renderComponent("this is a test title");
        const testContent = screen.getByTestId("testContent");
        expect(testContent).toBeInTheDocument();
        expect(testContent.innerHTML).toEqual("This is a test content displayed");
    })
     
});

function renderComponent(title) {
    return render(<Dialog  children={<div data-testid="testContent">This is a test content displayed</div>} title={title} dialogIsOpen={true}/>);
}