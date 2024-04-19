import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { title: "primary", onClick: () => 1 + 2 },
};

export const Secondary: Story = {
  args: { title: "primary", onClick: () => 1 + 2 },
};

export const WithOnClick: Story = {
  args: { title: "primary", onClick: () => 1 + 2 },
};

export const Disabled: Story = {
  args: { title: "primary", onClick: () => 1 + 2 },
};
