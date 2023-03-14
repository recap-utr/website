import {
  ListItem,
  ListItemProps,
  ListProps,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";

export interface Props extends React.PropsWithChildren {
  wrapperProps?: ListProps;
  itemProps?: ListItemProps;
}

export const Papers: React.FC<Props> = ({
  children,
  itemProps,
  wrapperProps,
}) => {
  return (
    <UnorderedList spacing={3} {...wrapperProps}>
      {React.Children.map(children, (paper, idx) => (
        <ListItem {...itemProps} key={idx}>
          {paper}
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default Papers;
