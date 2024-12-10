import React, { Component, useEffect } from "react";
import { useReplyContext } from "../context/reply_context"
const PageNotFound = () => {

    const { setReply } = useReplyContext();


    const handleClick=()=>{
      console.log("clicked")
      setReply("hello")
    }

  return (
    <div>
      <h1>The Page You're Looking is Not Found or You're Not Authenticated</h1>
    <button onClick={handleClick}>Click</button>
    </div>
  );
};


export default PageNotFound;