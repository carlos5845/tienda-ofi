// components/ui/AddPlayerButton.tsx
import React from "react";
import { Button } from "@/components/ui/button"; // Ruta personalizada

interface AddPlayerButtonProps {
  onClick: () => void; // Recibe una función como propiedad
}

const AddPlayerButton: React.FC<AddPlayerButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-end">
      <Button
        type="button" // Es importante que no sea tipo "submit"
        variant="default"
        className="bg-blue-500 text-white hover:bg-blue-600"
        onClick={onClick} // Ejecuta la función recibida al hacer clic
      >
        Add Player
      </Button>
    </div>
  );
};

export default AddPlayerButton;
