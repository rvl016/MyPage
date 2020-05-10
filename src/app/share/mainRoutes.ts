import { Route } from './route';

export const MAIN_ROUTES : Route[] = [
  {
    route: "/home",
    iconClasses: "fa fa-home fa-lg",
    title: "Home"
  },
  {
    route: "/known-tech",
    iconClasses: "fa fa-list fa-lg",
    title: "Known Tech"
  },
  {
    route: "/projects",
    iconClasses: "fa fa-code fa-lg",
    title: "Projects"
  },
  {
    route: "/utilities",
    iconClasses: "fa fa-gear fa-lg fa-spin-hover",
    title: "Utilities" 
  },   
  {
    route: "/games",
    iconClasses: "fa fa-gamepad fa-lg",
    title: "Inutilities"
  },
  {
    route: "/contact",
    iconClasses: "fa fa-address-card fa-lg",
    title: "Contact"
  }
];