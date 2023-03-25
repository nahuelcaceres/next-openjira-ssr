import { UIState } from "./"
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

export const uiReducer = (state:UIState, action:UIActionType): UIState => {
    
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {...state, sidemenuOpen: true,}
        
        case 'UI - Close Sidebar':
            return {...state, sidemenuOpen: false}

        default:
            return state
    }
    return state
}