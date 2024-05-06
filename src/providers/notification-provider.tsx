import { useNotificationStore } from "@/stores/notifications";
import { notification } from "antd";
import React, { ReactNode, useEffect } from "react";

type TNotificationProvider = {
  children: ReactNode;
};
export const NotificationProvider = ({ children }: TNotificationProvider) => {
  const [api, contextHolder] = notification.useNotification();
  const { setInstance } = useNotificationStore();

  useEffect(() => {
    setInstance(api);
  }, [setInstance, api]);

  return (
    <div>
      {contextHolder}
      {children}
    </div>
  );
};
