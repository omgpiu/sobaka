import axios, { AxiosInstance } from "axios"
import { IGood, IStar, IUserGoods, IWebThree } from './types.ts';

export class ApiClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api/v1/admin",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async getStars(userId: string): Promise<IStar[]> {
    const response = await this.axiosInstance.get("purchase/stars",{
      params: {
        userId
      },
    })
    return response.data
  }
  async getWeb3(userId: string): Promise<IWebThree> {
    const response = await this.axiosInstance.get("purchase/web3",{
      params: {
        userId
      },
    })
    return response.data
  }

  async getAvailableGoods(userId: string): Promise<IGood> {
    const response = await this.axiosInstance.get("purchase/goods",{
      params: {
        userId
      },
    })
    return response.data
  }

  async getUserGoods(userId: string): Promise<IUserGoods> {
    const response = await this.axiosInstance.get("purchase/goods",{
      params: {
        userId
      },
    })
    return response.data
  }

  async returnUserGoods(userId: string): Promise<IUserGoods> {
    const response = await this.axiosInstance.post("purchase/goods",{
      params: {
        userId
      },
    })
    return response.data
  }

  async chargeUserGoods(userId: string): Promise<IUserGoods> {
    const response = await this.axiosInstance.post("purchase/goods",{
      params: {
        userId
      },
    })
    return response.data
  }

  async getUserTasks(userId: string) {
    const response = await this.axiosInstance.get("tasks",{
      params: {
        userId
      },
    })
    return response.data
  }

  async getUserBoosts(userId: string){
    const response = await this.axiosInstance.get("boosts",{
      params: {
        userId
      },
    })
    return response.data
  }

  async updateUserTasks(userId: string) {
    const response = await this.axiosInstance.get("tasks",{
      params: {
        userId
      },
    })
    return response.data
  }

  async updateUserBoosts(userId: string){
    const response = await this.axiosInstance.get("boosts",{
      params: {
        userId
      },
    })
    return response.data
  }

  async banUser(userId: string){
    const response = await this.axiosInstance.post("users/ban",{
      params: {
        userId
      },
    })
    return response.data
  }

  async deleteUser(userId: string){
    const response = await this.axiosInstance.post("users/delete",{
      params: {
        userId
      },
    })
    return response.data
  }
}
