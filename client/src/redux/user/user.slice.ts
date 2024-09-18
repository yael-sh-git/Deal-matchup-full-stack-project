import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user.types';

const userSlice = createSlice({
  name: 'user',
  initialState: null as User | null,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      //state = action.payload;
      return action.payload;
    }
  },
});

export const { setUser} = userSlice.actions;

export default userSlice.reducer;