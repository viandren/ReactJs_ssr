import  Dialog  from '../components/dialogs/Dialog';
import  MovieForm  from '../components/forms/MovieForm';
import  DeleteForm  from '../components/forms/DeleteForm';

import { within, userEvent, expect, fn  } from '@storybook/test';
import { action } from '@storybook/addon-actions';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, MemoryRouter } from "react-router-dom";

export default {
  title: 'App/Dialog',
  component: Dialog,
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
  },
};

export const Basic = {
  args: {
    title: "Test title",
    dialogIsOpen: true
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const dialog = canvas.getByTestId("dialog");
    await expect(dialog).toBeInTheDocument();

    const title = canvas.getByText("Test title");
    expect(title).toBeInTheDocument();
    
    const closeDialogButton = canvas.getByTestId("closeDialogButton");
    await expect(closeDialogButton).toBeInTheDocument();
  }

};

const fun = fn();

  export const AddMovie = {
    args: {
      title: "Add a movie",
      dialogIsOpen: true,
      children: <MovieForm parentOnSubmit={fun}/>
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);
  
      const dialog = canvas.getByTestId("dialog");
      await expect(dialog).toBeInTheDocument();
      const title = canvas.getByText("Add a movie");
      expect(title).toBeInTheDocument();
      const closeDialogButton = canvas.getByTestId("closeDialogButton");
      await expect(closeDialogButton).toBeInTheDocument();

      const movieForm = canvas.getByTestId("movieForm");
      await expect(movieForm).toBeInTheDocument();
      const titleInput = canvas.getByTestId("titleInput");
      await expect(titleInput).toBeInTheDocument();

      const releaseYearInput = canvas.getByPlaceholderText("Select Date");
      console.log(releaseYearInput);
      await expect(releaseYearInput).toBeInTheDocument();
      const testGenres = canvas.getByText("Select Genre");
      expect(testGenres).toBeInTheDocument();
      const testRating = canvas.getByTestId("ratingInput");
      expect(testRating).toBeInTheDocument();
      const testDuration = canvas.getByTestId("durationInput");
      expect(testDuration).toBeInTheDocument();
      const testDescription = canvas.getByTestId("descriptionInput");
      expect(testDescription).toBeInTheDocument();
      const testUrlInput = canvas.getByTestId("urlInput");
      expect(testUrlInput).toBeInTheDocument();


      await userEvent.type(titleInput, "New title");
      await userEvent.type(testRating, "6.5");
      await userEvent.type(testDuration, "102");
      await userEvent.type(testUrlInput, "image url");
      await userEvent.type(testDescription, "this is a description");

      await userEvent.click(testGenres);
      const option1 = canvas.getByText("Horror");
      await userEvent.click(option1);
      const testGenres2 = canvas.getByText("Horror");
      await userEvent.click(testGenres2);
      const option2 = canvas.getByText("Adventure");
      await userEvent.click(option2);

      await userEvent.click(releaseYearInput);
      const yearOption = canvas.getByText("2022");
      await userEvent.click(yearOption);

      const submitButton = canvas.getByTestId("submitButton");
      await userEvent.click(submitButton);

      expect(fun).toHaveBeenCalledTimes(1);
    }
  
};


export const EditMovie = {
  args: {
    title: "Edit movie",
    dialogIsOpen: true,
    children: <MovieForm parentOnSubmit={fun}
    movie= {{
            "id": "100",
            "poster_path": "testImageUrl",
            "title": "testTitle",
            "release_date": "2005-12-12",
            "genres": ["Horror","Adventure","Docu"],
            "vote_average": "7.5",
            "runtime": "182",
            "overview": "testDescription" 
    }} />
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const dialog = canvas.getByTestId("dialog");
    await expect(dialog).toBeInTheDocument();
    const title = canvas.getByText("Edit movie");
    expect(title).toBeInTheDocument();
    const closeDialogButton = canvas.getByTestId("closeDialogButton");
    await expect(closeDialogButton).toBeInTheDocument();

    const movieForm = canvas.getByTestId("movieForm");
    await expect(movieForm).toBeInTheDocument();
    const titleInput = canvas.getByTestId("titleInput");
    await expect(titleInput).toBeInTheDocument();
    await expect(titleInput.value).toEqual("testTitle");

    const releaseYearInput = canvas.getAllByRole("textbox").filter(t => t.name == "release_date").at(0);
    console.log(releaseYearInput);
    await expect(releaseYearInput).toBeInTheDocument();
    await expect(releaseYearInput.value).toEqual("2005");
    const testRating = canvas.getByTestId("ratingInput");
    expect(testRating).toBeInTheDocument();
    await expect(testRating.value).toEqual("7.5");
    const testDuration = canvas.getByTestId("durationInput");
    expect(testDuration).toBeInTheDocument();
    await expect(testDuration.value).toEqual("182");
    const testDescription = canvas.getByTestId("descriptionInput");
    expect(testDescription).toBeInTheDocument();
    await expect(testDescription.value).toEqual("testDescription");
    const testUrlInput = canvas.getByTestId("urlInput");
    expect(testUrlInput).toBeInTheDocument();
    await expect(testUrlInput.value).toEqual("testImageUrl");


    await userEvent.type(testUrlInput, " changed");

    const submitButton = canvas.getByTestId("submitButton");
    await userEvent.click(submitButton);

    expect(fun).toHaveBeenCalledTimes(1);
  }

};
 

export const DeleteMovie = {
  args: {
    title: "Delete movie",
    dialogIsOpen: true,
    children: <DeleteForm onSubmit={fun}/>
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const dialog = canvas.getByTestId("dialog");
    await expect(dialog).toBeInTheDocument();

    const title = canvas.getByText("Delete movie");
    expect(title).toBeInTheDocument();
    
    const closeDialogButton = canvas.getByTestId("closeDialogButton");
    await expect(closeDialogButton).toBeInTheDocument();

    const deleteForm = canvas.getByTestId("deleteForm");
    await expect(deleteForm).toBeInTheDocument();


    const submitButton = canvas.getByText("confirm");
    await expect(submitButton).toBeInTheDocument();
    const question = canvas.getByText("Are you sure you want to delete this movie?");
    await expect(question).toBeInTheDocument();
    await userEvent.click(submitButton);
    expect(fun).toHaveBeenCalledTimes(1);
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