import * as axios from "axios";
import Router from "next/router";
import { deleteJwt, saveJwt, getJwt } from "./utils";
import auth from '../store/auth.js'

const instance = axios.create({
   baseURL: `http://localhost:1337/api/`,
});

export const authAPI = {
   signup(username, email, password) {
      return instance.post(`auth/local/register`, { username, email, password }).then((response) => {
         const jwt = response.data.jwt;
         saveJwt(jwt)
         auth.login()
         return response;
      });
   },
   login(identifier, password) {
      return instance.post(`auth/local`, { identifier, password }).then((response) => {
         const jwt = response.data.jwt;
         saveJwt(jwt)
         auth.login()
         return response;
      });
   },
   logout() {
      deleteJwt()
      auth.logout()
      Router.push("/login");
   }
};

export const picturesAPI = {
   getIMG() {
      const jwt = getJwt()
      console.log('jwt', jwt)
      return instance.get(`my-pictures?populate[0]=Content`, {
         headers: { Authorization: `Bearer ${jwt}` },
      })
   }
}