import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
  loading?: boolean;
  "data-ocid"?: string;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive = false,
  loading = false,
  "data-ocid": ocid,
}: ConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        data-ocid={ocid ? `${ocid}.dialog` : "confirm.dialog"}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-ocid={ocid ? `${ocid}.cancel_button` : "confirm.cancel_button"}
            disabled={loading}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            data-ocid={
              ocid ? `${ocid}.confirm_button` : "confirm.confirm_button"
            }
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              destructive &&
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            )}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                Processing…
              </span>
            ) : (
              confirmLabel
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
