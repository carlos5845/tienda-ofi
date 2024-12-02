import { useState } from "react";

// Define una interfaz para los parámetros del toast
interface ToastOptions {
  title: string;
  description: string;
  variant: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastOptions[]>([]);

  const toast = ({ title, description, variant }: ToastOptions) => {
    setToasts([...toasts, { title, description, variant }]);
    // Aquí puedes implementar la lógica para mostrar el toast
    console.log(`Toast: ${title} - ${description}`);
  };

  return { toast };
}
