export interface Address {
    id?: string;
    postalCode: string;
    uf: string;
    country: string;
    city: string;
    province: string;
    neighbourhood: string;
    lat: string;
    lng: string;
    createdAt?: Date;
}
