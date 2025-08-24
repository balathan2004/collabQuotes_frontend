import { FC } from "react";
import { QuoteInterface } from "../interfaces";
import styles from "@styles/blog.module.css";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
// import SendData from "@components/utils/sendData";
interface Props {
  data: QuoteInterface;
  image?: string | false;
  idSelector: React.Dispatch<React.SetStateAction<string>>
}


const AuthorQuoteList: FC<Props> = ({
  data,
  image = false,
  idSelector
}) => {
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
        <DeleteIcon onClick={()=>idSelector(data.quoteId)} className={styles.delete_icon} />
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

export default AuthorQuoteList;
