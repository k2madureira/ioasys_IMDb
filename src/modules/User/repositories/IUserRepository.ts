import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  list(data: ICreateUserDTO): Promise<ICreateUserDTO[]>;
  create(data: ICreateUserDTO): Promise<ICreateUserDTO>;
  update(data: ICreateUserDTO): Promise<ICreateUserDTO>;
  delete(id: string): Promise<void>;
}
