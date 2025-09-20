import { Button } from "@/shared/ui/button";
import { Settings, User } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  onSidebar: (e: string) => void;
  current: string;
};

const dialogRoutes = [
  {
    icon: Settings,
    name: "settings",
  },
  {
    icon: User,
    name: "profile",
  },
];

export const SettingsSidebar = ({ onSidebar, current }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-60 flex flex-col h-full gap-1">
      {dialogRoutes.map((item) => (
        <Button
          onClick={() => onSidebar(item.name)}
          className="justify-start"
          variant={item.name === current ? "secondary" : "ghost"}
        >
          <item.icon />
          {t(item.name)}
        </Button>
      ))}
    </div>
  );
};
