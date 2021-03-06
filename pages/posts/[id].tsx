import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

interface IPostData {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}

export default function Post({ postData }: IPostData) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  // idをリスト形式で返却する
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  // idを取得する
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
