import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Chip,
  DataTable,
  type DataTableColumn,
  Meter,
  SectionHeading,
  SelectField,
  Switch,
  Tabs,
  TextField,
} from "@repo/ui";
import { useState } from "react";

interface Flight {
  id: string;
  tail: string;
  route: string;
  status: "в воздухе" | "на земле" | "задержан";
}

const FLIGHTS: readonly Flight[] = [
  { id: "1", tail: "RA-89013", route: "SVO → LED", status: "в воздухе" },
  { id: "2", tail: "VP-BKC", route: "DME → AER", status: "на земле" },
  { id: "3", tail: "RA-73412", route: "VKO → KZN", status: "задержан" },
];

const FLIGHT_COLUMNS: readonly DataTableColumn<Flight>[] = [
  {
    key: "tail",
    header: "Борт",
    mono: true,
    render: (flight) => flight.tail,
  },
  {
    key: "route",
    header: "Маршрут",
    render: (flight) => flight.route,
  },
  {
    key: "status",
    header: "Статус",
    width: "140px",
    render: (flight) => (
      <Badge tone={flight.status === "задержан" ? "accent" : "muted"}>
        {flight.status}
      </Badge>
    ),
  },
];

const TABS = [
  { id: "live", label: "Живые" },
  { id: "archive", label: "Архив" },
] as const;

const REGIONS = [
  { value: "eu", label: "Европа" },
  { value: "asia", label: "Азия" },
];

export function App() {
  const [activeTab, setActiveTab] = useState<string>("live");
  const [query, setQuery] = useState("");
  const [notify, setNotify] = useState(true);
  const [onlyPrivate, setOnlyPrivate] = useState(false);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-3">
        <SectionHeading index="01" title="UI-KIT" />
        <h1 className="text-title text-ink">jet-hunter</h1>
        <div className="flex gap-2">
          <Chip>React 19</Chip>
          <Chip>Vite</Chip>
          <Chip>React Compiler</Chip>
        </div>
      </header>

      <Alert title="Компоненты берутся из @repo/ui">
        Стили приезжают одним импортом «@repo/ui/styles.css», токены — из
        @repo/tailwind-config.
      </Alert>

      <section className="flex flex-col gap-4">
        <SectionHeading index="02" title="УПРАВЛЕНИЕ" />
        <Tabs items={TABS} activeId={activeTab} onSelect={setActiveTab} />
        <div className="flex gap-3">
          <Button>Найти борт</Button>
          <Button variant="secondary">Сбросить</Button>
          <Button variant="quiet" size="small" disabled>
            Экспорт
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <SectionHeading index="03" title="ФОРМА" />
        <TextField
          label="Бортовой номер"
          hint="Например, RA-89013"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        <SelectField label="Регион" options={REGIONS} defaultValue="eu" />
        <Checkbox
          label="Только частные рейсы"
          checked={onlyPrivate}
          onCheckedChange={setOnlyPrivate}
        />
        <Switch
          label="Уведомления о вылете"
          checked={notify}
          onCheckedChange={setNotify}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SectionHeading index="04" title="ДАННЫЕ" />
        <Meter label="Покрытие приёмниками" value={72} tone="accent" />
        <DataTable
          columns={FLIGHT_COLUMNS}
          rows={FLIGHTS}
          getRowKey={(flight) => flight.id}
        />
      </section>
    </div>
  );
}
