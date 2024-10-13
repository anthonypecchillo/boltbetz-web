import type { Meta, StoryObj } from "@storybook/react";
import { AnchorButton } from "~/components/button";
import { Icon } from "~/components/icon";

const meta = {
  args: {
    "aria-disabled": false,
    children: "Button",
    href: "https://example.com",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  component: AnchorButton,
} satisfies Meta<typeof AnchorButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {} satisfies Story;

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
