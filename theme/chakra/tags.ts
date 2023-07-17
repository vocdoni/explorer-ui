import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys);

const vocdoniTags = definePartsStyle({
  container: {
    padding: '4px 12px',
    borderRadius: '4px',
    height: '18px',
    fontStyle: 'normal',
    fontWeight: '700',
    fontFamily: 'Manrope',
    fontSize: '12px',
    lineHeight: '150%',
    color: '#fff',
    bg: 'rgb(35, 114, 116)',
  },
});

export const tagTheme = defineMultiStyleConfig({
  variants: {
    vocdoni: vocdoniTags,
  },
});
