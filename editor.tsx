import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'flowbite-react';
import axios from 'axios';


interface ImageUploaderProps {
 onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
 const [image, setImage] = useState<File | null>(null);

 const formik = useFormik({
    initialValues: {
      imageUrl: '',
    },
    validationSchema: Yup.object({
      imageUrl: Yup.string().url(),
    }),
    onSubmit: async (values) => {
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post('/api/upload-image', formData);
        onImageUpload(response.data.url);
      } else {
        onImageUpload(values.imageUrl);
      }
    },
 });

 return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="imageUrl"
        name="imageUrl"
        type="text"
        placeholder="URL da imagem"
        value={formik.values.imageUrl}
        onChange={formik.handleChange}
        error={formik.errors.imageUrl}
        touched={formik.touched.imageUrl}
        />
        <Button type="button" onClick={() => document.getElementById('imageFile')?.click()}>
          Escolher arquivo
        </Button>
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => setImage (e.target.files?.[0])}
      />
        <Button type="submit">Enviar</Button>
      </form>
   );
  };
  interface ErrorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
   }
   
   const ErrorInputProps: React.FC<ErrorInputProps> = ({ error, ...props }) => {
    return (
       <input
         {...props}
         onError={(e: React.ChangeEvent<HTMLInputElement>) => {
           if (error) {
             console.error(error);
           }
         }}
       />
    );
   };
  
  export default ImageUploader;
  