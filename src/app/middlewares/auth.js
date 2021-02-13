import { Decipher } from "crypto";
import jwt, { decode } from "jsonwebtoken";

import { promisify } from "util";

import authConfig from "../../config/auth";

export default async (req, res, next) => {
  const autHeader = req.headers.authorization;

  if (!autHeader) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = autHeader.split(" ");

  try {
    const decoed = await promisify(jwt.verify)(token, authConfig.secret);

    //  console.log(decoed);

    req.userId = decoed.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "token invalid" });
  }

  return next();
};
