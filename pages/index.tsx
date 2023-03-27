import { Grid, Card, CardHeader } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        {/* Listado de Pendientes */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 80px )' }}>
            <CardHeader title="Pendientes" />
            <NewEntry />
            <EntryList status="pending" />
          </Card>
        </Grid>

        {/* Listado de EnProgreso */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 110px)' }}>
            <CardHeader title="En Progreso" />
            <EntryList status="in-progress" />
          </Card>
        </Grid>

        {/* Listado de Completadas */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
            <EntryList status="finished" />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
export default HomePage
