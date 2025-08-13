/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
// manejamos el estado global de la aplicación
import { createContext, useReducer } from 'react'

export const Store = createContext()

/**
 * El estado inicial contiene información del usuario, detalles del carrito de compras y
 * direcciones de envío y métodos de pago almacenados en el almacenamiento local del navegador.
 *
 * Lo utilizamos para inicializar el estado de la aplicación cuando se carga por primera vez.
 * Esto permite que la aplicación recuerde la información del usuario y el carrito de compras entre sesiones
 */
const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : []
  }
}

/**
 * La función `reducer` es un reductor que maneja diferentes acciones relacionadas con el carrito de compras,
 * usuario y pedidos en una aplicación React.
 *
 * Maneja acciones como agregar o eliminar artículos del carrito, guardar direcciones de envío y métodos de pago,
 * iniciar sesión del usuario, cerrar sesión y actualizar la información del usuario.
 *
 * La utilizamos para actualizar el estado de la aplicación en función de las acciones despachadas.
 * @param {*} state se encarga de representar el estado actual de la aplicación. Contiene información del usuario,
 * detalles del carrito de compras y direcciones de envío y métodos de pago.
 * @param {*} action se encarga de describir qué acción se debe realizar en el estado. Contiene un tipo y una carga útil.
 * @returns Devuelve el nuevo estado de la aplicación después de aplicar la acción.
 * Si la acción no coincide con ningún caso, devuelve el estado actual sin cambios.
 */
function reducer (state, action) {
  switch (action.type) {
    /**
     * El caso 'CART_ADD_ITEM' maneja la acción de agregar un artículo al carrito de compras.
     * Verifica si el artículo ya existe en el carrito y actualiza la cantidad si es así,
     * o agrega el nuevo artículo si no existe.
     */
    case 'CART_ADD_ITEM':
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
          item._id === existItem._id ? newItem : item
        )
        : [...state.cart.cartItems, newItem]

      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }

      /**
       * El caso 'CART_REMOVE_ITEM' maneja la acción de eliminar un artículo del carrito de compras.
       * Filtra el artículo que se desea eliminar utilizando su ID y actualiza el estado del carrito.
       * También actualiza el almacenamiento local para reflejar los cambios en el carrito.
       */
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      )

      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    /**
     * El caso 'CART_CLEAR' maneja la acción de limpiar el carrito de compras.
     * Elimina todos los artículos del carrito y actualiza el estado del carrito.
     */
    case 'CART_CLEAR':
      localStorage.removeItem('cartItems')
      return { ...state, cart: { ...state.cart, cartItems: [] } }

      /**
       * El caso 'USER_SIGNIN' maneja la acción de iniciar sesión del usuario.
       * Actualiza el estado del usuario con la información proporcionada en la carga útil de la acción.
       * También se puede utilizar para almacenar la información del usuario en el almacenamiento local.
       */
    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }

      /**
       * El caso 'USER_SIGNOUT' maneja la acción de cerrar sesión del usuario.
       * Restablece el estado del usuario, el carrito y la orden a sus valores iniciales.
       * Elimina la información del usuario del almacenamiento local y restablece el carrito a su estado inicial.
       * Esto asegura que el usuario esté completamente desconectado y que no haya información persistente
       */
    case 'USER_SIGNOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: ''
        },
        order: null
      }

      /**
       * El caso 'SAVE_SHIPPING_ADDRESS' maneja la acción de guardar la dirección de envío del usuario.
       * Actualiza el estado del carrito con la dirección de envío proporcionada en la carga útil de la accion.
       */
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload }
      }

      /**
       * El caso 'SAVE_PAYMENT_METHOD' maneja la acción de guardar el método de pago del usuario.
       * Actualiza el estado del carrito con el método de pago proporcionado en la carga útil de la acción.
       * También se puede utilizar para almacenar el método de pago en el almacenamiento local.
       */
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload }
      }

      /**
       * El caso 'USER_UPDATE' maneja la acción de actualizar la información del usuario.
       * Actualiza el estado del usuario con la información proporcionada en la carga útil de la acción.
       * Esto permite que la aplicación refleje los cambios en la información del usuario, como el nombre, correo electrónico, etc.
       * También se puede utilizar para almacenar la información actualizada del usuario en el almacenamiento local.
       */
    case 'USER_UPDATE':
      return { ...state, userInfo: action.payload }

      /**
       * El caso 'CREATE_ORDER' maneja la acción de crear un nuevo pedido.
       * Actualiza el estado con la información del pedido proporcionada en la carga útil de la acción.
       * Esto permite que la aplicación almacene y muestre los detalles del pedido realizado por el usuario.
       * También se puede utilizar para almacenar el pedido en el almacenamiento local o en una base de
       */
    case 'CREATE_ORDER':
      return { ...state, order: action.payload }

    default: return state
  }
}

/**
 * La función `StoreProvider` es un componente que proporciona el contexto de la tienda a toda la aplicación.
 * Utiliza el hook `useReducer` para manejar el estado global de la aplicación y despachar acciones para actualizarlo.
 * @param {*} props se encarga de representar las propiedades del componente StoreProvider.
 * Contiene los hijos del componente que se renderizarán dentro del contexto de la tienda.
 * @returns Devuelve un componente que envuelve a sus hijos con el contexto de la tienda,
 * permitiendo que cualquier componente dentro de la aplicación acceda al estado global y despache acciones
 */
export function StoreProvider (props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
