
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

export interface ItemData {
    id: number,
    itemName: string,
    price: number,
    quantity: number,
    sellerId: number,
    itemImage: string,
    itemDescription: string
}