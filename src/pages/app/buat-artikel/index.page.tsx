import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Title } from "@/components/title";
import { ArticleForm, TArticle, TArticleFormValues } from "@/features/articles";
import { ReactElement, useState } from "react";

import styles from "./styles.module.css";
import { useNotificationStore } from "@/stores/notifications";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { createArticle } from "@/features/articles";
import { Text } from "@/components/text";
import { formValuesToPayload } from "./utils";

type TIndex = {
  articles: TArticle[];
};
export default function CreateArticle(props: TIndex) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = useNotificationStore().getInstance();
  const handleFinish = async (values: TArticleFormValues) => {
    try {
      setIsSubmitting(true);

      const res = await createArticle(formValuesToPayload(values));

      notify.success({
        message: "Berhasil membuat artikel",
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
          <Title level={1}>Buat Artikel</Title>
        </header>

        <ArticleForm onFinish={handleFinish} isSubmitting={isSubmitting} />
      </Container>
    </div>
  );
}

CreateArticle.withLayout = (page: ReactElement) => {
  return (
    <AuthenticatedLayout activeLink="create-article">
      {page}
    </AuthenticatedLayout>
  );
};

CreateArticle.isProtected = true;
