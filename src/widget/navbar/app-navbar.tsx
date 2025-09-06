import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useTranslation } from "react-i18next";

export const AppNavbar = () => {
  const { t, i18n } = useTranslation();
  return (
    <nav className="h-16 flex justify-between bg-white items-center px-3 border-b border-gray-200">
      <Select
        value={i18n.language}
        onValueChange={(e) => i18n.changeLanguage(e)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ru">{t("ru")}</SelectItem>
          <SelectItem value="tk">{t("tk")}</SelectItem>
        </SelectContent>
      </Select>
      <Button>Login</Button>
    </nav>
  );
};
