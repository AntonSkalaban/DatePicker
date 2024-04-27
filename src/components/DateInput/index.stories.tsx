import type { Meta, StoryObj } from "@storybook/react";
import { DateInput } from "./index";

const meta = {
  title: "UI/DateInput",
  component: DateInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { title: "Open date" } };
