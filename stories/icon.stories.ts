import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "~/components/icon";

const meta = {
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      type: {
        name: "enum",
        value: [
          "arrow.left.lg",
          "arrow.left.sm",
          "arrow.right.lg",
          "arrow.right.sm",
          "bank",
          "bolt",
          "card",
          "checkmark",
          "chevron.down",
          "chevron.left",
          "chevron.right",
          "chevron.up",
          "gear",
          "gear.full",
          "home.full",
          "kebab",
          "mastercard",
          "menu",
          "pencil.line",
          "pencil",
          "plus",
          "plus.green",
          "wallet",
          "visa",
          "xmark",
        ],
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: "bolt",
  },
} satisfies Story;
