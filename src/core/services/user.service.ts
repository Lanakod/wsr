import bcrypt from "bcryptjs";
import UsersRepository from "~/database/repos/user.repository";
import jwt from "jsonwebtoken";
import process from "process";

export class UserService {
  static signUp = async (username: string, password: string) => {
    const match = await UsersRepository.findOne({
      where: {
        username,
      },
    });
    if (match) {
      return {
        success: false,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = UsersRepository.create({
      username,
      password: hashPassword,
    });
    await UsersRepository.save(user);
    return {
      success: true,
      token: jwt.sign(
        JSON.stringify({
          id: user.id,
          username: user.username,
        }),
        process.env.TOKEN_SECRET as string
      ),
    };
  };

  static signIn = async (username: string, password: string) => {
    const match = await UsersRepository.findOne({
      where: {
        username,
      },
    });
    if (!match)
      return {
        success: false,
      };
    const valid = await bcrypt.compare(password, match.password);
    if (!valid)
      return {
        success: false,
      };

    return {
      success: true,
      token: jwt.sign(
        JSON.stringify({
          id: match.id,
          username: match.username,
        }),
        process.env.TOKEN_SECRET as string
      ),
    };
  };
}