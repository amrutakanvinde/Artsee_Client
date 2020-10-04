
export interface UserData {
    user: User,
    sessionToken: string,
    message: string
}

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    id: number,
    password: string,
    role: string,
    userName: string
}