import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';

import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default class UserController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateUserDTO>> {
    try {
      const { name, email, nickname, password, admin = false } = request.body;

      const findAdmin = await User.findOne({
        where: {
          id: request.user.id,
          admin: true,
        },
      });

      if (!findAdmin && admin === true) {
        return response.status(401).json({
          error:
            'You must be an administrator to register a user at the same level.',
        });
      }

      if (!name || !email || !password) {
        return response.status(401).json({
          error: 'Please fill in the name, email and password fields.',
        });
      }

      const findEmail = await User.findOne({
        where: { email },
      });

      if (findEmail) {
        return response
          .status(401)
          .json({ error: 'This email has already been registered' });
      }

      const newUser = await User.create({
        name,
        email,
        nickname,
        password,
        admin,
        disabled: 0,
      });

      const responseUser = {
        message: 'User successfully registered',
        infos: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          nickname: newUser.nickname,
        },
      };

      return response.json(responseUser);
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateUserDTO> | Response> {
    try {
      const { name, email, nickname, password, admin = false } = request.body;
      const { id } = request.params;

      const findAdmin = await User.findOne({
        where: {
          id: request.user.id,
          admin: true,
        },
      });

      if (!findAdmin && admin === true) {
        return response.status(401).json({
          error:
            'You must be an administrator to update a user at the same level.',
        });
      }

      const user = await User.findOne({
        where: { id },
      });

      if (!user) {
        return response.status(401).json({ error: 'User ID not found!' });
      }

      let newHash = '';
      let compareHash = false;
      if (password) {
        newHash = await hash(password, 8);
        compareHash = await compare(password, user.passwordHash);
      }

      const passwordUpdated = !compareHash ? user.passwordHash : newHash;

      const updatedUser = {
        name: name || user.name,
        email: email || user.email,
        nickname: nickname || user.nickname,
        passwordHash: passwordUpdated,
        admin: admin || user.admin,
      };

      await User.update(updatedUser, { where: { id } });

      return response.status(200).json({
        User: {
          id,
          name: updatedUser.name,
          email: updatedUser.email,
          nickname: updatedUser.nickname,
          admin: updatedUser.admin,
        },
      });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const findAdmin = await User.findOne({
        where: {
          id: request.user.id,
          admin: true,
        },
      });

      if (!findAdmin) {
        return response.status(401).json({
          error: 'You must be an administrator to delete a user .',
        });
      }

      const user = await User.findOne({
        where: { id },
      });

      if (!user) {
        return response.status(401).json({ error: 'User ID not found!' });
      }

      await User.update({ disabled: true }, { where: { id } });

      return response.status(200).json({ success: 'deleted' });
    } catch (error) {
      return response.status(500).json({ error: 'Error' });
    }
  }
}