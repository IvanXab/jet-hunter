import { Button } from "../button/button.js";

export interface ConfirmPanelProps {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmPanel({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmPanelProps) {
  return (
    <div className="flex flex-col gap-2 border border-line p-4">
      <div className="text-control font-medium text-ink">{title}</div>
      <div className="text-small text-ink-muted">{description}</div>
      <div className="mt-1 flex gap-3">
        <Button size="small" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button size="small" variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </div>
  );
}
