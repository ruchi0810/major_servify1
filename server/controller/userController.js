//apis
import user from "../model/userModel.js";
import Review from "../model/reviewModel.js";

export const create = async (req, res) => {
  try {
    const userData = new user(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }

    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for fetching all record
export const getAll = async (req, res) => {
  try {
    const userData = await user.find();
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for fetching one perticular record
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for updating data
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user data not found" });
    }
    const updatedData = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // await Review.updateMany(
    //   { userId: id },
    //   {
    //     $set: {
    //       "userId.name": req.body.name,
    //       "userId.mobile": req.body.mobile,
    //     },
    //   }
    // );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for deleting record
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user data not found" });
    }
    await user.findByIdAndDelete(id);

    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
