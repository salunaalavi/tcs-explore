import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Link } from "@/components/link";
import { Title } from "@/components/title";
import { TArticle } from "@/features/articles";
import { Layout } from "@/layouts/Layout";
import { Form, Input } from "antd";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

import styles from "./styles.module.css";
import { VALID_EMAIL_REGEX } from "@/features/auth";
import { useNotificationStore } from "@/stores/notifications";
import { useAuthStore } from "@/stores/auth";

type TSignUp = {
  articles: TArticle[];
};

type TFormValues = {
  email: string;
  password: string;
  username: string;
};
export default function SignUp(props: TSignUp) {
  const router = useRouter();

  const authStore = useAuthStore();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = useNotificationStore().getInstance();
  const onFinish = async (values: TFormValues) => {
    try {
      setIsSubmitting(true);

      await authStore.doRegister({
        email: values.email,
        password: values.password,
        username: values.username,
      });

      notify.success({
        message: "Berhasil mendaftarkan akun",
        description: "Diarahkan ke beranda",
      });

      router.push("/app/beranda");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <Container className={styles.form}>
        <header>
          <Title level={1}>Register</Title>
          <Link type="next-link" href="/login">
            Sudah punya akun ?
          </Link>
        </header>

        <Form onFinish={onFinish} layout="vertical" requiredMark="optional">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Tolong input username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Tolong input email" },
              {
                pattern: VALID_EMAIL_REGEX,
                message: "Harus email yang valid",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Tolong input password" },
              { min: 5, message: "Password minimal 5 karakter" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className={styles["submit-wrapper"]}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["submit-button"]}
              loading={isSubmitting}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
}

SignUp.withLayout = (page: ReactElement) => {
  return <Layout activeLink="sign-up">{page}</Layout>;
};

SignUp.redirectIfDoneAuth = true;
