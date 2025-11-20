import { StyledInput } from './StyledInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StyledInput> = {
  title: 'Components/Inputs/StyledInput',
  component: StyledInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'inline-radio' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['small', 'medium'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    helperText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof StyledInput>;

export const Default: Story = {
  args: {
    label: 'Email',
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    disabled: false,
    helperText: '',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    label: 'Short input',
    size: 'small',
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    label: 'Filled input',
    variant: 'filled',
  },
};
