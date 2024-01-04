import Agenda from "agenda";
import config from "../config.js";

const agenda = new Agenda({
  db: {
    address: config.DATABASE_URL,
  },
});

const agendaService = (jobName, cb)=> agenda.define(jobName, async (job) => {
  console.log("runnig job");
  try {
    await cb
    job.remove();
  } catch (err) {
    console.error("Error with sending email");
    await agenda.now("sendEmail");
  }
});
await agenda.start();
await agenda.now("sendEmail");

export default agendaService