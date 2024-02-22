// // registrationSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Example thunk action for sending registration data to the server
// export const registerUser = createAsyncThunk(
//   'registration/registerUser',
//   async (registrationData, { rejectWithValue }) => {
//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(registrationData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to register');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   shopName: '',
//   Telnum: '',
//   password: '',
//   confirmPassword: '',

// };

// const registrationSlice = createSlice({
//   name: 'registration',
//   initialState,
//   reducers: {
//     setField: (state, action) => {
//       const { field, value } = action.payload;
//       state[field] = value;
//     },
//     clearForm: state => initialState
//   },

//   });


// export const { setField, clearForm } = registrationSlice.actions;
// export default registrationSlice.reducer;
export {}