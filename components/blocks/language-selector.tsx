import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { HiLanguage } from 'react-icons/hi2';

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

  useEffect(() => {
    const usrLang =
      typeof window !== 'undefined' && typeof window.navigator.language !== 'undefined'
        ? window.navigator.language.substr(0, 2).toLowerCase()
        : process.env.LANG;
    i18n.changeLanguage(usrLang);
  }, []);

  const handleLanguageChange = useCallback(
    (languageCode: string) => {
      i18n.changeLanguage(languageCode);
    },
    [i18n]
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
