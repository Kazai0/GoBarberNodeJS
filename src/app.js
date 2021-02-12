import express from "express";
import routes from "./routes";

import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;

// index(){} Listagem de usuarios
// show(){} Exibir um único usuário
//store(){} Cadastrar usuario
//update(){} alterar usuario
//delete(){} remover usuario
