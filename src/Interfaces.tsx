
export interface UserData {
    user: UserDetails,
    sessionToken: string,
    message: string
}

export interface UserDetails {
    email: string,
    firstName: string,
    lastName: string,
    id: number,
    password: string,
    role: string,
    userName: string
}

export interface ItemDetails {
    id: number,
    itemName: string,
    price: number,
    quantity: number,
    sellerId: number,
    itemImage: string,
    itemDescription: string
}

export interface CartDetails {
    id: number,
    quantity: number,
    itemId: number,
    item: ItemDetails,
    userId: number
}

export interface Category {
    id: number,
    categoryName: string
}