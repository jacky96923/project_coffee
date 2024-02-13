import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("shop_photos").del();

  // Inserts seed entries
  await knex("shop_photos").insert([
    {
      filename:
        "https://static8.orstatic.com/userphoto2/photo/1W/1I3L/0AOPINC0AAFA2D4328DFA8px.jpg",
      cover_photo: false,
      logo: true,
      shop_id: 1,
    },
    {
      filename:
        "https://b0126b37866c166c25be.cdn6.editmysite.com/uploads/b/b0126b37866c166c25beb043ae822022e967465fadcf340ec945e9b3de037515/nfcoffee_K2_1658296838.jpg?width=2400&optimize=medium",
      cover_photo: true,
      logo: false,
      shop_id: 1,
    },
    {
      filename:
        "https://upload.wikimedia.org/wikipedia/zh/e/ed/PacificCoffee_logo_%282015%29.svg",
      cover_photo: false,
      logo: true,
      shop_id: 2,
    },
    {
      filename:
        "https://www.asiaworld-expo.com/AsiaWorldExpoLocal/media/AWE/assets/images/dining/other-food-outlets/pacific-coffee/Expo_01-01.jpg?ext=.jpg",
      cover_photo: true,
      logo: false,
      shop_id: 2,
    },
  ]);
}
