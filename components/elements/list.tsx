import React, { FC } from "react";
import { QuoteInterface } from "../interfaces";
import styles from "@styles/blog.module.css";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
interface Props {
  data: QuoteInterface;
  image?: string | false;
}

const QuoteList: FC<Props> = ({ data, image = false }) => {
  const timeHandler = (date: number) => {
    return moment(new Date(date)).fromNow();
  };

  return (
    <article className={styles.quote_list}>
      <div className={styles.top}>
        <div className={styles.user_info}>
          <img src={!image ? "./images.png" : image} />
          <a href={`/profile?userId=${data.userId}`}>{data.username}</a>
        </div>
      </div>
      <div className={styles.content}>
        <p>{data.quote}</p>
        <span>{data.author}</span>
      </div>

      <div className={styles.footer}>
        <span>Created {timeHandler(data.createdAt)}</span>
      </div>
    </article>
  );
};

export default QuoteList;
