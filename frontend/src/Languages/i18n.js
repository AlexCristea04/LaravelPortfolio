import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import home_en from './en/home.json';
import home_fr from './fr/home.json';
import navbar_en from './en/navbar.json';
import navbar_fr from './fr/navbar.json';
import projects_en from './en/projects.json';
import projects_fr from './fr/projects.json';
import contact_en from './en/contact.json';
import contact_fr from './fr/contact.json';
import resume_en from './en/resume.json';
import resume_fr from './fr/resume.json';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',

  resources: {
    en: {
      navbar: navbar_en,
      home: home_en,
      contact: contact_en,
      resume: resume_en,
      projects: projects_en
    },

    fr: {
      navbar: navbar_fr,
      home: home_fr,
      contact: contact_fr,
      resume: resume_fr,
      projects: projects_fr
    },
  },
});

export default i18n;
