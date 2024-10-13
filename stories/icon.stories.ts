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
          "alarm",
          "arrow.breadcrumb",
          "arrow.left.circle.fill",
          "arrow.left",
          "arrow.left2",
          "arrow.right",
          "arrow.up.forward",
          "assign",
          "bell.badge",
          "bell.slash",
          "bell",
          "calendar",
          "car.side",
          "checkmark.circle",
          "checkmark",
          "chevron.down",
          "chevron.left.2",
          "chevron.left",
          "chevron.right.2",
          "chevron.right",
          "chevron.up",
          "clock.arrow.circlepath",
          "comment",
          "detainees",
          "download",
          "download2",
          "exclamationmark.triangle.fill",
          "exit",
          "gear",
          "info",
          "kebab",
          "line.3.horizontal.decrease.circle",
          "magnifyingglass",
          "meatballs",
          "menu",
          "notification-error",
          "organization",
          "overview",
          "paperplane",
          "pencil.line",
          "pencil",
          "person.2",
          "person.3",
          "person.crop.circle",
          "person.fill.questionmark",
          "person.fill.xmark",
          "person.fill.checkmark",
          "person",
          "photo",
          "plus",
          "print",
          "prison.management",
          "reports",
          "scan",
          "shippingbox",
          "sun.max",
          "sun.min",
          "thumbs.up",
          "thumbs.down",
          "transactions",
          "upload",
          "xmark.circle",
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
    name: "alarm",
  },
} satisfies Story;
