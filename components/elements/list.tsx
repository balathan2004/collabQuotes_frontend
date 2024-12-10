import React, { FC } from "react";
import { QuoteInterface } from "../interfaces";
import styles from "@styles/tweet_blog.module.css"

interface Props {
  data: QuoteInterface;
}

const QuoteList: FC<Props> = ({ data }) => {
  return (
    <div className={styles.quote_list}>
      <p>{data.quote}</p>
      <span>{data.author}</span>
    </div>
  );
};

export default QuoteList
