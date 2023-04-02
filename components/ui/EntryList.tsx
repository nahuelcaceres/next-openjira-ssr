import { Paper, List } from '@mui/material'
import { FC, useContext, useMemo, DragEvent } from 'react'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './EntryCard'
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}
export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  // cada vez que las 'entries' cambien se volveran a memorizar
  // las entries filtradas. Esto es para no tener que estar haciendo
  // el filtrado en cada RENDER del componente y solo hacerlo cuando
  // la lista tenga algun cambio, caso contrario...usamos lo memorizado
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  )

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')

    // el simbolo ! le dice a TS "siempre va a tener un valor como resultado del find"
    const entry = entries.find((entry) => entry._id === id)!
    entry.status = status

    updateEntry(entry)

    endDragging()
  }

  return (
    // Todo: implementar DROP
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 180px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
          padding: '3px 5px',
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
