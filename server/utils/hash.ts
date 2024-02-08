import { hash, compare } from "bcrypt";

const saltRounds = 10;
export async function hashPassword(password_input: string) {
  let hashed = await hash(password_input, saltRounds);

  return hashed;
}

export async function comparePassword(
  password_input: string,
  login_password: string
) {
  let result = await compare(password_input, login_password);
  return result;
}
