
import Results from "./Results.js";
import { render, screen, cleanup, waitFor } from "@testing-library/react";

import * as ReactQuery from 'react-query';
import { Route, Routes, MemoryRouter } from "react-router-dom";

describe ("Results", () => {

    afterEach(() => {
        cleanup(); 
    })
    
    it('Results is rendered', async () => {
      jest.spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
          jest.fn()
              .mockReturnValue({data: { "data": [{ 
                  "id": "100",
                  "poster_path": "testImageUrl",
                  "title": "testTitle",
                  "release_date": "1995-12-12",
                  "genres": ["testGenres"],
                  "vote_average": "testRating",
                  "runtime": "182",
                  "overview": "testDescription" }]}, isLoading: false, isSuccess: true })
                  ); 

        renderComponent();
        await waitFor(() => {
            const results = screen.getByTestId("results");
            expect(results).toBeInTheDocument();
        })

        const movieTile = screen.getByTestId("movieTile");
        expect(movieTile).toBeInTheDocument();
        const testTitle = screen.getByText("testTitle");
        expect(testTitle).toBeInTheDocument();
        const testReleaseYear = screen.getByText("1995");
        expect(testReleaseYear).toBeInTheDocument();
        const testGenres = screen.getByText("testGenres");
        expect(testGenres).toBeInTheDocument();
    })

});

function renderComponent() {
    render(createWrapper(<Results 
      editMovie={() => {}}
      deleteMovie={() => {}}/>));
}

export function createWrapper(children) {
  return <MemoryRouter initialEntries={['/']}>
    <Routes>
      <Route path='/' element={children}>
      </Route>
      </Routes>
    </MemoryRouter>;
}