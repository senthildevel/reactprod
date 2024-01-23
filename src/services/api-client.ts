import axios, { CanceledError } from "axios";

export interface User {
    id: number;
    name: string;
  }
// Axios configuration 
export default axios.create({
baseURL: "https://jsonplaceholder.typicode.com",

})

export {CanceledError}