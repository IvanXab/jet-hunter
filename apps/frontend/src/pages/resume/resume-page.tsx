import { DataTable, TextField, type DataTableColumn } from "@repo/ui";
import { useState } from "react";
import type { Resume } from "@/pages/resume/resume";
import { RESUMES_MOCK } from "@/pages/resume/resume.mock";

const UPDATED_AT_FORMAT = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const COLUMNS: readonly DataTableColumn<Resume>[] = [
  {
    key: "title",
    header: "НАЗВАНИЕ",
    render: (resume) => resume.title,
  },
  {
    key: "updatedAt",
    header: "ОБНОВЛЕНО",
    width: "11rem",
    mono: true,
    render: (resume) => (
      <time dateTime={resume.updatedAt}>
        {UPDATED_AT_FORMAT.format(new Date(resume.updatedAt))}
      </time>
    ),
  },
];

function matchesQuery(resume: Resume, query: string): boolean {
  return resume.title.toLocaleLowerCase("ru-RU").includes(query);
}

export function ResumePage() {
  const resumes = RESUMES_MOCK;
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("ru-RU");
  const foundResumes = resumes.filter((resume) =>
    matchesQuery(resume, normalizedQuery),
  );

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <h1 className="text-title text-ink">Мои резюме</h1>
      {resumes.length === 0 ? (
        <p className="text-body text-ink-muted">Резюме пока нет</p>
      ) : (
        <div className="flex flex-col gap-6">
          <TextField
            type="search"
            label="Поиск"
            placeholder="Название резюме"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          {foundResumes.length === 0 ? (
            <p className="text-body text-ink-muted">Ничего не найдено</p>
          ) : (
            <DataTable
              columns={COLUMNS}
              rows={foundResumes}
              getRowKey={(resume) => resume.id}
              onRowClick={() => undefined}
            />
          )}
        </div>
      )}
    </div>
  );
}
