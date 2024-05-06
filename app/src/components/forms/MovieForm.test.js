
import MovieForm from "./MovieForm.js";
import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";

import * as ReactQuery from 'react-query'

describe ("MovieForm", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    test('MovieForm is rendered', () => {

        const movie = {
            "id": "100",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "2005-12-12",
            "genres": ["Horror","Adventure","Docu"],
            "vote_average": "7.5",
            "runtime": "182",
            "overview": "testDescription" 
        }

        jest.spyOn(ReactQuery, 'useMutation')
            .mockImplementation(
                jest.fn()
                    .mockReturnValue({ data: { 
                        "result": "ok" }, isLoading: false, isSuccess: true })
        )
        const { container } = renderComponent(movie);
        const movieForm = screen.getByTestId("movieForm");
        expect(movieForm).toBeInTheDocument();
        const titleInput = container.querySelector(`input[name="title"]`);
        expect(titleInput).toBeInTheDocument();
        const releaseYearInput = screen.getByDisplayValue("2005");
        expect(releaseYearInput).toBeInTheDocument();
        const testGenres = screen.getByText("Horror");
        expect(testGenres).toBeInTheDocument();
        const testRating = screen.getByDisplayValue("7.5");
        expect(testRating).toBeInTheDocument();
        const testDuration = screen.getByDisplayValue("182");
        expect(testDuration).toBeInTheDocument();
        const testDescription = screen.getByDisplayValue("testDescription");
        expect(testDescription).toBeInTheDocument();
        const testUrlInput = screen.getByDisplayValue("testImageUrl");
        expect(testUrlInput).toBeInTheDocument();

    })


    test('Change title', () => {

        const movie = {
            "id": "100",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "2005-12-12",
            "genres": ["Horror","Adventure","Docu"],
            "vote_average": "7.5",
            "runtime": "182",
            "overview": "testDescription" 
        }

        jest.spyOn(ReactQuery, 'useMutation')
            .mockImplementation(
                jest.fn()
                    .mockReturnValue({ data: { 
                        "result": "ok" }, isLoading: false, isSuccess: true })
        )
        const onSubmit = jest.fn();
        const { container } = renderComponent(movie, onSubmit);
        const titleInput = container.querySelector(`input[name="title"]`);
        expect(titleInput).toBeInTheDocument();
        fireEvent.change(titleInput, { target: { value: 'new title' } });
        const submitButton = screen.getByText('submit')
        fireEvent.click(submitButton);
        
    })

    test('Change releaseYear', async () => {

        const movie = {
            "id": "100",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "2005-12-12",
            "genres": ["Horror","Adventure","Docu"],
            "vote_average": "7.5",
            "runtime": "182",
            "overview": "testDescription" 
        }

        jest.spyOn(ReactQuery, 'useMutation')
            .mockImplementation(
                jest.fn()
                    .mockReturnValue({ data: { 
                        "result": "ok" }, isLoading: false, isSuccess: true })
        )
        const onSubmit = jest.fn();
        renderComponent(movie, onSubmit);
        const releaseYearInput = screen.getByDisplayValue("2005");
        expect(releaseYearInput).toBeInTheDocument();
        await fireEvent.click(releaseYearInput);
        const releaseYearInputOption = screen.getByText("2006");
        await fireEvent.click(releaseYearInputOption);
        const submitButton = screen.getByText('submit')
        fireEvent.click(submitButton);
        
    })
     
    test('Change rating', () => {

        const movie = {
            "id": "100",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "2005-12-12",
            "genres": ["Horror","Adventure","Docu"],
            "vote_average": "7.5",
            "runtime": "182",
            "overview": "testDescription" 
        }

        jest.spyOn(ReactQuery, 'useMutation')
            .mockImplementation(
                jest.fn()
                    .mockReturnValue({ data: { 
                        "result": "ok" }, isLoading: false, isSuccess: true })
        )
        const onSubmit = jest.fn();
        const { container } = renderComponent(movie, onSubmit);
        const titleInput = container.querySelector(`input[name="vote_average"]`);
        expect(titleInput).toBeInTheDocument();
        fireEvent.change(titleInput, { target: { value: 'new rating' } });
        const submitButton = screen.getByText('submit')
        fireEvent.click(submitButton);
        
    })

    test('Change genres', async () => {

        const movie = {
            "id": "100",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "2005-12-12",
            "genres": ["Horror","Adventure","Docu"],
            "vote_average": "7.5",
            "runtime": "182",
            "overview": "testDescription" 
        }

        jest.spyOn(ReactQuery, 'useMutation')
            .mockImplementation(
                jest.fn()
                    .mockReturnValue({ data: { 
                        "result": "ok" }, isLoading: false, isSuccess: true })
        )
        const onSubmit = jest.fn();
        const { container } = renderComponent(movie, onSubmit);
        const genresInput = screen.getByText("Horror");
        expect(genresInput).toBeInTheDocument();
        fireEvent.click(genresInput);
        const genresInputOption = screen.getByText("Adventure");
        act(() => {
            fireEvent.click(genresInputOption);
        });
        const genresInputOption2 = screen.getByText("Docu");
        act(() => {
            fireEvent.click(genresInputOption2);
        });
        const genresInputOption3 = screen.getByText("Horror");
        act(() => {
            fireEvent.click(genresInputOption3);
            fireEvent.click(genresInputOption3);
        });
        const submitButton = screen.getByText('submit')
        fireEvent.click(submitButton);
        
    })
});

function renderComponent(movie, onSubmit) {
    return render(<MovieForm movie={movie} parentOnSubmit={onSubmit} />);
}