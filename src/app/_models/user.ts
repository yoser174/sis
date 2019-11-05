export interface LoginResponse {
    access_token: string;
    data: any;
    name: string;
    lang: string;
    status: string;
    message: string;
}


export interface userData {
    id_user: string,
    id_card: string,
    username: string,
    full_name: string,
    password: string,
    role: string,
    hospital: string,
    created_by: string;
    last_login: string;
  }