import { FC, useReducer } from 'react'
import { EntriesContext, entriesReducer } from '.'
import { Entry } from '../../interfaces'
import { v4 as uuidv4 } from 'uuid'

/*
   La forma de PROVEER la nueva funcionalidad (reducer) a
   mis COMPONENTES HIJOS
*/

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pendiente: Hola viejo hola viejo hola viejo hola viejo',
      status: 'pending',
      createdAt: Date.now(),
    },

    {
      _id: uuidv4(),
      description:
        'En-Progreso: Chau viejo Hola viejo hola viejo hola viejo hola viejo',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },

    {
      _id: uuidv4(),
      description:
        'Terminadas: Bye bye Hola viejo hola viejo hola viejo hola viejo',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description: description,
      createdAt: Date.now(),
      status: 'pending',
    }

    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entry] - Update-Entry', payload: entry })
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
