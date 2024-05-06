import  GenreSelect  from '../components/main/navbar/GenreSelect';

import { within, userEvent, expect } from '@storybook/test';
import { action } from '@storybook/addon-actions';


export default {
  title: 'App/GenreSelect',
  component: GenreSelect,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Basic = {
  args: {
    genreList: ["all", "horror","comedy","fantasy","docu","adventure", "action", "drama"],
    selected: "all",
    onSelect: () => {}
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const genreSelect = canvas.getByTestId("genreSelect");
    await expect(genreSelect).toBeInTheDocument();

    const button1 = canvas.getByText("all");
    await expect(button1).toBeInTheDocument();
  }


};


export const HasAllButtons = {
    args: {
        genreList: ["all", "horror","comedy","fantasy","docu","adventure", "action", "drama"],
        selected: "all",
        onSelect: () => {}
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);

      const button1 = canvas.getByText("all");
      await expect(button1).toBeInTheDocument();
      const button2 = canvas.getByText("horror");
      await expect(button2).toBeInTheDocument();
      const button3 = canvas.getByText("comedy");
      await expect(button3).toBeInTheDocument();
      const button4 = canvas.getByText("fantasy");
      await expect(button4).toBeInTheDocument();
      const button5 = canvas.getByText("docu");
      await expect(button5).toBeInTheDocument();
      const button6 = canvas.getByText("adventure");
      await expect(button6).toBeInTheDocument();
      const button7 = canvas.getByText("action");
      await expect(button7).toBeInTheDocument();
      const button8 = canvas.getByText("drama");
      await expect(button8).toBeInTheDocument();
    }
  };

export const SelectionTest = {
    args: {
        genreList: ["button1", "button2","button3"],
        selected: "button1",
        onSelect: action("onSelect")
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);

      const button1 = canvas.getByText("button1");
      const button2 = canvas.getByText("button2");
      const button3 = canvas.getByText("button3");
      await userEvent.click(button1);
      await expect(button1).toHaveClass("selected");
      expect(args.onSelect).toHaveBeenCalledWith("button1");
      await userEvent.click(button2);
      await expect(button2).toHaveClass("selected");
      expect(args.onSelect).toHaveBeenCalledWith("button2");
      await userEvent.click(button3);
      await expect(button3).toHaveClass("selected");
      expect(args.onSelect).toHaveBeenCalledWith("button3");

      expect(args.onSelect).toHaveBeenCalledTimes(3);
    }
  };
  
  