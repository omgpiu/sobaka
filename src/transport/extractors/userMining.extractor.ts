import { IBoost, ITask,  IUserMiningResponse } from '../types.ts';

export interface UserMiningExtracted {
  user:Omit<IUserMiningResponse, 'Tasks' | 'Boost'>
  tasksArray: ITask[],
  boostsArray: IBoost[]
}

export const userMiningExtractor = (userData: IUserMiningResponse): UserMiningExtracted => {
  const {Tasks, Boost, ...user} = userData;

  const tasksArray = Tasks ? Object.entries(Tasks).map(([id, value]) => ({
    id,
    name: id,
    value,
  })) : [];

  const boostsArray = Boost ? Object.entries(Boost).map(([id, value]) => ({
    id,
    name: id,
    value,
  })) : [];

  return {
    user,
    tasksArray,
    boostsArray
  }

}