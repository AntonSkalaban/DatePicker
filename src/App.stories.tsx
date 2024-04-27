import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./App";

const meta = {
  title: "UI/App",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
