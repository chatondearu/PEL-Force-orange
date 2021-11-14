import { PayloadAction, createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { StateRequest } from "./utils"
import { Envie, EnvieWithoutId, envieAdd } from "../services/envies"
import { AppThunk } from "."

const envieAdapter = createEntityAdapter<Envie>({
    selectId: (envie) => envie.id,
})

const envieAddSlice = createSlice({
    name: "addEnvie",
    initialState: envieAdapter.getInitialState({
        readyStatus: "idle",
    } as StateRequest),
    reducers: {
        getRequesting: (state) => {
            state.readyStatus = "request"
        },
        getSuccess: (state, { payload }: PayloadAction<Envie>) => {
            state.readyStatus = "success"
            envieAdapter.addOne(state, payload)
        },
        getFailure: (state, { payload }: PayloadAction<string>) => {
            state.readyStatus = "failure"
            state.error = payload
        },
    },
})

export default envieAddSlice.reducer
export const { getRequesting, getSuccess, getFailure } = envieAddSlice.actions

export const sendAddEnvie =
    (envieWithoutId: EnvieWithoutId): AppThunk =>
    async (dispatch) => {
        dispatch(getRequesting())

        const { error, data } = await envieAdd(envieWithoutId)

        if (error) {
            dispatch(getFailure(error.message))
            toast.error(`Erreur lors de l'ajout d'une envie: ${error.message}`, {
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else {
            dispatch(getSuccess(data as Envie))
            toast.success("Envie ajoutée !", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
