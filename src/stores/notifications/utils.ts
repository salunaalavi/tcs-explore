import {
  ArgsProps,
  NotificationInstance,
} from "antd/es/notification/interface";
import { TNotification } from "./type";

export const getUnderDevNotification = (): TNotification => ({
  type: "info",
  content: {
    message: "Under development",
    description:
      "Fitur ini sedang dalam pengembangan. Nantikan dalam beberapa hari!",
    placement: "bottomRight",
  },
});
