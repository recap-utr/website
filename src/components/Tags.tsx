import { Wrap, WrapItem, WrapItemProps, WrapProps } from "@chakra-ui/react";
import React from "react";

export interface Props extends React.PropsWithChildren {
  wrapperProps?: WrapProps;
  itemProps?: WrapItemProps;
}

export const Tags: React.FC<Props> = ({
  children,
  itemProps,
  wrapperProps,
}) => {
  return (
    <Wrap
      justify="center"
      mt={10}
      mb={10}
      spacingX={5}
      spacingY={2}
      {...wrapperProps}
    >
      {React.Children.map(children, (tag, idx) => (
        <WrapItem {...itemProps} key={idx}>
          {tag}
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Tags;
