export type TGetPublicArticlesRequest = {
  page?: number;
  pageSize?: number;
};

export interface TGetPublicArticlesResponse {
  articles: TArticle[];
  articlesCount: number;
}

export type TUsePublicArticlesRequest = {
  page?: number;
  pageSize?: number;
  tag?: string;
  shouldFetch?: boolean;
  onSuccess?: (articles: TArticle[], articlesCount: number) => void;
};

export type TGetPublicArticleRequest = {
  articleSlug: string;
};

export type TGetPublicArticleResponse = {
  article: TArticle;
};

export type TUsePublicArticleRequest = {
  articleSlug: string;
  shouldFetch?: boolean;
};

export interface TUsePersonalFeedResponse {
  articles: TArticle[];
  articlesCount: number;
}

export type TUsePersonalFeedRequest = {
  page?: number;
  pageSize?: number;
  shouldFetch?: boolean;
  onSuccess?: (articles: TArticle[], articlesCount: number) => void;
};

export type TCreateArticleRequest = {
  title: string;
  description?: string;
  body: string;
  tagList?: string[];
};

export type TCreateArticleResponse = {
  article: TArticle;
};

export type TUpdateArticleRequest = Partial<TCreateArticleRequest>;

export type TUpdateArticleResponse = {
  article: TArticle;
};

export interface TArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: TAuthor;
}

export interface TAuthor {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}
