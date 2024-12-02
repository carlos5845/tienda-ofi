import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  
  type Cliente = {
    id: string
    nombre: string
    email: string
    telefono: string
    fechaRegistro: string
  }
  
  type DetallesClienteModalProps = {
    cliente: Cliente | null
    isOpen: boolean
    onClose: () => void
  }
  
  export function DetallesClienteModal({ cliente, isOpen, onClose }: DetallesClienteModalProps) {
    if (!cliente) return null
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Cliente</DialogTitle>
            <DialogDescription>Información detallada del cliente seleccionado.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Nombre:</span>
              <span className="col-span-3">{cliente.nombre}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Email:</span>
              <span className="col-span-3">{cliente.email}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Teléfono:</span>
              <span className="col-span-3">{cliente.telefono}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Fecha de Registro:</span>
              <span className="col-span-3">{cliente.fechaRegistro}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  