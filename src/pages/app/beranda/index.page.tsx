import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement, useEffect, useReducer } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

import { Container } from "@/components/container";
import { Paragraph } from "@/components/paragraph";
import { Title } from "@/components/title/Title";
import {
  ArticleCard,
  usePublicArticles,
  usePersonalFeed,
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
import { useNotificationStore } from "@/stores/notifications";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { TPageActions, TPageState } from "./types";
const pageReducer = (state: TPageState, action: TPageActions): TPageState => {
  switch (action.type) {
    case "PICK_TAG":
      return { page: 1, tab: "tag-feed", pickedTag: action.payload };
    case "PICK_GLOBAL":
      return {
        tab: "global-feed",
        page: 1,
        pickedTag: null,
      };
    case "PICK_PERSONAL":
      return {
        tab: "personal-feed",
        page: 1,
        pickedTag: null,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      throw new Error("Invalid action");
  }
};
export default function Articles() {
  const [pageState, dispatch] = useReducer(pageReducer, {
    page: 1,
    pickedTag: null,
    tab: "personal-feed",
  });

  const device = useDevice();

  const { tags, isLoading: isLoadingTags } = useTags();

  const personalFeedQuery = usePersonalFeed({
    shouldFetch: pageState.tab === "personal-feed",
    page: pageState.page,
  });

  const { showUnderDevMessage } = useNotificationStore();

  const articlesQuery = usePublicArticles({
    shouldFetch:
      pageState.tab === "global-feed" || pageState.tab === "tag-feed",
    tag: pageState.pickedTag ?? "",
    page: pageState.page,
  });

  const handleTabClick = (tabKey: TPageState["tab"]) => {
    if (tabKey === "global-feed") {
      dispatch({
        type: "PICK_GLOBAL",
      });
    } else if (tabKey === "personal-feed") {
      dispatch({
        type: "PICK_PERSONAL",
      });
    }
  };

  const handlePagination = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });

    scrollBackToTop();
  };

  const handleClickLike = () => {
    showUnderDevMessage();
  };

  const getPaginationTotal = (stateTab: TPageState["tab"]) => {
    switch (stateTab) {
      case "personal-feed":
        return personalFeedQuery.articlesCount;
      default:
        return articlesQuery.articlesCount;
    }
  };

  return (
    <>
      <main className={styles["content-wrapper"]}>
        <Container className={styles.articles}>
          <Tabs
            activeKey={pageState.tab}
            onTabClick={(v) => handleTabClick(v as TPageState["tab"])}
          >
            <Tabs.TabPane key="personal-feed" tab="Feed Artikel Personal">
              {personalFeedQuery.isLoading || personalFeedQuery.isValidating ? (
                <Skeleton rows={5} />
              ) : personalFeedQuery.articles.length > 0 ? (
                personalFeedQuery.articles.map((v, index) => (
                  <ArticleCard
                    className={classNames(styles.article, {
                      [styles["article-first-shown"]]: index === 0,
                      [styles["article-last-shown"]]:
                        index === personalFeedQuery.articles.length - 1,
                    })}
                    key={`${v.author}-${v.title}-${v.createdAt}`}
                    articleTitle={v.title}
                    articleDescription={v.description}
                    numOfLikes={v.favoritesCount}
                    articleLink={`/app/artikel/${v.slug}`}
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
            <Tabs.TabPane key="global-feed" tab="Feed Artikel Global">
              {articlesQuery.isLoading || articlesQuery.isValidating ? (
                <Skeleton rows={5} />
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
                    articleLink={`/app/artikel/${v.slug}`}
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
            {pageState.tab === "tag-feed" && (
              <Tabs.TabPane key="tag-feed" tab={`#${pageState.pickedTag}`}>
                {articlesQuery.isLoading || articlesQuery.isValidating ? (
                  <Skeleton rows={5} />
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
                      articleLink={`/app/artikel/${v.slug}`}
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
            )}
          </Tabs>

          {isLoadingTags ? (
            <Skeleton rows={device === "mobile" ? 1 : 2} />
          ) : (
            <PopularTags
              className={styles["popular-tags"]}
              tags={tags?.tags ?? []}
              onClickTag={(_, label) => {
                dispatch({ type: "PICK_TAG", payload: label });
              }}
            />
          )}
        </Container>
      </main>
      <footer className={styles["content-wrapper"]}>
        <Container>
          <PaginationCSR
            current={pageState.page}
            total={getPaginationTotal(pageState.tab) ?? 0}
            onChange={handlePagination}
          />
        </Container>
      </footer>
    </>
  );
}
Articles.withLayout = (page: ReactElement) => {
  return <AuthenticatedLayout activeLink="home">{page}</AuthenticatedLayout>;
};

Articles.isProtected = true;
