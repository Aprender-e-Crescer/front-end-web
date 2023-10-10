import create from 'zustand';

interface TextInputsStore {
  textInputs: string[];
  addTextInput: () => void;
  removeTextInput: (index: number) => void;
  updateTextInputs: (textInputs: string[]) => void;
}

export const useTextInputsStore = create<TextInputsStore>(set => ({
  textInputs: [''],
  addTextInput: () => {
    set(state => ({ textInputs: [...state.textInputs, ''] }));
  },
  removeTextInput: index => {
    set(state => ({ textInputs: state.textInputs.filter((_, i) => i !== index) }));
  },
  updateTextInputs: textInputs => {
    set({ textInputs });
  },
}));
