// components/ui/modal.tsx

import React from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96 shadow-lg">
        <div className="relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="sr-only">Cerrar</span>&times;
          </button>
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
