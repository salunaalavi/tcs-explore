import { Container } from "@/components/container";
import { Layout } from "@/layouts/Layout";
import classNames from "classnames";
import React, { ReactElement } from "react";

import styles from "./styles.module.css";
import { Title } from "@/components/title";
import { Paragraph } from "@/components/paragraph";
import { GetStaticPaths, GetStaticProps } from "next";
import { ArticleMeta, TAuthor, getPublicArticle } from "@/features/articles";
import { Button } from "@/components/button";
import { HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { Tag } from "@/components/tag";
import { useNotificationStore } from "@/stores/notifications";

type TArticlePage = {
  title: string;
  description: string;
  author: TAuthor;
  favorited: boolean;
  favoritesCount: number;
  body: string;
  tagList: string[];
  createdAt: string;
};
const Article = (props: TArticlePage) => {
  const { showUnderDevMessage } = useNotificationStore();

  return (
    <>
      <header className={classNames(styles.header, styles["content-wrapper"])}>
        <Container>
          <Title
            level={1}
            className={classNames(styles["header-text"], styles.title)}
          >
            {props.title}
          </Title>
          <Paragraph className={styles["header-text"]}>
            {props.description}
          </Paragraph>
          <footer className={classNames(styles["header-meta"])}>
            <ArticleMeta
              username={props.author.username}
              createdAt="December 9, 2022"
              avatarSrc={props.author.image}
              variant="white"
            />
            <Button
              className={styles["header-button"]}
              icon={<PlusOutlined />}
              onClick={() => showUnderDevMessage()}
            >
              {`Follow ${props.author.username}`}
            </Button>
            <Button
              className={styles["header-button"]}
              icon={<HeartOutlined />}
              onClick={() => showUnderDevMessage()}
            >
              {`Favorite artikel (${props.favoritesCount})`}
            </Button>
          </footer>
        </Container>
      </header>

      <main className={styles["content-wrapper"]}>
        <Container>
          <Paragraph>{props.body}</Paragraph>
          <footer>
            {props.tagList.map((v) => (
              <Tag key={v}>{v}</Tag>
            ))}
          </footer>
        </Container>
      </main>

      <footer className={classNames(styles["content-wrapper"])}>
        <Container>
          <div className={styles.footer}>
            <div className={styles["header-meta"]}>
              <ArticleMeta
                username={props.author.username}
                createdAt="December 9, 2022"
                avatarSrc={props.author.image}
              />
              <Button
                onClick={() => showUnderDevMessage()}
                className={styles["header-button"]}
                icon={<PlusOutlined />}
              >
                {`Follow ${props.author.username}`}
              </Button>
              <Button
                onClick={() => showUnderDevMessage()}
                className={styles["header-button"]}
                icon={<HeartOutlined />}
              >
                {`Favorite artikel (${props.favoritesCount})`}
              </Button>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

Article.withLayout = (page: ReactElement) => {
  return <Layout activeLink="none">{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<TArticlePage> = async (ctx) => {
  const articleSlug = ctx.params?.["article-slug"];
  if (!articleSlug) {
    return {
      notFound: true,
    };
  }

  const {
    data: { article },
  } = await getPublicArticle({ articleSlug: articleSlug as string });

  return {
    props: {
      title: article.title,
      description: article.description,
      author: article.author,
      body: article.body,
      favorited: article.favorited,
      favoritesCount: article.favoritesCount,
      tagList: article.tagList,
      createdAt: article.createdAt,
    },
  };
};

export default Article;
