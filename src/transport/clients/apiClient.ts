import axios, { AxiosInstance } from "axios"
import {
  IAvailableGoodsResponse, IPaginationParams,
  IParamsAddGoods, ISingleTemplateResponse, ITemplateListResponse,
  ITransaction,
  ITransactionResponse,
  IUserMiningResponse, IUserOverviewResponse, IWebThree, IWebThreeResponse, UserExtracted,
} from '../types';
import {
  availableGoodsExtractor,
  starTransactionExtractor,
  UserMiningExtracted,
  userMiningExtractor,
  userOverviewExtractor, web3TransactionsExtractor
} from '../extractors';


export class ApiClient {
  private axiosInstance: AxiosInstance;
  readonly token: string

  constructor(token: string) {
    this.token = token
    this.axiosInstance = axios.create({
      baseURL: "https://notpx.app/api/v1",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `InitData ${ this.token }`;
      return config;
    });
  }

  //user
  async banUser(userId: number) {
    const response = await this.axiosInstance.delete(`admin/ban/${ userId }`);
    return response.data;
  }

  async deleteUser(userId: number) {
    const response = await this.axiosInstance.delete(`admin/delete/${ userId }`);
    return response.data;
  }

  async getUser(userId: string): Promise<UserExtracted> {
    const response = await this.axiosInstance.get<IUserOverviewResponse>(`admin/user/${ userId }`);
    return userOverviewExtractor(response.data);
  }

  async getUserMining(userId: string): Promise<UserMiningExtracted> {
    const response = await this.axiosInstance.get<IUserMiningResponse>(`admin/user/mining/${ userId }`);
    return userMiningExtractor(response.data);
  }


  //stars
  async getStars(userId: string): Promise<ITransaction[]> {
    const response = await this.axiosInstance.get<ITransactionResponse>(`admin/purchase/stars/${ userId }`,);
    return starTransactionExtractor(response.data.payments)
  }

  async refundUserStar(starId: number) {
    const response = await this.axiosInstance.put(`admin/purchase/refund/${ starId }`)
    return {
      response: response.data,
      starId
    };
  }

  //goods

  async getAvailableGoods(): Promise<ReturnType<typeof availableGoodsExtractor>> {
    const response = await this.axiosInstance.get<IAvailableGoodsResponse>("buy/list");
    return availableGoodsExtractor(response.data)
  }

  async addGoods(params: IParamsAddGoods) {
    const response = await this.axiosInstance.post("admin/goods/add", params);
    return response.data
  }

  //web3

  async getWebThreeTransactions(userId: string): Promise<IWebThree[]> {
    const response = await this.axiosInstance.get<IWebThreeResponse>(`admin/purchase/web3/${ userId }`,);
    return web3TransactionsExtractor(response.data)
  }

  //templates

  async getTemplateList(params:IPaginationParams):Promise<ITemplateListResponse> {
    const response = await this.axiosInstance.get<ITemplateListResponse>("image/template/list",{
      params: params
    });
    return response.data
  }

  async getTemplate(templateId: string):Promise<ISingleTemplateResponse>{
    const response = await this.axiosInstance.get<ISingleTemplateResponse>(`image/template/${ templateId }`,);
    return response.data
  }

  async deleteTemplate(templateId: number){
    const response = await this.axiosInstance.delete(`admin/delete/template/${ templateId }`,);
    return response.data
  }

}
