import  Counter  from '../components/Counter';

import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'App/Counter',
  component: Counter,
  tags: ['Counter'],
  parameters: {
    layout: 'centered',
  },
};

export const Basic = {
    args: {
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);

      const counter = canvas.getByTestId("counter");
      await expect(counter).toBeInTheDocument();

      const increaseButton = canvas.getByText("increase");
      await expect(increaseButton).toBeInTheDocument();


      const decreaseButton = canvas.getByText("decrease");
      await expect(decreaseButton).toBeInTheDocument();
      

      const number = canvas.getByText('15');
      await expect(number).toBeInTheDocument();
    }
  };

  export const ChangeNumberWithButtons = {
    args: {
    },
    play: async ({ args, canvasElement }) => {
      const canvas = within(canvasElement);


      const number = canvas.getByText('15');
      await expect(number).toBeInTheDocument();

      const increaseButton = canvas.getByText("increase");
      await expect(increaseButton).toBeInTheDocument();
      await userEvent.click(increaseButton);
      await userEvent.click(increaseButton);
      await userEvent.click(increaseButton);
      expect(number.textContent).toEqual("18");

      const decreaseButton = canvas.getByText("decrease");
      await expect(decreaseButton).toBeInTheDocument();
      await userEvent.click(decreaseButton);
      await userEvent.click(decreaseButton);
      expect(number.textContent).toEqual("16");
      await userEvent.click(increaseButton);
      await userEvent.click(increaseButton);
      await userEvent.click(decreaseButton);
      expect(number.textContent).toEqual("17");
    }
  };
  