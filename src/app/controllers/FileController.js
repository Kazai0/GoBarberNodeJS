import File from "../models/File";

class FileController {
  async store(req, res) {
    //i got the filename and originalname and put in name and path
    const { originalname: name, filename: path } = req.file;

    //here i put name and path that i got above and put in the Database
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);

    // return res.json(req.file);
  }
}

export default new FileController();
