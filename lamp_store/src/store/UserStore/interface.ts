export interface ILoginData {
    email: string;
    password: string;
}

export interface IUser {
    _id: string;
    email: string;
    isAdmin: boolean;
    name: string;
    token: string;
}

export interface IUserStore {
    user: IUser;
    loading: boolean;
    showCartButtons: boolean;
    checkUser: () => void;
    login: (values: ILoginData, navigate: () => void) => void;
    register: (values: IRegisterData, navigate: () => void) => void;
    logout: () => void;
    handleLogout: () => void;
}

export interface IRegisterData {
    name: string;
    email: string;
    password: string;
}

export interface ICheckUser {
    user: IUser;
}
