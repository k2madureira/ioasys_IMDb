import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { compare } from 'bcryptjs';

import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default class SessionsController {
  public async Authenticate(
    request: Request,
    response: Response,
  ): Promise<Response<ICreateUserDTO>> {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return response.status(401).json({ error: 'Email not registered.' });
    }

    const userData = user.dataValues;

    const passwordMatched = await compare(password, userData.passwordHash);

    if (!passwordMatched) {
      return response.status(401).json({ error: 'Incorrect password.' });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userData.id.toString(),
      expiresIn,
    });

    const res = {
      user: {
        name: userData.name,
        email: userData.email,
      },
      token,
    };

    return response.json(res);
  }
}
