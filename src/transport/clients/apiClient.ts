import axios, { AxiosInstance } from "axios"
import {
  IAvailableGoodsResponse, IParamsAddGoods,
  ITransaction,
  ITransactionResponse,
  IUserResponse,
} from '../types';
import { availableGoodsExtractor, starTransactionExtractor, userExtractor } from '../extractors';



export class ApiClient {
  private axiosInstance: AxiosInstance;
  readonly token:string
  constructor(token: string) {
    this.token = token
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

  //user
  async banUser(userId: number) {
    const response = await this.axiosInstance.put(`admin/ban/${userId}`);
    return response.data;
  }

  async deleteUser(userId: number){
    const response = await this.axiosInstance.delete(`admin/delete/${userId}`);
    return response.data;
  }

  async getUser(userId: string): Promise<ReturnType<typeof userExtractor>> {
    const response = await this.axiosInstance.get<IUserResponse>(`admin/user/${userId}`);
    return userExtractor(response.data);
  }
  async getUserMining(userId: string): Promise<ReturnType<typeof userExtractor>> {
    const response = await this.axiosInstance.get<IUserResponse>(`admin/user/mining/${userId}` );
    return userExtractor(response.data);
  }



  //stars
  async getStars(userId: string): Promise<ITransaction[]> {
    const response = await this.axiosInstance.get<ITransactionResponse>(`admin/purchase/stars/${userId}`, );
    return starTransactionExtractor(response.data.payments)
  }

  async refundUserStar(starId: number) {
    const response = await this.axiosInstance.put(`admin/purchase/refund/${starId}`)
    return {
      response:response.data,
      starId
    };
  }

  //goods

  async getAvailableGoods(): Promise<ReturnType<typeof availableGoodsExtractor>> {
    const response = await this.axiosInstance.get<IAvailableGoodsResponse>("buy/list");
    return availableGoodsExtractor(response.data)
  }

  async addGoods(params:IParamsAddGoods) {
    const response = await this.axiosInstance.post("admin/goods/add",params);
    return response.data
  }

}
