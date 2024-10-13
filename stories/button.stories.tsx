import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/button";
import { Icon } from "~/components/icon";

const meta = {
  args: {
    disabled: false,
    children: "Button",
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {} satisfies Story;

export const Secondary = {
  args: {
    intent: "secondary",
  },
} satisfies Story;

export const Destructive = {
  args: {
    intent: "destructive",
  },
} satisfies Story;

export const Constructive = {
  args: {
    intent: "constructive",
  },
} satisfies Story;

export const Tertiary = {
  args: {
    intent: "tertiary",
  },
} satisfies Story;

export const IconLeft = {
  args: {
    iconLeft: <Icon name="bell" />,
  },
} satisfies Story;

export const IconRight = {
  args: {
    iconRight: <Icon name="bell" />,
  },
} satisfies Story;

export const DualIcon = {
  args: {
    iconLeft: <Icon name="bell" />,
    iconRight: <Icon name="bell" />,
  },
} satisfies Story;
