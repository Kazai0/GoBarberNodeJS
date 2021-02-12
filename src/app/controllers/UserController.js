import User from "../models/User";

class UserController {
  async store(req, res) {
    // criação de uma variavel que busca no banco de dados
    //se existe já um email com o email da requisição com o req.body
    const userExist = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExist) {
      return res.status(400).json({ error: "User already exist." });
    }

    //criação de uma variavel que recebe cria um cadastro de usuarios
    //conforme os campos que recebeu no req.body(do_postman)
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
