import React from "react";
import ContextWrapper from "../context/context_wrapper";
import ReplyHolder from "../context/reply_context";

import LoadingHolder from "../context/loading_context";

export default function ContextStack({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReplyHolder>
      <LoadingHolder>
        <ContextWrapper>{children}</ContextWrapper>
      </LoadingHolder>
    </ReplyHolder>
  );
}
