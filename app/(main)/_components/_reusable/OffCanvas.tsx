// components/Offcanvas.tsx
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function Offcanvas() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Offcanvas</Button>
      </DialogTrigger>
      <DialogContent
        className="fixed right-0 top-0 h-full w-[350px] rounded-none border-l bg-white shadow-lg transition-all data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full"
        onPointerDownOutside={(e) => e.preventDefault()} // agar tidak langsung tertutup saat klik luar
      >
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <DialogHeader className="text-lg font-semibold">Offcanvas End</DialogHeader>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <X />
            </Button>
          </DialogTrigger>
        </div>
        <div className="p-4 text-sm text-muted-foreground">
          Lorem ipsum, or lipsum as it is sometimes known...
        </div>
        <div className="flex flex-col gap-2 p-4">
          <Button className="w-full">Continue</Button>
          <Button variant="secondary" className="w-full">Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
