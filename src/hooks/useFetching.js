import { useState, useRef} from "react";
import { abortController } from "../API/axios";

export const useFetching = (apiRequestFn) => {
    const abortControllerRef = useRef(abortController);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            return await apiRequestFn();
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, {isLoading, error}, abortControllerRef.current];
}