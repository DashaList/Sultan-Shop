export interface IProduct {
    imgUrl: string;
    name: string;
    sizeType: 'Volume' | 'Weight';
    size: number;
    manufacturer: string;
    barcode: number;
    brand: string;
    description: string;
    price: number;
    careTypes: string[];
}

export interface IBasketProduct {
    product: IProduct;
    count: number
}

export interface IAdminProduct {
    name: string;
    sizeType: 'Volume' | 'Weight';
    size: number;
    manufacturer: string;
    barcode: number;
    brand: string;
    description: string;
    price: number;
    careTypes: string[];
    file: FileList
}

export interface ProductResponse {
    count: number;
    results: IProduct[];
}

export interface IFilter {
    price: {from: number,
            to: number}
    manufacturer: string[]
    careType: string
}