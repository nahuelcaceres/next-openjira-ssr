import { UIState } from "./UIProvider"
/*
    es una funcion pura que deberia resolver todo para lo
    que fue creada especificamente. Siempre retornara un NUEVO state
    (No puede modificar el state que llega como param)

    el reducer no puede ser asincrono
    recomendacion: poner el tipo de valor de retorno

    action: le va a decir al reducer que modificaciones debe hacer
    sobre el state. Por lo general es un objeto que tiene un type

    si ningun type afectara al state, devolvemos el mismo (sin copia)
    asi react sabe que no se hizo nada y no actualiza el VDOM
*/

type UIActionType = 
    | { type: 'UI - Open Sidebar'} 
    | { type: 'UI - Close Sidebar'}
    | { type: 'UI - Set isAddingEntry', payload: boolean}
    | { type: 'UI - Start Dragging'}
    | { type: 'UI - End Dragging'}

export const UIReducer = (state:UIState, action:UIActionType): UIState => {
    
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {...state, sidemenuOpen: true,}
        
        case 'UI - Close Sidebar':
            return {...state, sidemenuOpen: false}

        case 'UI - Set isAddingEntry':
            return {...state, isAddingEntry: action.payload}

        case 'UI - Start Dragging':
            return {...state, isDragging: true}

        case 'UI - End Dragging':
            return {...state, isDragging: false}

        default:
            return state
    }
}