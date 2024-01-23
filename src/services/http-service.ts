import apiClient, {CanceledError} from "./api-client";



export interface User {
    id: number;
    name: string;
  }

class HttpService{

    getAll<T>(){
        const controller = new AbortController();
       return  apiClient
        .get<T[]>("/users", {
          signal: controller.signal,
        })
    }

    deluser(user:User){

        return apiClient.delete("/users/" + user.id)
    }

    addUser(user:User){

        return apiClient
        .post("/users", user)
    }

    updateuser(user:User){
        return apiClient.patch("/users/" + user.id, user)
    }
}

export default new HttpService;
export {CanceledError};