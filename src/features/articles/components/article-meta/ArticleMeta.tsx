import { Avatar } from "@/components/avatar";
import { Link } from "@/components/link";
import { Text } from "@/components/text";
import React from "react";

import styles from "./styles.module.css";
import classNames from "classnames";

type TArticleMeta = {
  avatarSrc?: string;
  username: string;
  createdAt: string;
  variant?: "white" | "black";
};
export const ArticleMeta = (props: TArticleMeta) => {
  return (
    <div className={styles.root}>
      <Avatar src={props.avatarSrc} />
      <div
        className={classNames(styles.labels, {
          [styles["labels-white"]]: props.variant === "white",
        })}
      >
        <Link
          type="next-link"
          href={`/user/${encodeURI(props.username)}`}
          className={styles.username}
        >
          {props.username}
        </Link>
        <Text className={styles.date}>{props.createdAt}</Text>
      </div>
    </div>
  );
};
