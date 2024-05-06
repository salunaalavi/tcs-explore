import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement, useEffect, useReducer } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

import { Container } from "@/components/container";
import { Paragraph } from "@/components/paragraph";
import { Title } from "@/components/title/Title";
import {
  getPublicArticles,
  ArticleCard,
  usePublicArticles,
} from "@/features/articles";
import { Layout } from "@/layouts/Layout";
import { Tabs } from "@/components/tabs";
import { Pagination } from "@/components/pagination";
import { PopularTags, useTags } from "@/features/tags";
import { Skeleton } from "@/components/skeleton";
import { ClientOnly } from "@/utils/client-only";
import { useDevice } from "@/utils/device";
import { PaginationCSR } from "@/components/pagination-client-side";
import { Empty } from "@/components/empty";
import { scrollBackToTop } from "@/utils/window";

import styles from "./styles.module.css";
import { validatePageParam } from "./utils";
import { TArticlesPage, TPageActions, TPageState } from "./types";
import { useNotificationStore } from "@/stores/notifications";
const pageReducer = (state: TPageState, action: TPageActions): TPageState => {
  switch (action.type) {
    case "pickTag":
      return { clientSidePage: 1, pickedTag: action.payload };
    case "PICK_GLOBAL":
      return {
        ...state,
        clientSidePage: 1,
        pickedTag: null,
      };
    case "NEXT_PAGE":
      return {
        ...state,
        clientSidePage: state.clientSidePage + 1,
      };
    case "PREV_PAGE":
      return {
        ...state,
        clientSidePage: state.clientSidePage - 1,
      };
    default:
      throw new Error("Invalid action");
  }
};
export default function Articles(props: TArticlesPage) {
  const [pageState, dispatch] = useReducer(pageReducer, {
    clientSidePage: 1,
    pickedTag: null,
  });

  const activeTab = pageState.pickedTag ? "tag-feed" : "global-feed";

  const router = useRouter();

  const device = useDevice();

  const { tags, isLoading: isLoadingTags } = useTags();

  const { showUnderDevMessage } = useNotificationStore();

  const articlesQuery = usePublicArticles({
    tag: pageState.pickedTag ?? "",
    page: pageState.clientSidePage,
    shouldFetch: pageState.pickedTag !== null,
  });

  useEffect(() => {
    // this is for replace url according to state
    if (!router) return;

    if (pageState.pickedTag) {
      router.push(
        `${router.pathname.replace(
          "[page]",
          String(pageState.clientSidePage),
        )}`,
        undefined,
        { shallow: true },
      );
    }
  }, [pageState.clientSidePage, pageState.pickedTag, router]);

  const handleTabClick = (tabKey: string) => {
    if (tabKey === "global-feed") {
      // make url go back to server side
      router.push(`${router.pathname.replace("[page]", "1")}`);

      dispatch({
        type: "PICK_GLOBAL",
      });
    }
  };
  const handlePagination = (page: number) => {
    if (
      page > pageState.clientSidePage &&
      page < (articlesQuery.articlesCount ?? 0)
    ) {
      dispatch({
        type: "NEXT_PAGE",
      });
    } else if (page < pageState.clientSidePage && page > 0) {
      dispatch({
        type: "PREV_PAGE",
      });
    }

    scrollBackToTop();
  };

  const handleClickLike = () => {
    showUnderDevMessage();
  };

  return (
    <>
      <header className={classNames(styles.header, styles["content-wrapper"])}>
        <Container>
          <Title
            level={1}
            className={classNames(styles["header-text"], styles.title)}
          >
            Conduit
          </Title>
          <Paragraph className={styles["header-text"]}>
            Tempat untuk berbagi ilmu dan bertukar pikiran
          </Paragraph>
        </Container>
      </header>
      <main className={styles["content-wrapper"]}>
        <Container className={styles.articles}>
          <Tabs activeKey={activeTab} onTabClick={handleTabClick}>
            <Tabs.TabPane key="global-feed" tab="Feed Artikel Global">
              {props.serverSideArticles.length > 0 ? (
                props.serverSideArticles.map((v, index) => (
                  <ArticleCard
                    className={classNames(styles.article, {
                      [styles["article-first-shown"]]: index === 0,
                      [styles["article-last-shown"]]:
                        index === props.serverSideArticles.length - 1,
                    })}
                    key={`${v.author}-${v.title}-${v.createdAt}`}
                    articleTitle={v.title}
                    articleDescription={v.description}
                    numOfLikes={v.favoritesCount}
                    articleLink={`/artikel/${v.slug}`}
                    tags={v.tagList}
                    onClickLike={handleClickLike}
                    avatarSrc={v.author.image}
                    authorUsername={v.author.username}
                    articleCreatedAt={v.createdAt}
                  />
                ))
              ) : (
                <Empty description="Tidak ada artikel" />
              )}
            </Tabs.TabPane>
            {pageState.pickedTag ? (
              <Tabs.TabPane key="tag-feed" tab={`#${pageState.pickedTag}`}>
                {articlesQuery.isLoading ? (
                  <div data-testid="tag-feed-loading">
                    <Skeleton rows={5} />
                  </div>
                ) : articlesQuery.articles.length > 0 ? (
                  articlesQuery.articles.map((v, index) => (
                    <ArticleCard
                      className={classNames(styles.article, {
                        [styles["article-first-shown"]]: index === 0,
                        [styles["article-last-shown"]]:
                          index === articlesQuery.articles.length - 1,
                      })}
                      key={`${v.author}-${v.title}-${v.createdAt}`}
                      articleTitle={v.title}
                      articleDescription={v.description}
                      numOfLikes={v.favoritesCount}
                      articleLink={`/artikel/${v.slug}`}
                      tags={v.tagList}
                      onClickLike={handleClickLike}
                      avatarSrc={v.author.image}
                      authorUsername={v.author.username}
                      articleCreatedAt={v.createdAt}
                    />
                  ))
                ) : (
                  <Empty description="Tidak ada artikel" />
                )}
              </Tabs.TabPane>
            ) : null}
          </Tabs>

          <ClientOnly style={{ minHeight: "125px" }}>
            {isLoadingTags ? (
              <Skeleton rows={device === "mobile" ? 1 : 2} />
            ) : (
              <PopularTags
                className={styles["popular-tags"]}
                tags={tags?.tags ?? []}
                onClickTag={(_, label) => {
                  dispatch({ type: "pickTag", payload: label });
                }}
                data-testid="popular-tags"
              />
            )}
          </ClientOnly>
        </Container>
      </main>
      <footer className={styles["content-wrapper"]} key={props.serverSidePage}>
        <Container>
          {pageState.pickedTag ? (
            articlesQuery.isLoading ? null : (
              <PaginationCSR
                current={pageState.clientSidePage}
                total={articlesQuery.articlesCount ?? 0}
                onChange={handlePagination}
              />
            )
          ) : (
            <Pagination
              defaultCurrent={props.serverSidePage}
              total={props.serverSideArticlesCount}
              linkPrefix="/artikel/page"
            />
          )}
        </Container>
      </footer>
    </>
  );
}
Articles.withLayout = (page: ReactElement) => {
  return <Layout activeLink="home">{page}</Layout>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<TArticlesPage> = async (ctx) => {
  const { page, isQueryParamInvalid } = validatePageParam(ctx.params);

  if (isQueryParamInvalid || page === null) {
    return {
      notFound: true,
    };
  }

  const res = await getPublicArticles({ page });

  return {
    props: {
      serverSidePage: page,
      serverSideArticles: res.data.articles ?? [],
      serverSideArticlesCount: res.data.articlesCount,
    },
  };
};
