import React from "react";
import { UserData } from "./types";

export const CurrentContext = React.createContext<{ userData: UserData }>({
    userData: {
        name: '',
        id: '',
        avatar: ''

    }
});