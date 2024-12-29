const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Firstname or Lastname data is missing.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid. Please enter a valid email.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const data = req.body;

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  if (!data.skills === undefined) {
    if (data.skills.length > 10) {
      throw new Error("Skills should be less or eqal to 10");
    }
  }

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
