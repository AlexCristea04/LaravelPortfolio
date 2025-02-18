import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import home_en from './en/home.json';
import home_fr from './fr/home.json';
import navbar_en from './en/navbar.json';
import navbar_fr from './fr/navbar.json';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',

  resources: {
    en: {
      navbar: navbar_en,
      home: home_en
    },

    fr: {
      navbar: navbar_fr,
      home: home_fr
    },
  },
});

export default i18n;
