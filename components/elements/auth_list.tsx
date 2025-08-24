import { FC } from "react";
import { QuoteInterface } from "../interfaces";
import styles from "@styles/blog.module.css";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
// import SendData from "@components/utils/sendData";
interface Props {
  data: QuoteInterface;
  image?: string | false;
  isUserId: string;
  // filterData: React.Dispatch<React.SetStateAction<QuoteInterface[] | null>>;
}

const url = import.meta.env.VITE_DEST_URL;

const AuthorQuoteList: FC<Props> = ({
  data,
  image = false,
  isUserId,
  // filterData,
}) => {
  const timeHandler = (date: number) => {
    return moment(new Date(date)).fromNow();
  };


  const deletePost = async () => {
    if (isUserId !== data.userId) return;

    const sending_data = {
      userId: isUserId,
      quoteId: data.quoteId,
    };

 

    // const response = await SendData({
    //   route: `${url}/posts/delete_post`,
    //   data: sending_data,
    // });

    // if (response) {
    //   setReply(response.message);
    //   if (response.status == 200) {
    //     filterData(
    //       (prev) =>
    //         prev?.filter((item) => item.quoteId !== data.quoteId) || null
    //     );
    //   }
    // }
  };

  return (
    <article className={styles.quote_list}>
      <div className={styles.top}>
        <div className={styles.user_info}>
          <img src={!image ? "./images.png" : image} />
          <a href={`/profile?userId=${data.userId}`}>{data.username}</a>
        </div>
        <DeleteIcon onClick={deletePost} className={styles.delete_icon} />
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
