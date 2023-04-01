import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data = 
    | {message: string}
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  const {id} = req.query

  if ( !mongoose.isValidObjectId(id) ) {
    res.status(400).json({message: 'El id no es válido ' + id})
  }

  switch (req.method) {
    case 'PUT':
        return updateEntry(req, res) 
 
    case 'GET':
        return getEntry(req, res)

    case 'DELETE':
        return deleteEntry(req, res)

    default:
        res.status(400).json({message: 'Método no existe ' + req.method})
  }
  
}

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse) => {
  const {id} = req.query

  await db.connect()
 
  try {
    const result = await Entry.findByIdAndRemove(id)

    await db.disconnect()

    res.status(200).json(result)
  
  } catch (error) {

      await db.disconnect()

      console.log({error})

      res.status(400).json({message: error })
  }

}

const updateEntry = async(req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query

    await db.connect()

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate){
        await db.disconnect()
        return res.status(404).json({message: 'No hay entrada con ese ID: ' + id})
    }

    // si tengo description y/o status en el request.body utilizo eso, caso contratio tomo lo que tengo en entryToUpdate
    const { description = entryToUpdate, status = entryToUpdate.status} = req.body

    try {
      
      // runValidators para que valide y new (true) para que nos retorne el nuevo estado del objeto en DB post update
      const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, { runValidators: true, new: true})
      await db.disconnect()

      res.status(200).json(updatedEntry!)
      
    } catch (error: any) {
      await db.disconnect()
      console.log({error})

      res.status(400).json({message: error.errors.status.message })
    }
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse) => {
  const {id} = req.query

  await db.connect()
  const entryDB = await Entry.findById(id)

  await db.disconnect()
  
  if (!entryDB){
    return res.status(404).json({message: 'No hay entrada con ese ID: ' + id})
  }
  
  res.status(200).json(entryDB!)
}
