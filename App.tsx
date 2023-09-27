import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { create } from 'zustand';

const useStore = create((set) => ({
  divSizes: {
    main: 'full',
    side: '1/2',
  },
}));

const validationSchema = Yup.object().shape({
});

const App = () => {
  const { divSizes } = useStore();

  const widthOfMainDiv = `calc(2 * ${divSizes.side})`;

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
    },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '25%', maxWidth: 'screen-lg' }}>

        <div style={{ width: widthOfMainDiv, backgroundColor: 'blue', padding: '16px', marginBottom: '16px' }}>
          <h1>Div Maior</h1>
          <p>Texto dentro da div maior...</p>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ width: divSizes.side, backgroundColor: 'green', padding: '16px', marginRight: '8px' }}>
            <h2>Div Menor 1</h2>
            <p>Texto dentro da div menor 1...</p>
          </div>

          <div style={{ width: divSizes.side, backgroundColor: 'red', padding: '16px', marginLeft: '8px' }}>
            <h2>Div Menor 2</h2>
            <p>Texto dentro da div menor 2...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
