import { FC, useEffect, useReducer } from 'react'
import { EntriesContext, entriesReducer } from '.'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../apis'
import { useSnackbar } from 'notistack'

/*
   La forma de PROVEER la nueva funcionalidad (reducer) a
   mis COMPONENTES HIJOS
*/

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar()

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })

    dispatch({ type: '[Entry] - Add-Entry', payload: data })
  }

  const deleteEntry = async (entry: Entry) => {
    const { data } = await entriesApi.delete<Entry>(`/entries/${entry._id}`)

    dispatch({ type: '[Entry] - Delete-Data', payload: data })

    displaySnackbar('Entrada eliminada')
  }

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })

      dispatch({ type: '[Entry] - Update-Entry', payload: data })

      if (showSnackbar) {
        displaySnackbar('Entrada actualizada')
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] - Refresh-Data', payload: data })
  }

  const displaySnackbar = (title: string) => {
    enqueueSnackbar(title, {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
