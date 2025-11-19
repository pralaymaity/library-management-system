const memberService = require("../service/memberService");

exports.createMember = async (req, res) => {
  const data = req.body;
  //console.log(email);

  try {
    await memberService.createMember(data);

    res.status(200).json({ message: "Member is created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create member", error: error.message });
  }
};
