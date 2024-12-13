import { QuotesInterfaceWithProfile, PostResponseConfig } from "@components/interfaces";
import React, { FC, useEffect, useState } from "react";
import QuoteList from "../elements/list";
import styles from "@styles/blog.module.css";

import { useLoadingContext } from "@components/context/loading_context";
const url = import.meta.env.VITE_DEST_URL;
const Blog: FC = () => {
  const [quotesData, setQuotesData] = useState<QuotesInterfaceWithProfile[] | null>(null);
  const { setIsLoading } = useLoadingContext();
  useEffect(() => {
    setIsLoading(true);
    async function GetQuotes() {
      const response = await fetch(`${url}/posts/get_posts`, {
        method: "GET",
      });
      const res = (await response.json()) as PostResponseConfig;
      if (res.status == 200) {
        setQuotesData(res.quotes);
      }
      setIsLoading(false);
    }
    GetQuotes();
  }, []);

  return (
    <div className="main_container">
      <div className={styles.container}>
        <h1>Blog</h1>
        {quotesData?.map((item) => (
          <QuoteList key={item.quoteId} data={item} image={item.profile_url} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
