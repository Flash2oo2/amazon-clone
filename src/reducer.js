

export const initialState = {
    basket: [],
    address: [],
    loggedinuser: null
}

const reducer = (state, action) => {
    // console.log(action)
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case 'ADD_ADDRESS':
            return {
                ...state,
                address: [...state.address, action.item]
            }
        case 'SET_LOGIN':
            return {
                ...state,
                loggedinuser: action.user
            }
        case 'REMOVE_FROM_CART':
            let newcart = [...state.basket]
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id)
            if (index >= 0) {
                newcart.splice(index, 1)
            }
            else {
                console.log("There were errors while removing product from cart")
            }

            return {
                ...state, basket: newcart
            }
        case 'REMOVE_ADDRESS':
            let newAddresses = [...state.address]
            const idx = state.address.findIndex((address) => address.id === action.id)
            if (idx >= 0) {
                newAddresses.splice(idx, 1)
            }
            else {
                console.log("There were errors while removing Address")
            }

            return {
                ...state, address: newAddresses
            }
    }

}

export default reducer