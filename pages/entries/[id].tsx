import { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import {
  Button,
  capitalize,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { Layout } from '../../components/layouts'
import { Entry, EntryStatus } from '../../interfaces'
import { dbEntries } from '../../database'
import { EntriesContext } from '../../context/entries'
import { useRouter } from 'next/router'
import { dateFunctions } from '../../utils'

// todo: hacer una collection y recuperarla desde ahi.
const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)
  const router = useRouter()

  // memorizo este calculo y solo cambia segun culquiera de las dependencias cambie (inputValue o touched)
  const isNotValid = useMemo(
    () => inputValue.length <= 0 && touched,
    [inputValue, touched]
  )

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }

    updateEntry(updatedEntry, true)

    router.push('/')
  }

  const onDelete = () => {
    deleteEntry(entry)

    router.push('/')
  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )} minutos`}
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onBlur={() => setTouched(true)}
                onChange={onInputValueChanged}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={status} onChange={onStatusChanged}>
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <Button
              startIcon={<SaveOutlinedIcon />}
              variant="contained"
              fullWidth
              onClick={onSave}
              disabled={inputValue.length <= 0}
            >
              Save
            </Button>
            {/* <CardActionArea>
            </CardActionArea> */}
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
        }}
        onClick={onDelete}
      >
        <DeleteOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  // en caso que el id no corresponda a una entry en DB, ni cargo el componente, directamente lo redirijo al home
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { entry },
  }
}

export default EntryPage
