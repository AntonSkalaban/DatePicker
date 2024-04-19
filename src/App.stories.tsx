import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./App";

const meta = {
  title: "UI/App",
  component: App,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
