"use client"

import {useEffect} from "react";
import {setScreenSize} from "@/store/slices/screenSlice";
import {useAppDispatch} from "@/store/hooks";

export const useScreenResize = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            dispatch(setScreenSize(window.innerWidth));
        }
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [dispatch]);
}