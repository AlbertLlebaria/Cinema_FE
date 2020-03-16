export const APP_ACTION_TYPES = {
    SET_LOADER: 'SET_LOADER',
    SET_MODAL_STATE: 'SET_MODAL_STATE',
}


export const setModalState = (state) => ({
    type: APP_ACTION_TYPES.SET_MODAL_STATE,
    state
})

export const setLoaderState = (loading) => ({
    type: APP_ACTION_TYPES.SET_LOADER,
    loading
})
