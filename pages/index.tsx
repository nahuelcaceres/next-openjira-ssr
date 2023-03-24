import Typography from '@mui/material/Typography'
import { NextPage } from 'next'
import { Layout } from '../components/layouts'

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1" color="primary">
        Hola mundo
      </Typography>
    </Layout>
  )
}
export default HomePage
