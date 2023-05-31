declare class Item {
    productId: string;
    quantity: number;
}
declare class Address {
    country: string;
    city: string;
    address: string;
}
export declare class CreateOrderDto {
    items: Item[];
    address: Address;
    total?: Number;
}
export {};
