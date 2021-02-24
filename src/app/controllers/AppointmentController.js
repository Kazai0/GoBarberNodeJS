import Appointment from "../models/Appointment";
import * as Yup from "yup";
import User from "../models/User";

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json(400).json({ error: "Validation fails" });
    }

    const { provider_id, date } = req.body;

    //
    // Check if provider_id is a provider
    //

    console.log(provider_id);

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: "you can created appoitments only with providers" });
    }

    const appoitment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appoitment);
    // return res.json({ message: "Deus é bom" });
  }
}

export default new AppointmentController();
