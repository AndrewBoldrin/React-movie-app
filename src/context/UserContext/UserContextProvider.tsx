import React from 'react';

export type UserContextType = {
    name: string | null,
    setName: (name: string | null) => void,
    isLogged: boolean,
    setIsLogged: (toggle: boolean) => void,
    perfilPhoto: string | null,
    setPerfilPhoto: (url: string | null) => void,
}

export type ChildrenType = {
    children: React.ReactNode,
}

export const UserContext = React.createContext<UserContextType | null>(null);

export const UserContextProvider = (props: ChildrenType) => {

    const [name, setName] = React.useState<string | null>(null);
    const [isLogged, setIsLogged] = React.useState<boolean>(false);
    const [perfilPhoto, setPerfilPhoto] = React.useState<string | null>(null);

    return (
        <UserContext.Provider value={{ name, setName, isLogged, setIsLogged, perfilPhoto, setPerfilPhoto }}>
            { props.children }
        </UserContext.Provider>
    );
}