import MyInput, { PasswordInput } from './RenameMyInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MyInput> = {
  title: 'Components/MyInput',
  component: MyInput,
  subcomponents: { PasswordInput },
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

type Story = StoryObj<typeof MyInput>;

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

export const Password: StoryObj<typeof PasswordInput> = {
  render: (args) => <PasswordInput {...args} />,
  args: {
    label: 'Password',
    variant: 'outlined',
    size: 'medium',
    helperText: 'Minimum 8 symbols',
    showToggleAdornment: true,
  },
  argTypes: {
    showToggleAdornment: { control: 'boolean' },
  },
  parameters: {
    docs: {
      source: {
        code: `<PasswordInput label="Password" variant="outlined" helperText="Minimum 8 symbols" />`,
      },
    },
  },
};
