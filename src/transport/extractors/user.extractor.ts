import { IBoost, ITask, IUser, IUserResponse } from '../types.ts';

export const userExtractor = (userData: IUserResponse): {
  user: IUser,
  tasksArray: ITask[],
  boostsArray: IBoost[]
} => {
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
    user: user ?? {},
    tasksArray,
    boostsArray
  }

}