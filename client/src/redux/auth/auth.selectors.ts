import { User } from "../../types/user.types";
import { RootState } from "../store";



export const selectAuth = (state: RootState) => state.auth