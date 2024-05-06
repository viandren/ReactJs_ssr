import  MovieDetails  from '../components/header/MovieDetails';
import { within, expect, waitFor } from '@storybook/test';

import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw'
import { Route, Routes, MemoryRouter } from "react-router-dom";

export default {
  title: 'App/MovieDetails',
  component: MovieDetails,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      createWrapper(<Story />)
    ),
  ],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    msw: [
      rest.get('http://localhost:4000/movies/100', (req, res, ctx) => {
        return res(
          ctx.json(
            testMovie
          )
        )
      }),
    ]
  },
};

const testMovie = {
  "id": "100",
  "poster_path": "https://m.media-amazon.com/images/I/51dcaJOAfrL._AC_UF894,1000_QL80_.jpg",
  "title": "Fahrenheit 9/11",
  "release_date": "2004",
  "genres": ["Documentary", "Comedy"],
  "vote_average": "7.5",
  "runtime": "122",
  "overview": "Michael Moore's view on what happened to the United States after September 11 and how the Bush Administration allegedly used the tragic event to push forward its agenda for unjust wars in Afghanistan and Iraq."
}


export const Rendered = {
  args: {
    selectedMovieId: 100
  },
};

export const EveryDataIsCorrect = {
  args: {
    selectedMovieId: 100
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
    const movieDetails = canvas.getByTestId("movieDetails");
    expect(movieDetails).toBeInTheDocument();
    })
    const testTitle = canvas.getByText("Fahrenheit 9/11");
    expect(testTitle).toBeInTheDocument();
    const testReleaseYear = canvas.getByText("2004");
    expect(testReleaseYear).toBeInTheDocument();
    const testGenres = canvas.getByText("Documentary, Comedy");
    expect(testGenres).toBeInTheDocument();
    const testRating = canvas.getByText("7.5");
    expect(testRating).toBeInTheDocument();
    const testDuration = canvas.getByText("2h 2min");
    expect(testDuration).toBeInTheDocument();
    const testDescription = canvas.getByText("Michael Moore's view on what happened to the United States after September 11 and how the Bush Administration allegedly used the tragic event to push forward its agenda for unjust wars in Afghanistan and Iraq.");
    expect(testDescription).toBeInTheDocument();
  }
};



const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: console.log,
    }
  });

function createWrapper(children) {
  const testQueryClient = createTestQueryClient();
  return createRouterWrapper(<QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>);
}


function createRouterWrapper(children) {
  return <MemoryRouter initialEntries={['/100']}>
    <Routes>
      <Route path='/:movieId' element={children}>
      </Route>
      </Routes>
    </MemoryRouter>;
}