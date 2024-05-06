import { Tag } from "@/components/tag";
import { Space } from "antd";
import React from "react";

import styles from "./styles.module.css";
import { Text } from "@/components/text";
import { WithStyle } from "@/types/styles";
import { WithDataTestId } from "@/types/testing";

type TPopularTags = {
  tags: string[];
  onClickTag: (index: number, label: string) => void;
};
export const PopularTags = (props: WithDataTestId<WithStyle<TPopularTags>>) => {
  const handleClick = (index: number) => {
    props.onClickTag(index, props?.tags?.[index] ?? "Tidak ditemukan");
  };

  return (
    <Space
      direction="vertical"
      size={12}
      className={props.className}
      style={props.style}
      data-testid={props["data-testid"]}
    >
      <Text className={styles.title}>Popular Tags</Text>

      {props.tags.length > 0 && (
        <div className={styles.tags}>
          {props.tags.map((v, index) => (
            <Tag
              key={v}
              onClick={() => handleClick(index)}
              className={styles.tag}
            >
              {v}
            </Tag>
          ))}
        </div>
      )}
    </Space>
  );
};
