import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo } from 'react';
import { HiLanguage } from 'react-icons/hi2';
import LanguageDetector from 'i18next-browser-languagedetector';

type LanguageOption = {
  code: string;
  name: string;
};

const languages: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'ca', name: 'Català' },
  { code: 'es', name: 'Español' },
];

const LanguageSelector = ({ bg = 'transparent', size, color }: { bg?: string; size?: string; color?: string }) => {
  const { i18n } = useTranslation();

  const languageDetector = useMemo(() => new LanguageDetector(), []);

  useEffect(() => {
    languageDetector.init();
    const lng = languageDetector.detect();
    i18n.changeLanguage(typeof lng === 'string' ? lng : lng[0]);
  }, [i18n, languageDetector]);

  const handleLanguageChange = useCallback(
    (languageCode: string) => {
      i18n.changeLanguage(languageCode);
      languageDetector.cacheUserLanguage(languageCode);
    },
    [i18n, languageDetector]
  );

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HiLanguage />}
        variant="outline"
        bg={bg}
        size={size}
        color={color}
      />
      <MenuList>
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            border={'none'}
            fontSize="md"
          >
            {language.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
