interface LoginData {
  email: string;
  password: string;
}

interface ResponseLogin {
  code: number;
  success: boolean;
  message: string;
  data: string;
}
