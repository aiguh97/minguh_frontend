import React, { useState } from "react";

interface CustomDrawerProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  description?: string;
}

export function CustomDrawer({
  children,
  trigger,
  title,
  description,
}: CustomDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Trigger Button untuk membuka drawer */}
      <div onClick={handleOpen}>{trigger}</div>

      {/* Overlay - akan muncul saat drawer terbuka */}
      {isOpen && (
        <div
          className="fixed inset-0  transition-opacity duration-300"
          style={{
            opacity: isOpen ? 1 : 0,
            backgroundColor: "rgba(71, 71, 71, 0.5)",
            zIndex: 10000,
          }}
        />
      )}

      {/* Drawer Panel - akan muncul saat drawer terbuka */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[60vw] min-w-[220px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ zIndex: 10000000,borderLeftColor:'grey',borderLeftWidth:1 }}
        
      >
        {/* Tombol 'x' custom yang posisinya berpotongan */}


<div
style={{
    // 1. Tentukan border dengan warna transparan
    border: '4px solid transparent',

    // // 2. Gunakan linear-gradient sebagai border-image
    // borderImage: 'linear-gradient(to right, black 50%, white 50%)',

    // 3. Atur cara border-image dipotong dan diterapkan
    // borderImageSlice: 1,
    
    // Properti ini adalah kunci perbaikan
    // backgroundClip: 'padding-box',

    // Tambahkan properti untuk membuat elemen menjadi lingkaran
    // width: '60px',
    // height: '60px',
    borderRadius: 12,
    
    // Properti lain yang mungkin Anda butuhkan
    backgroundColor: 'white', // Tambahkan background color agar isi terlihat
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
      zIndex: 70,
      position:'absolute',
      left: isOpen ? -25 : 0,top:21

  }}
>
 <button
      onClick={handleClose}
      className="rounded-full flex items-center justify-center p-0 bg-primary"
      style={{
        width: "32px",
        height: "32px",
      
        color: 'white',
        borderRadius: 12,
      }}
    >
      x
    </button>
</div>
        {/* Konten Drawer */}
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">{title}</h2>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
          <div className="flex-1 p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
