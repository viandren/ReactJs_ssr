import  Navbar  from '../components/main/navbar/Navbar';

import { within, userEvent, expect } from '@storybook/test';
import { action } from '@storybook/addon-actions';


export default {
  title: 'App/Navbar',
  component: Navbar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Basic = {
  args: {
    filterByGenre: (e) => {console.log(e)},
    setSortBy: (e) => {console.log(e)}
  }
};

export const SelectGenre = {
    args: {
      filterByGenre: action("filterByGenre"),
      setSortBy: (e) => {console.log(e)}
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);

      const genreSelect = canvas.getByTestId("genreSelect");
      await expect(genreSelect).toBeInTheDocument();

      const horrorButton = canvas.getByRole('button', { name: /Horror/i });
      await expect(horrorButton).toBeInTheDocument();
      
      await userEvent.click(horrorButton);
      await expect(horrorButton).toHaveClass("selected");
      expect(args.filterByGenre).toHaveBeenCalledTimes(1);
    }
  };

  export const ChangeShort = {
    args: {
      filterByGenre: (e) => {console.log(e)},
      setSortBy: action("setSortBy")
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);

      const sortControl = canvas.getByTestId("sortControl");
      await expect(sortControl).toBeInTheDocument();

      const sortControlSelect = canvas.getByTestId("sortControlSelect");
      await expect(sortControlSelect).toBeInTheDocument();

      await userEvent.selectOptions(sortControlSelect, "Title");
      expect(args.setSortBy).toHaveBeenCalledTimes(1);
    }
  };
  