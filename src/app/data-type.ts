export interface SignUp {
    name: string,
    email: string,
    password: string
}

export interface Login {
    email: string,
    password: string
}

export interface Product {
    productName: string,
    description: string,
    price: number,
    color: string,
    category: string,
    imageurl: string,
    id: string
}