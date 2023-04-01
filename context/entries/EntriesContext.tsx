import { createContext } from 'react'
import { Entry } from '../../interfaces'

/*
   La forma de DEFINIR la nueva funcionalidad en el CONTEXTO 
   para que los COMPONENTES HIJOS la puedan tomar mediante Typscript
*/

interface ContextProps {
  entries: Entry[]

  // Methods
  addNewEntry: (description: string) => void
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void
  deleteEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({} as ContextProps)
