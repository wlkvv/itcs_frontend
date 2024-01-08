

export default interface Option {
    id: number
    name: string
  }

export interface DropdownMenuList {
    options: Option[],
    selectedOption: number,
    setSelectedOption: (id: number) => void,
    [placeholder: string]: string,
    [width: number]: number
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Service {
    id: number,
    name: string,
    description: string,
    status: number,
    price: number,
    time: number,
    due_date: number,
    image: string
}


export interface Order {
    id?: number; 
    services: Service[];
    status?: string; 
    date_created?: string; 
    date_of_formation?: string;
    date_complete?: string;
    id_moderator: number | null;
    id_user: number;
  }