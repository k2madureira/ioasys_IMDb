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

    const passwordMatched = compare(password, user?.password);

    if (!passwordMatched) {
      return response.status(401).json({ error: 'Incorrect password.' });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    const res = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response.json(res);
  }
}
