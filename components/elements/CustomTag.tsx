import { Tag } from '@chakra-ui/tag';
import React, { PropsWithChildren } from 'react';

type TagProps = React.ComponentProps<typeof Tag>;

export const CustomTag = ({ children, ...rest }: PropsWithChildren<TagProps>) => (
  <Tag variant={'vocdoni'} {...rest}>
    {children}
  </Tag>
);
