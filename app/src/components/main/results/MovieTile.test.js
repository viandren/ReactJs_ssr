
import MovieTile from "./MovieTile.js";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Route, Routes, MemoryRouter } from "react-router-dom";

describe ("MovieTile", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    test('MovieTile is rendered', () => {

        const movie = {
            "id": "testId",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "1999-05-23",
            "genres": ["testGenres"],
            "vote_average": "testRating",
            "runtime": "testDuration",
            "overview": "testDescription"
        }
        renderComponent(movie);
        const movieTile = screen.getByTestId("movieTile");
        expect(movieTile).toBeInTheDocument();
        const testTitle = screen.getByText("testTitle");
        expect(testTitle).toBeInTheDocument();
        const testReleaseYear = screen.getByText("1999");
        expect(testReleaseYear).toBeInTheDocument();
        const testGenres = screen.getByText("testGenres");
        expect(testGenres).toBeInTheDocument();

    })
     
    test('Movie selection', async () => {
        
        const movie = {
            "id": "testId",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "1999-05-23",
            "genres": ["testGenres"],
            "vote_average": "testRating",
            "runtime": "testDuration",
            "overview": "testDescription"
        }
        renderComponent(movie);

        const movieTile = screen.getByTestId("movieTile");
        fireEvent.click(movieTile);

    })
});

function renderComponent(movie) {
    render(createWrapper(<MovieTile movie={movie} key={1} />));
}

export function createWrapper(children) {
    return <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={children}>
        </Route>
        </Routes>
      </MemoryRouter>;
  }