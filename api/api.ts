import Router from "next/router";
import { deleteJwt } from "./utils";
import auth from '../store/auth'

export const authAPI = {
   logout() {
      deleteJwt()
      auth.logout()
      Router.push("/login");
   }
};