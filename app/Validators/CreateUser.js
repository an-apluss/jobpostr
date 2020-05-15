"use strict";

class CreateUser {
  get rules() {
    return {
      username: "required|unique:users",
      email: "required|unique:users",
      password: "required",
    };
  }

  get messages() {
    return {
      required: "Hello! {{ field }} is required",
      unique: "Wait a second, {{ field }} already taken",
    };
  }

  async fails(error) {
    await this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = CreateUser;
