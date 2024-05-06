import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Title } from "@/components/title";
import {
  ArticleForm,
  TArticleFormValues,
  usePublicArticle,
} from "@/features/articles";
import { TFormInstance } from "@/components/form";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import styles from "./styles.module.css";
import { useNotificationStore } from "@/stores/notifications";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { updateArticle } from "@/features/articles";
import { Text } from "@/components/text";
import { formValuesToPayload, queryResponseToFormValues } from "./utils";
import { Skeleton } from "@/components/skeleton";

export default function UpdateArticle() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const articleQuery = usePublicArticle({
    shouldFetch: Boolean(router.query["article-slug"] as string),
    articleSlug: router.query["article-slug"] as string,
  });

  const notify = useNotificationStore().getInstance();
  const handleFinish = async (_: TArticleFormValues, form: TFormInstance) => {
    try {
      setIsSubmitting(true);

      const changedValues = form.getFieldsValue(
        true,
        (meta) => meta.touched,
      ) as Partial<TArticleFormValues>;

      const res = await updateArticle(
        router.query["article-slug"] as string,
        formValuesToPayload(changedValues),
      );

      notify.success({
        message: "Berhasil mengubah artikel",
        description: (
          <Text>
            Silahkan cek artikel dengan menclik{" "}
            <Link
              type="next-link"
              href={`/app/artikel/${res.data.article.slug}`}
            >
              disini
            </Link>
          </Text>
        ),
      });
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <Container className={styles.form}>
        <header>
          <Title level={1}>Edit Artikel</Title>
        </header>

        {articleQuery.article ? (
          <ArticleForm
            onFinish={handleFinish}
            initialValues={queryResponseToFormValues(articleQuery)}
            isSubmitting={isSubmitting}
          />
        ) : (
          <Skeleton rows={8} />
        )}
      </Container>
    </div>
  );
}

UpdateArticle.withLayout = (page: ReactElement) => {
  return (
    <AuthenticatedLayout activeLink="create-article">
      {page}
    </AuthenticatedLayout>
  );
};

UpdateArticle.isProtected = true;
