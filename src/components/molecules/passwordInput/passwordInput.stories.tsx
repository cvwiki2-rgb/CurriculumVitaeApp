import { PasswordInput } from './PasswordInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/Inputs/PasswordInput',
  component: PasswordInput,
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
    helperText: { control: 'text' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },

    showToggleAdornment: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: 'Password',
    variant: 'outlined',
    size: 'medium',
    helperText: 'Minimum 8 symbols',
    showToggleAdornment: true,
  },
};

export const WithoutToggle: Story = {
  args: {
    ...Default.args,
    label: 'Password',
    showToggleAdornment: false,
  },
};
