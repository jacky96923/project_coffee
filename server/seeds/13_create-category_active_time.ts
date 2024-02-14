import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("category_active_time").del();

  // Inserts seed entries
  await knex("category_active_time").insert([
    { day: "Monday", start_time: "08:00:00", close_time: "12:00:00" },
    { day: "Tuesday", start_time: "08:00:00", close_time: "12:00:00" },
    { day: "Wednesday", start_time: "08:00:00", close_time: "12:00:00" },
    { day: "Thursday", start_time: "08:00:00", close_time: "12:00:00" },
    { day: "Friday", start_time: "08:00:00", close_time: "12:00:00" },
    { day: "Monday", start_time: "07:30:00", close_time: "12:00:00" },
    { day: "Tuesday", start_time: "07:30:00", close_time: "12:00:00" },
    { day: "Wednesday", start_time: "07:30:00", close_time: "12:00:00" },
    { day: "Thursday", start_time: "07:30:00", close_time: "12:00:00" },
    { day: "Friday", start_time: "07:30:00", close_time: "12:00:00" },
    { day: "Saturday", start_time: "07:30:00", close_time: "12:00:00" },
    { day: "Sunday", start_time: "07:30:00", close_time: "12:00:00" },
  ]);
}
