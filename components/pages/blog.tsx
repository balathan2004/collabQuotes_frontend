import { QuotesWithProfile } from "@components/interfaces";
import { FC, useEffect, useState } from "react";
import QuoteList from "../elements/list";
import styles from "@styles/blog.module.css";
import InfiniteScroll from "react-infinite-scroller";
import { debounce } from "lodash";
import { useLazyGetBlogQuery } from "@components/redux/apis/blogApi";

function LoadingTextComponent() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dot}></div>
      <span className={styles.text}>Fetching Posts</span>
    </div>
  );
}

const Blog: FC = () => {
  const [quotesData, setQuotesData] = useState<QuotesWithProfile[]>([]);

  const [query, setQuery] = useState({
    page: 0,
    limit: 10,
  });

  const [getBlogs, { isLoading }] = useLazyGetBlogQuery();

  const [hasMorePosts, setHasMorePosts] = useState(true);

  const debouncedFunction = debounce(async () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  }, 1000);

  const triggerMorePosts = async () => {
    if (isLoading || !hasMorePosts) return; // Prevent multiple requests
    debouncedFunction();
  };

  useEffect(() => {
    getBlogs(query)
      .unwrap()
      .then((res) => {
        setHasMorePosts((res.totalCount || 0) > query.page * query.limit);
        setQuotesData((prev) => {
          const existingIds = new Set(prev.map((quote) => quote.quoteId));

          const newQuotes = res.data.filter(
            (quote) => !existingIds.has(quote.quoteId),
          );

          return [...prev, ...newQuotes];
        });
      });
  }, [query.page]);

  return (
    <div className="main_container">
      <div className={styles.container}>
        <h1>Blog</h1>

        <InfiniteScroll
          pageStart={0}
          loadMore={triggerMorePosts} // Use the debounced function for scrolling
          hasMore={hasMorePosts}
        >
          {quotesData?.map((item) => (
            <QuoteList
              key={item.quoteId}
              data={item}
              image={item.profile_url}
            />
          ))}
          <div></div>
        </InfiniteScroll>

        {hasMorePosts ? <LoadingTextComponent /> : ""}
      </div>
    </div>
  );
};

export default Blog;
