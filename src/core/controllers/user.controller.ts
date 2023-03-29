import { Request, Response } from "express";
import { UserService } from "~/core/services/user.service";

export class UserController {
  static signUp = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({
        message: "Bad request",
      });
    const data = await UserService.signUp(username, password);
    if (!data.success)
      return res.status(400).json({
        message: "Bad request",
      });

    return res.status(200).json({
      data: {
        message: "Administrator created",
      },
    });
  };

  static signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(401).json({
        message: "Unauthorized",
        errors: {
          login: "invalid credentials",
        },
      });
    const data = await UserService.signIn(username, password);
    if (!data.success)
      return res.status(401).json({
        message: "Unauthorized",
        errors: {
          login: "invalid credentials",
        },
      });

    return res.status(200).json({
      data: {
        token_user: data.token,
      },
    });
  };
}