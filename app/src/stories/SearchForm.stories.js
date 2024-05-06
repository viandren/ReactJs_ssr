import  SearchForm  from '../components/header/SearchForm';

import { within, userEvent, expect } from '@storybook/test';
import { action } from '@storybook/addon-actions';


export default {
  title: 'App/SearchForm',
  component: SearchForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Basic = {
  args: {
    placeholderText: "Search...",
    handleSubmit: action("handleSubmit")
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const searchForm = canvas.getByTestId("searchForm");
    await expect(searchForm).toBeInTheDocument();

    const searchButton = canvas.getByText("Search");
    await userEvent.click(searchButton);
    expect(args.handleSubmit).toHaveBeenCalledTimes(1);
  }


};

export const SearchTest = {
    args: {
      placeholderText: "Search...",
      handleSubmit: action("handleSubmit")
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);

      const searchInput = canvas.getByRole('textbox');
      await expect(searchInput).toBeInTheDocument();

      await userEvent.type(searchInput, "new search query");
  
      const searchButton = canvas.getByText("Search");
      await userEvent.click(searchButton);
      expect(args.handleSubmit).toHaveBeenCalledTimes(1);
      expect(args.handleSubmit).toHaveBeenCalledWith("new search query");
    }
  };
  
  

export const SearchTestMultipleTimes = {
    args: {
      placeholderText: "Search...",
      handleSubmit: action("handleSubmit")
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);

      const searchInput = canvas.getByRole('textbox');
      await expect(searchInput).toBeInTheDocument();

      await userEvent.type(searchInput, "search this");
  
      const searchButton = canvas.getByText("Search");
      await userEvent.click(searchButton);

      await userEvent.type(searchInput, " and this");
      await userEvent.click(searchButton);


      await userEvent.type(searchInput, " and this");
      await userEvent.click(searchButton);

      expect(args.handleSubmit).toHaveBeenCalledTimes(3);
      expect(args.handleSubmit).toHaveBeenLastCalledWith("search this and this and this");
    }
  };