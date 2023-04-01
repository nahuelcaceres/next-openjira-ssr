import { Entry } from '../../interfaces'
import { EntriesState } from './'
/*
   La forma en que cambio el ESTADO
*/

type EntriesActionType = 
   | { type: '[Entry] - Add-Entry', payload: Entry} 
   | { type: '[Entry] - Update-Entry', payload: Entry} 
   | { type: '[Entry] - Refresh-Data', payload: Entry[]} 
   | { type: '[Entry] - Delete-Data', payload: Entry} 


export const entriesReducer = (state:EntriesState, action:EntriesActionType): EntriesState => {

   switch (action.type) {
      case '[Entry] - Add-Entry':
         return {
            ...state, 
            entries: [...state.entries, action.payload]
         }

      case '[Entry] - Update-Entry':
         return {
            ...state,
            entries: state.entries.map( entry => {
               if ( entry._id === action.payload._id){
                  entry.status = action.payload.status
                  entry.description = action.payload.description
               }
               // Hago los cambios necesarios y devuelvo el entry (hara una interacion por cada uno y modifica el correspondiente)
               return entry
            })
         }
      
      case '[Entry] - Refresh-Data':
            return{
               ...state,
               entries: [...action.payload]
            }

      case '[Entry] - Delete-Data':
         return {
               ...state,
               entries: state.entries.filter( (entry)=> entry._id !== action.payload._id) 
            }
            
      default:
         return state
    }
}
