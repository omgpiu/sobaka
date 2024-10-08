import axios, { AxiosInstance } from "axios"
import {
  IAvailableGoodsResponse,
  IGood,
  ITransaction, ITransactionResponse,
  IUserGoodsResponse,
  IUserResponse,
  IWebThree
} from '../types.ts';
import { availableGoodsExtractor, starTransactionExtractor, userExtractor } from '../extractors';



export class ApiClient {
  private axiosInstance: AxiosInstance;
  readonly token:string
  constructor(token: string) {
    this.token = import.meta.env.VITE_API_TOKEN ?? token

    this.axiosInstance = axios.create({
      baseURL: "https://dev.notpx.app/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `InitData ${this.token}`;
      return config;
    });
  }

  async getUser(userId: string): Promise<ReturnType<typeof userExtractor>> {
    const response = await this.axiosInstance.get<IUserResponse>(`admin/user/${userId}`);
    return userExtractor(response.data);
  }
  async getUserMining(userId: string): Promise<ReturnType<typeof userExtractor>> {
    const response = await this.axiosInstance.get<IUserResponse>(`admin/user/mining/${userId}` );
    return userExtractor(response.data);
  }
  async getStars(userId: string): Promise<ITransaction[]> {
    const response = await this.axiosInstance.get<ITransactionResponse>(`admin/purchase/stars/${userId}`, );
    return starTransactionExtractor(response.data.payments)
  }

  async refundUserStar(starId: number) {
    const response = await this.axiosInstance.put(`admin/purchase/refund/${starId}`)
    console.log(response.data);
    return {
      response:response.data,
      starId
    };
  }

  async getWeb3(userId: string): Promise<IWebThree> {
    const response = await this.axiosInstance.get("admin/purchase/web3", {
      params: { userId },
    });
    return response.data;
  }

  async getUserGoods(userId: string): Promise<IGood> {
    const response = await this.axiosInstance.get("admin/purchase/goods", {
      params: { userId },
    });
    return response.data;
  }

  async getAvailableGoods(): Promise<ReturnType<typeof availableGoodsExtractor>> {
    const response = await this.axiosInstance.get<IAvailableGoodsResponse>("buy/list");
    return availableGoodsExtractor(response.data)
  }

  async returnUserGoods(userId: string): Promise<IUserGoodsResponse> {
    const response = await this.axiosInstance.post("admin/purchase/goods/return", {
      userId,
    });
    return response.data;
  }

  async chargeUserGoods(userId: number): Promise<IUserGoodsResponse> {
    const response = await this.axiosInstance.post("admin/purchase/goods/charge", {
      userId,
    });
    return response.data;
  }


  async updateUserBoosts(userId: number, boostsId: number, amount: number){
    const response = await this.axiosInstance.post("admin/boosts/update", {
      userId,
      boostsId,
      amount
    });
    return response.data;
  }

  async banUser(userId: number) {
    const response = await this.axiosInstance.put(`admin/ban/${userId}`);
    return response.data;
  }

  async deleteUser(userId: number){
    const response = await this.axiosInstance.delete(`admin/delete/${userId}`);
    return response.data;
  }
}
