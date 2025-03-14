'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { FormControl } from "./form-control";

interface ControlledFileInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  accept?: string;
  label?: string;
}

export function ControlledFileInput<T extends FieldValues>({
  name,
  control,
  rules,
  accept,
  label
}: ControlledFileInputProps<T>) {
  const t = useTranslations('components.fileInput');
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (file: File | undefined) => {
    if (!file) {
      setPreview(null);
      return;
    }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, ...field }, fieldState: { error } }) => (
          <FormControl label={label} error={error}>
            <Input
              {...field}
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
                handleFileChange(file);
              }}
              accept={accept}
              value={undefined}
            />
          </FormControl>
        )}
      />
      
      {preview && (
        <>
          {preview.startsWith('data:image') ? (
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <object
              data={preview}
              type="application/pdf"
              className="w-full h-[500px] rounded-lg"
            >
              <div>
                <p>{t('pdfUnsupported')}</p>
                <a 
                  href={preview}
                  className="text-blue-600 hover:text-blue-800 underline"
                  download
                >
                  {t('downloadPDF')}
                </a>
              </div>
            </object>
          )}
        </>
      )}
    </>
  );
}