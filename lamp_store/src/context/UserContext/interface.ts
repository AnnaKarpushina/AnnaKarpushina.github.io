export interface ILoginData {
    email: string;
    password: string;
}

export interface IUser {
    email: string;
    isAdmin: boolean;
    name: string;
    token: string;
    _id: string;
}

export interface IUserContext {
    user: IUser;
    login: (values: ILoginData) => void;
    register: (values: IRegisterData) => void;
    logout: () => void;
    loading: boolean;
}

export interface IRegisterData {
    name: string;
    email: string;
    password: string;
}

export interface ICheckUser {
    user: IUser;
}
