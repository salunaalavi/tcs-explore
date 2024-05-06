import { Container } from "@/components/container";
import classNames from "classnames";
import React, { ReactElement, useState } from "react";

import styles from "./styles.module.css";
import { Title } from "@/components/title";
import { Paragraph } from "@/components/paragraph";
import {
  ArticleMeta,
  TAuthor,
  deleteArticle,
  usePublicArticle,
  usePublicArticles,
} from "@/features/articles";
import { Button } from "@/components/button";
import {
  HeartOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Tag } from "@/components/tag";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { useRouter } from "next/router";
import { Skeleton } from "@/components/skeleton";
import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notifications";
const Article = () => {
  const router = useRouter();

  const authStore = useAuthStore();

  const [isDeleting, setIsDeleting] = useState(false);

  const { getInstance, showUnderDevMessage } = useNotificationStore();

  const notify = getInstance();

  const articleQuery = usePublicArticle({
    shouldFetch: Boolean(router.query["article-slug"] as string),
    articleSlug: router.query["article-slug"] as string,
  });

  const { article } = articleQuery;

  const handleEdit = () => {
    router.push(`/app/edit-artikel/${router.query["article-slug"] as string}`);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteArticle(router.query["article-slug"] as string);

      notify.success({
        message: `Berhasil menghapus` + (` ${article?.title}` ?? " artikel"),
        description: "Diarahkan ke halaman beranda",
      });

      router.push("/app/beranda");
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <header className={classNames(styles.header, styles["content-wrapper"])}>
        <Container>
          {article ? (
            <Title
              level={1}
              className={classNames(styles["header-text"], styles.title)}
            >
              {article.title}
            </Title>
          ) : (
            <Skeleton
              title={false}
              rows={2}
              className={styles["skeleton-white"]}
            />
          )}

          {article ? (
            <Paragraph className={styles["header-text"]}>
              {article.description}
            </Paragraph>
          ) : (
            <Skeleton rows={3} className={styles["skeleton-white"]} />
          )}

          <footer className={classNames(styles["header-meta"])}>
            {article ? (
              <>
                <ArticleMeta
                  username={article.author.username}
                  createdAt="December 9, 2022"
                  avatarSrc={article.author.image}
                  variant="white"
                />
                {authStore.user?.username === article.author.username ? (
                  <>
                    <Button
                      loading={isDeleting}
                      icon={<EditOutlined />}
                      className={styles["header-button"]}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      loading={isDeleting}
                      icon={<DeleteOutlined />}
                      className={styles["header-button"]}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={styles["header-button"]}
                      icon={<PlusOutlined />}
                      onClick={() => showUnderDevMessage()}
                    >
                      {`Follow ${article.author.username}`}
                    </Button>
                    <Button
                      className={styles["header-button"]}
                      icon={<HeartOutlined />}
                      onClick={() => showUnderDevMessage()}
                    >
                      {`Favorite artikel (${article.favoritesCount})`}
                    </Button>
                  </>
                )}
              </>
            ) : (
              <Skeleton
                rows={2}
                title={false}
                className={styles["skeleton-white"]}
              />
            )}
          </footer>
        </Container>
      </header>

      <main className={styles["content-wrapper"]}>
        <Container>
          {article ? (
            <>
              <Paragraph>{article.body}</Paragraph>
              <footer>
                {article.tagList.map((v) => (
                  <Tag key={v}>{v}</Tag>
                ))}
              </footer>
            </>
          ) : (
            <Skeleton rows={5} />
          )}
        </Container>
      </main>

      <footer className={classNames(styles["content-wrapper"])}>
        <Container>
          <div className={styles.footer}>
            {article ? (
              <div className={styles["header-meta"]}>
                <ArticleMeta
                  username={article.author.username}
                  createdAt="December 9, 2022"
                  avatarSrc={article.author.image}
                />
                {authStore.user?.username === article.author.username ? (
                  <>
                    <Button
                      loading={isDeleting}
                      icon={<EditOutlined />}
                      className={styles["header-button"]}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      loading={isDeleting}
                      icon={<DeleteOutlined />}
                      className={styles["header-button"]}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className={styles["header-button"]}
                      icon={<PlusOutlined />}
                      onClick={() => showUnderDevMessage()}
                    >
                      {`Follow ${article.author.username}`}
                    </Button>
                    <Button
                      className={styles["header-button"]}
                      icon={<HeartOutlined />}
                      onClick={() => showUnderDevMessage()}
                    >
                      {`Favorite artikel (${article.favoritesCount})`}
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <Skeleton rows={2} title={false} />
            )}
          </div>
        </Container>
      </footer>
    </>
  );
};

Article.withLayout = (page: ReactElement) => {
  return <AuthenticatedLayout activeLink="none">{page}</AuthenticatedLayout>;
};

Article.isProtected = true;

export default Article;

// refetch global articles
