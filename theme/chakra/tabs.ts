import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { tabsAnatomy } from '@chakra-ui/anatomy';
import { theme } from '@theme/global';
import { hexToRgbA } from '@lib/util';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const vocdoniTabs = definePartsStyle(() => {
  return {
    tab: {
      cursor: 'pointer',
      border: `2px solid ${theme.lightBorder}`,
      background: `linear-gradient(
        106.26deg,
          ${hexToRgbA(theme.accent1B)} 5.73%,
          ${hexToRgbA(theme.accent1)} 93.83%
      )`,
      display: 'inline-block',
      padding: '8px 15px',
      fontSize: '90%',
      fontFamily: '"Manrope", "Roboto", Arial, Helvetica, sans-serif !important;',
      fontWeight: '600',
      boxShadow: '0px 6px 6px rgba(180, 193, 228, 0.35)',
      borderRadius: '8px',
      boxSizing: 'border-box',
      lineHeight: 'normal',
      whiteSpace: 'nowrap',
      color: 'white',
      _hover: {
        background: `linear-gradient(
          106.26deg,
            ${hexToRgbA(theme.accent1B, 0.8)} 5.73%,
            ${hexToRgbA(theme.accent1, 0.8)} 93.83%
        )`,
      },
      _selected: {
        background: `linear-gradient(
          106.26deg,
              ${hexToRgbA(theme.accent1B, 0.7)} 5.73%,
            ${hexToRgbA(theme.accent1, 0.7)} 93.83%
        )`,
      },
    },
    tablist: {
      gap: '4px',
    },
    tabpanel: {
      marginTop: '20px',
    },
  };
});

const variants = {
  vocdoni: vocdoniTabs,
};

export const tabsTheme = defineMultiStyleConfig({ variants });
