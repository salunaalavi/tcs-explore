import {
  ArgsProps,
  NotificationInstance,
} from "antd/es/notification/interface";

export type TNotificationsStore = {
  instance: NotificationInstance | null;
  setInstance: (instance: NotificationInstance) => void;
  getInstance: () => NotificationInstance;
  showUnderDevMessage: () => void;
};

export type TNotification = {
  type: Exclude<keyof NotificationInstance, "destroy" | "open">;
  content: ArgsProps;
};
