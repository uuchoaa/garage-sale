import { useEffect, useState } from "react";
import { Button } from "@/components/catalyst/button";
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from "@/components/catalyst/dialog";

interface ManusDialogProps {
  title?: string;
  logo?: string;
  open?: boolean;
  onLogin: () => void;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export function ManusDialog({
  title,
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose,
}: ManusDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setInternalOpen(false);
    }
    onClose?.();
  };

  return (
    <Dialog open={onOpenChange ? open : internalOpen} onClose={handleClose} size="sm">
      <DialogBody className="text-center">
        {logo && (
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-xl border border-zinc-950/5 dark:border-white/10 flex items-center justify-center">
              <img src={logo} alt="Dialog graphic" className="w-10 h-10 rounded-md" />
            </div>
          </div>
        )}
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogDescription>Please login with Manus to continue</DialogDescription>
      </DialogBody>
      <DialogActions>
        <Button onClick={onLogin} color="dark" className="w-full">
          Login with Manus
        </Button>
      </DialogActions>
    </Dialog>
  );
}
