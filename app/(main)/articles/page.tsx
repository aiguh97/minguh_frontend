"use client";

import React, { useState } from "react";
import { SerializedEditorState } from "lexical";
import DynamicCard from "../_components/_reusable/DynamicCard";
// import { CustomTextEditor } from "../_components/_reusable/CustomTextEditor";
import { Input } from "@/components/ui/input";
import { LabeledInput } from "../_components/_reusable/LabeledInput";
import { UploadImagePreview } from "../_components/_reusable/UploadImagePreview";
import { ButtonIcon } from "../_components/_reusable/ButtonIcon";
import { File } from "lucide-react";
import { Offcanvas } from "../_components/_reusable/OffCanvas";
import { CustomDrawer } from "../_components/_reusable/CustomDrawer";
import { Button } from "@/components/ui/button";
import SectionArticle from "./components/SectionCard";
import { WebinarCard } from "../_components/_reusable/WebinarCard";
import { WebinarPaginationView } from "./components/WebinarPaginationView";
import CustomTextEditor from "../_components/_reusable/CustomTextEditor";
import ImageUploadModal from "../_components/_reusable/EditorPlugins/ImageUploadmodel";
// import { CustomTextEditor } from "../_components/_reusable/CustomTextEditor";
// import CustomTextEditor from "../_components/_reusable/CustomTextEditor";
// import { CustomTextEditor } from "../_components/_reusable/CustomTextEditor";
// import CustomTextEditor from "../_components/_reusable/CustomTextEditor";

const Page = () => {
  // 1. Definisikan state untuk menyimpan konten editor
  const [articleContent, setArticleContent] = useState<SerializedEditorState>();
  const [name, setName] = useState<string>("");
  const [showImageModal, setShowImageModal] = useState(false);
  // 2. Buat fungsi handler untuk menerima nilai dari CustomTextEditor
  const handleEditorContentChange = (value: SerializedEditorState) => {
    // Di sini, Anda bisa melakukan sesuatu dengan nilai yang diterima
    // Misalnya, menyimpannya di state atau mengirimkannya ke API
    setArticleContent(value);
    console.log("Konten editor telah diperbarui:", value);
  };

  const handleUpload = (file: File) => {
    console.log("Selected file:", file);
    // Upload ke server, Cloudinary, dst...
  };

  const handleInsertImage = (src: string) => {
    // Kirim event ke editor
    window.dispatchEvent(new CustomEvent("insert-image", { detail: { src } }));
    setShowImageModal(false);
  };

  return (
    <div className="flex max-w-3xl flex-col gap-2 mx-auto w-full md:max-w-5xl px-6 py-8">
      {/* <Offcanvas/> */}
       {/* Menggunakan CustomDrawer */}
{/* <SectionArticle/> */}
   
      {/* <CustomDrawer */}
        {/* Elemen trigger (tombol) ditaruh di sini
         trigger={<Button>Buka Detail Informasi</Button>}
        title="Detail Halaman"
        description="Informasi tambahan untuk halaman ini."
      > */}
        {/* Konten utama drawer ditaruh di sini sebagai children */}
     {/*  */}
      {/* </CustomDrawer> */}

   <DynamicCard
        title="Kartu Pertama"
        description="Ini adalah deskripsi untuk kartu pertama."
        className="max-w-3xl"
      >
        <div className="flex justify-between">
          <UploadImagePreview />
          <div className="flex flex-col gap-4">
            <ButtonIcon
              title="Template 1"
              icon={File}
              onPress={() => console.log("clicked")}
            />
            <ButtonIcon
              title="Template 2"
              icon={File}
              onPress={() => console.log("clicked")}
            />
            <ButtonIcon
              title="Generate 100 data"
              icon={File}
              onPress={() => console.log("clicked")}
            />
          </div>
        </div>
        <LabeledInput
          id="name"
          label="Judul Artikel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan Judul Artikel"
        />
        {/* <CustomTextEditor
           id="name"
           label="Konten Artikel"
           onValueChange={handleEditorContentChange}
           className="max-w-3xl"
        /> */}
         <CustomTextEditor onOpenImageModal={() => setShowImageModal(true)} />
      
      </DynamicCard>
<WebinarPaginationView/> 
           <ImageUploadModal
  open={showImageModal}
  onClose={() => setShowImageModal(false)}
  onInsert={handleInsertImage}
/>
    </div>
  );
};

export default Page;
