'use strict'

class LoginUser {
  get rules () {
    return {
      email: "required|email",
      password: "required",
    }
  }

  get messages() {
    return {
      required: "Hello! {{ field }} is required",
      email: "{{ field }} is invalid"
    }
  }

  async fails(error) {
    await this.ctx.session.withErrors(error).flashAll()

    return this.ctx.response.redirect('back')
  }
}

module.exports = LoginUser
