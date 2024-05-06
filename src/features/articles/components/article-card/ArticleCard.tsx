import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Tag } from "@/components/tag";
import { Title } from "@/components/title";
import { Paragraph } from "@/components/paragraph";

import { HeartFilled } from "@ant-design/icons";
import React from "react";
import classNames from "classnames";

type TArticleCard = {
  numOfLikes: number;
  articleTitle: string;
  articleDescription: string;
  authorUsername: string;
  articleCreatedAt: string;
  articleLink: string;
  hasLiked?: boolean;
  avatarSrc?: string;
  tags?: string[];
  onClickLike?: () => void;
};
import styles from "./styles.module.css";
import { WithStyle } from "@/types/styles";
import { ArticleMeta } from "../article-meta";
/**
 * This is used to render the article
 */
export const ArticleCard = (props: WithStyle<TArticleCard>) => {
  return (
    <article
      className={classNames(
        styles["spacer-vertical"],
        styles.root,
        props.className,
      )}
      style={props.style}
    >
      <header className={styles["header"]}>
        <ArticleMeta
          avatarSrc={props.avatarSrc}
          username={props.authorUsername}
          createdAt={props.articleCreatedAt}
        />

        <Button
          icon={<HeartFilled />}
          onClick={props.onClickLike}
          type={props.hasLiked ? "primary" : "default"}
          data-testid="like-button"
        >
          {props.numOfLikes}
        </Button>
      </header>

      <main>
        <Link href={props.articleLink} type="next-link">
          <Title level={2} ellipsis={{ rows: 2 }}>
            {props.articleTitle}
          </Title>
          <Paragraph ellipsis={{ rows: 3 }}>
            {props.articleDescription}
          </Paragraph>
        </Link>
      </main>

      <footer className={styles["footer"]}>
        <Link href={props.articleLink} type="next-link">
          Selengkapnya...
        </Link>

        {props.tags?.length && props.tags.length > 0 && (
          <div className={classNames(styles["spacer-horizontal"], styles.tags)}>
            {props.tags.map((v) => (
              <Tag key={v}>{v}</Tag>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
};
