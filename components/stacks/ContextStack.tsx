import React from "react";
import ContextWrapper from "../context/context_wrapper";

import LoadingHolder from "../context/loading_context";

export default function ContextStack({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
 
      <LoadingHolder>
        <ContextWrapper>{children}</ContextWrapper>
      </LoadingHolder>
   
  );
}
