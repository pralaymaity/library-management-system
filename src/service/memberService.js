const member = require("../model/member");
const bcrypt = require("bcrypt");

exports.createMember = async (data) => {
  const { username, email, password } = data;

  const emailMatch = await member.findOne({ email });

  if (emailMatch) {
    throw new Error("email is already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return member.create({
    username,
    email,
    password: hashedPassword,
  });
};


