"use client"
import { selectAuthState } from "../store/slices/auth";
import { useAppSelector } from ".";
export const useGetUser = () => {
    const {
        login: { isLoggedIn },
        userInfo,
    } = useAppSelector(selectAuthState);
    return { isLoggedIn, userInfo };
};

