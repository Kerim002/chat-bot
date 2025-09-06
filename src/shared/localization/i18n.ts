import ru from "./messages/ru.json";
import tk from "./messages/tk.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    tk: { translation: tk },
  },
  fallbackLng: "tk",
  interpolation: {
    escapeValue: false,
  },
});
