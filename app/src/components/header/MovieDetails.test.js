
import MovieDetails from "./MovieDetails.js";
import { render, screen, cleanup } from "@testing-library/react";

import * as ReactQuery from 'react-query'

describe ("MovieDetails", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    test('MovieDetails is rendered', () => {

        jest.spyOn(ReactQuery, 'useQuery')
            .mockImplementation(
                jest.fn()
                    .mockReturnValue({ data: { 
                        "id": "100",
                        "poster_path": "testImageUrl",
                        "title": "testTitle",
                        "release_date": "2005-12-12",
                        "genres": ["testGenres"],
                        "vote_average": "testRating",
                        "runtime": "182",
                        "overview": "testDescription" }, isLoading: false, isSuccess: true })
        )

        renderComponent(100);
        const movieTile = screen.getByTestId("movieDetails");
        expect(movieTile).toBeInTheDocument();
        const testTitle = screen.getByText("testTitle");
        expect(testTitle).toBeInTheDocument();
        const testReleaseYear = screen.getByText("2005");
        expect(testReleaseYear).toBeInTheDocument();
        const testGenres = screen.getByText("testGenres");
        expect(testGenres).toBeInTheDocument();
        const testRating = screen.getByText("testRating");
        expect(testRating).toBeInTheDocument();
        const testDuration = screen.getByText("3h 2min");
        expect(testDuration).toBeInTheDocument();
        const testDescription = screen.getByText("testDescription");
        expect(testDescription).toBeInTheDocument();

    })
     
});

function renderComponent(selectedMovieId) {
    render(<MovieDetails selectedMovieId={selectedMovieId} />);
}
