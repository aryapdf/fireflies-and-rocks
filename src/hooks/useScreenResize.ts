"use client"

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setScreenSize} from "@/store/screenSlice";

export const useScreenResize = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            dispatch(setScreenSize(window.innerWidth));
        }
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [dispatch]);
}