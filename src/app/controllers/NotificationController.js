import User from "../models/User";
import notification from "../schemas/notification";

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: "Only provider can load notifications" });
    }

    const notifications = await notification
      .find({
        user: req.userId,
      })
      .sort({ createdAt: "desc" })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notifications = await notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notifications);
  }
}

export default new NotificationController();
