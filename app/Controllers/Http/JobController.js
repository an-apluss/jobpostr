"use strict";

const Mail = use("Mail");
const Job = use("App/Models/Job");

class JobController {
  async home({ view }) {
    const jobs = await Job.all();

    return view.render("index", { jobs: jobs.toJSON() });
  }

  async userJob({ view, auth }) {
    const jobs = await auth.user.jobs().fetch();

    return view.render("jobs", { jobs: jobs.toJSON() });
  }

  async create({ request, response, auth, session }) {
    const { title, link, description } = request.all();

    await auth.user.jobs().create({
      title,
      link,
      description,
    });

    const {
      user: { email, username },
    } = await auth;

    await Mail.send(
      "mails.createjobnotification",
      { title, username },
      (message) => {
        message
          .from("info@jobpostr.com")
          .to(email)
          .subject("Jobpostr Notification");
      }
    );

    session.flash({ message: "Job successfully created" });

    return response.redirect("back");
  }

  async delete({ response, session, params }) {
    const job = await Job.find(params.id);

    await job.delete();
    session.flash({ message: "Job successfully removed" });

    return response.redirect("back");
  }

  async edit({ params, view }) {
    const job = await Job.find(params.id);
    return view.render("edit", { job: job });
  }

  async update({ request, response, session, params }) {
    const job = await Job.find(params.id);
    const { title, link, description } = request.all();

    job.title = title;
    job.link = link;
    job.description = description;

    await job.save();

    session.flash({ message: "Job successfully updated" });

    return response.route("user.job");
  }
}

module.exports = JobController;
