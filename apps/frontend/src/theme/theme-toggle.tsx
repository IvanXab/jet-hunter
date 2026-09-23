import { Switch } from "@repo/ui";
import { useTheme } from "@/theme/use-theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      label="Тёмная тема"
      checked={theme === "dark"}
      onCheckedChange={(checked) => {
        setTheme(checked ? "dark" : "light");
      }}
    />
  );
}
