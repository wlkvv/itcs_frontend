
import { AxiosResponse } from "axios";

export default interface Option {
    id: number;
    name: string;
  }
  
  export interface optionData {
    id: number;
    name: string;
    description: string;
    price: number;
    time: number;
    due_date: number;
    image: string; // Предполагается, что image - это строка с URL
    status: number;
  }


export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    time: number;
    due_date: number;
    image: string; // Предполагается, что image - это строка с URL
    status: number;
  }
  
  interface Order {
    id?: number; // ID может быть неопределенным при создании новой заявки (draft)
    services: Service[];
    status?: string; // Предполагается, что status - это строка (в Django это CharField)
    date_created?: string; // Предполагается, что date_created - это строка с датой (в Django это DateTimeField)
    date_of_formation?: string;
    date_complete?: string;
    id_moderator: number | null;
    id_user: number;
  }
  export type cardInfoProps = {
    // children: React.ReactNode; //!!!!!!!!!!!!
    id: number;
    name: string;
    description: string;
    price: number;
    time: number;
    due_date: number;
    image: string; // Предполагается, что image - это строка с URL
    status: number;
    onAddClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };

  export type cartItemProps = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    updateAllow: boolean;
    onDelete: (id: number) => void;
  };



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

export type Response = Promise<AxiosResponse> | any;