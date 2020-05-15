"use strict";

class createJob {
  get rules() {
    return {
      title: "required",
      link: "required",
    };
  }

  get messages() {
    return {
      required: "Hold up!, {{ field }} is required",
    };
  }

  async fails(error) {
    await this.ctx.session.withErrors(error).flashAll();

    return this.ctx.response.redirect("back");
  }
}

module.exports = createJob;
