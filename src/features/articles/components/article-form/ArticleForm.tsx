import React from "react";
import { Input } from "antd";
import { Form, TFormInstance } from "@/components/form";

import styles from "./styles.module.css";
import { Button } from "@/components/button";

export type TArticleFormValues = {
  title: string;
  body: string;
  description: string | undefined;
  tagList: string | undefined;
};

export type TArticleForm = {
  onFinish?: (values: TArticleFormValues, form: TFormInstance) => void;
  initialValues?: Partial<TArticleFormValues>;
  isSubmitting?: boolean;
};
export const ArticleForm = (props: TArticleForm) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={(values) => {
        props?.onFinish?.(values, form);
      }}
      initialValues={props.initialValues}
    >
      <Form.Item
        label="Judul"
        name="title"
        rules={[
          { required: true, message: "Tolong input judul" },
          {
            min: 8,
            message: "Judul minimal 8 karakter",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Deskripsi"
        name="description"
        rules={[{ min: 10, message: "Deskripsi minimal 10 karakter" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Konten"
        name="body"
        rules={[
          { required: true, message: "Tolong input konten" },
          { min: 20, message: "Konten minimal 20 karakter" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Tag"
        name="tagList"
        rules={[
          {
            pattern: /^[a-zA-Z0-9]+(?:,[a-zA-Z0-9]+)*$/,
            message:
              "Harus tag dipisah dengan koma. Contoh: introduction,tutorial,implementasi",
          },
        ]}
      >
        <Input placeholder="Masukkan tag dipisah dengan koma. Contoh: introduction,tutorial,implementasi" />
      </Form.Item>

      <Form.Item className={styles["submit-wrapper"]}>
        <Button
          type="primary"
          htmlType="submit"
          className={styles["submit-button"]}
          loading={props.isSubmitting}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
