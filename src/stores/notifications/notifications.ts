import { create } from "zustand";

import { getUnderDevNotification } from "./utils";
import { TNotificationsStore } from "./type";
import { NotificationInstance } from "antd/es/notification/interface";

export const useNotificationStore = create<TNotificationsStore>()(
  (set, get) => ({
    instance: null,
    setInstance: (instance) => set(() => ({ instance: instance })),
    getInstance: () => get().instance as NotificationInstance,
    showUnderDevMessage: () => {
      const { type, content } = getUnderDevNotification();

      get().getInstance()[type](content);
    },
  }),
);
