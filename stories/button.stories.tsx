import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/button";
import { Icon } from "~/components/icon";

const meta = {
  args: {
    children: "Boltbetz",
    disabled: false,
    fullWidth: false,
    space: "lg",
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimaryLarge = {} satisfies Story;

export const PrimaryMedium = {
  args: {
    space: "md",
  },
} satisfies Story;

export const Secondary = {
  args: {
    intent: "secondary",
  },
} satisfies Story;

export const Tertiary = {
  args: {
    intent: "tertiary",
  },
} satisfies Story;

export const Accent = {
  args: {
    intent: "accent",
  },
} satisfies Story;

export const Destructive = {
  args: {
    intent: "destructive",
  },
} satisfies Story;

export const IconLeft = {
  args: {
    iconLeft: <Icon name="bolt" />,
  },
} satisfies Story;

export const IconRight = {
  args: {
    iconRight: <Icon name="bolt" />,
  },
} satisfies Story;

export const DualIcon = {
  args: {
    iconLeft: <Icon name="bolt" />,
    iconRight: <Icon name="bolt" />,
  },
} satisfies Story;

export const FullWidth = {
  args: {
    fullWidth: true,
  },
} satisfies Story;

export const FullWidthIconLeft = {
  args: {
    iconLeft: <Icon name="bolt" />,
    fullWidth: true,
  },
} satisfies Story;
