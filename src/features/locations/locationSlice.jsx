import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    branches: [],
    isLoading: false,
    isError: false,
    error: ''
}

export const fetchBranches = createAsyncThunk('locations/fetchBranches',
    async() =>{

    })

const locationSlice = createSlice({
    name: 'locations',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase()
    }
})