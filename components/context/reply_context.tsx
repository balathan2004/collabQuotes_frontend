import React, { useContext, useState, FC, ReactNode } from "react";

export interface ReplyContextType {
    reply: replyType;
    setReply: React.Dispatch<React.SetStateAction<string | false>>;
  }


  export const ReplyContext = React.createContext<ReplyContextType>({
    reply: false,
    setReply: () => {},
  });


interface Props {
  children: ReactNode;
}
export type replyType = string | false;





const ReplyHolder: FC<Props> = ({ children }) => {
  const [reply, setReply] = useState<replyType>(false);

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      {children}
    </ReplyContext.Provider>
  );
};

export const useReplyContext = ()=>useContext(ReplyContext)

export default ReplyHolder;