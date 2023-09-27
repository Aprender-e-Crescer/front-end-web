// store.ts

import create from 'zustand';

export interface Element {
  name: string;
  // Adicione outros campos do elemento, se necessário
}

interface HeaderState {
  elements: Element[];
  addElement: (element: Element) => void;
}

const useStore = create<HeaderState>((set) => ({
  elements: [],
  addElement: (element) => set((state) => ({ elements: [...state.elements, element] })),
}));

export default useStore;
