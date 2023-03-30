import React, { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLInputElement>;

const SingleTextInput = ({ ...props }: Props) => {
  return <input {...props} />;
};

export default SingleTextInput;
