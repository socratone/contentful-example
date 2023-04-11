import { graphql } from '../generates/gql';
import { GetStaticProps, NextPage } from 'next';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BlogPostsQuery } from '@/generates/gql/graphql';

// 아래 요청이 contentful model에 유효하면 타입을 자동으로 생성해준다.
const blogPosts = graphql(/* GraphQL */ `
  query blogPosts($preview: Boolean) {
    blogPostCollection(preview: $preview) {
      items {
        title
      }
    }
  }
`);

type HomeProps = {
  data: BlogPostsQuery;
};

const apolloClient = new ApolloClient({
  uri: process.env.CONTENTFUL_CONTENT_DELIVERY_API,
  cache: new InMemoryCache(),
});

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data } = await apolloClient.query({
    query: blogPosts,
    context: {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN}`,
      },
    },
  });

  return {
    props: {
      data,
    },
  };
};

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Home;
