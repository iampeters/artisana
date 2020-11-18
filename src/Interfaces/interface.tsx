export interface CountryType {
  code: string;
  label: string;
  phone: string;
}

export interface Routes {
  name: string;
  icon: string;
  color: any;
  path?: any;
  button?: any;
  className?: any;
}

export interface Artisans {
  firstname?: string;
  name?: string | any;
  lastname?: string;
  rating?: number | any;
  phoneNumber?: string;
  email?: string;
  specialization?: string;
  imageUrl?: string;
  address?: string;
  state?: string;
  country?: string;
  reviews?: any;
  onClick?: any;
  _id?: string;
  businessName?: string;
  RCNumber?: string;
  NIN?: string;
  categoryId?: any;
  experience?: number | any;
}

export interface Reviews {
  title?: string;
  description?: string;
  rating?: any;
  reviews?: any;
  artisanId?: string;
  reviewId?: string;
  userId?: any;
  _id?: any;
  onClick?: any;
}

export interface Reducers {
  file: any;
  auth: any;
  theme: string;
  loading: boolean;
  menu: string;
  navBar: boolean;
  user: User;
  dashboard: Dashboard;
  tokens: Tokens;
  login: any;
  alert: AlertProps;
  artisan: ResponseDetails;
  requests: ResponseDetails;
  category: ResponseDetails;
  reviews: ResponseDetails
  jobs: ResponseDetails;
  chats: ResponseDetails;
  activeChats: ResponseDetails;
  messageDots: any;
}

export interface Dashboard {
  allJobs?: number;
  artisans?: number;
  reviews?: number
  ongoing?: number;
  completed?: number;
  newRequest?: number;
  declinedRequest?: number;
}

interface AlertProps {
  message: string;
  successful?: boolean;
  type?: "danger" | "success";
}

export interface ThemeReducer {
  dark?: boolean;
  light?: boolean;
}

export interface Tokens {
  auth_token: string;
  refresh_token: string
}

export interface User {
  firstname?: string;
  lastname?: string;
  lastLogin?: string;
  createdOn?: string;
  _id?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  imageUrl?: string;
  state?: string;
  country?: string;
}

export interface Pagination {
  page?: any | number;
  pageSize?: any | number;
  whereCondition?: any;
  total?: any | number;
  onChange?: any;
  onPageSizeChange?: any;
}

export interface ResponseDetails {
  hasErrors?: boolean;
  hasResults?: boolean;
  successful?: boolean;
  result?: any,
  items?: Array<any>;
  total?: any | number;
}

export interface Search {
  onChange: any;
  value: string;
  placeholder?: string;
}

export interface Ratings {
  rating: any;
}

export interface CustomThemeInterface {
  dark?: boolean;
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    card?: string;
    text?: string;
    gray?: string;
    navy?: string;
    border?: string;
    light?: string;
    danger?: string;
    info?: string;
    active?: string;
    purple?: string;
    success?: string;
    white?: string;
    warn?: string;
    dark?: string;
    black?: string;
    surface?: string;
    onPrimary?: string;
    borderColor?: string;
    onSecondary?: string;
    onSurface?: string;
    onBackground?: string;
    appBar?: string;
    transparent?: string,
    transparentInput?: string;
  };
  fontSizes?: {
    body: number;
    heading: number;
    title: number;
    small: number;
    cardTitle: number;
    iconSize: number;
  };
  fonts?: {
    Roboto?: string;
    RobotoMedium?: string;
    ProductSansRegular?: string;
    ProductSansBold?: string;
    ProductSansLight?: string;
    ProductSansMedium?: string;
    RubikRegular?: string;
    RubikMedium?: string;
    RubikLight?: string;
    RubikItalic?: string;
    RubikBold?: string;
    LemonadaRegular?: string;
    LemonadaMedium?: string;
    LemonadaLight?: string;
    LemonadaSemiBold?: string;
    FuturaRegular?: string;
    FuturaMedium?: string;
    FuturaLight?: string;
    FuturaItalic?: string;
    FuturaBold?: string;
  };
}

export interface PaginationConfig {
  page?: number;
  pageSize?: number;
  whereCondition?: any;
  token?: string;
}
export interface Category {
  name: string;
  imageUrl: string;
  _id: string;
}

export interface StateProps {
  name: string;
  capital: string;
  _id: any;
}

export interface CountryProps {
  code: string;
  label: string;
  phone: string;
}




