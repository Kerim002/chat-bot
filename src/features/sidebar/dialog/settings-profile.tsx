import { authQueries } from "@/entities/auth/api";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const SettingsProfile = () => {
  const { t } = useTranslation();
  const { data } = useQuery(authQueries.protected());

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between">
        <p>{t("username")}</p>
        <p className="text-gray-500 font-light">{data?.name}</p>
      </div>
    </div>
  );
};
