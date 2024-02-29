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
    {
      filename:
        "https://lh3.googleusercontent.com/p/AF1QipMO2yWlWD7SwGU-S3ffCDM0ed3LCpFkuuLax-8y=s1360-w1360-h1020",
      cover_photo: false,
      logo: true,
      shop_id: 3,
    },
    {
      filename:
        "https://lh3.googleusercontent.com/p/AF1QipMO2yWlWD7SwGU-S3ffCDM0ed3LCpFkuuLax-8y=s1360-w1360-h1020",
      cover_photo: true,
      logo: false,
      shop_id: 3,
    },
    {
      filename:
        "https://scontent-hkg1-2.xx.fbcdn.net/v/t39.30808-1/411452536_122104551620153560_4115236475401605376_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=103&ccb=1-7&_nc_sid=4da83f&_nc_ohc=jztuJoQQyGYAX8EJleY&_nc_ht=scontent-hkg1-2.xx&oh=00_AfCnbsrqAqhDoZxY0y3-4VQyPhG-q8IXdGlq1M02yof6hQ&oe=65E472E9",
      cover_photo: false,
      logo: true,
      shop_id: 4,
    },
    {
      filename:
        "https://pr1.nicelocal.hk/8P3b4lKpIcRf-SFFE-e9zw/330x440,q85/4px-BW84_n0QJGVPszge3NRBsKw-2VcOifrJIjPYFYkOtaCZxxXQ2YfkSVq2TMbRxvbtj8SqkBXBhuj7TDr-ZMfanS_5aqHe_42abdh1C-Q5dtm5hBPN4w",
      cover_photo: true,
      logo: false,
      shop_id: 4,
    },
    {
      filename:
        "https://static8.orstatic.com/userphoto2/photo/1S/1F89/0A4ASFF8C9D648AF53DDC2px.jpg",
      cover_photo: false,
      logo: true,
      shop_id: 5,
    },
    {
      filename:
        "https://static7.orstatic.com/userphoto2/photo/24/1OPV/0BZRYQ905F58B567E249B1px.jpg",
      cover_photo: true,
      logo: false,
      shop_id: 5,
    },
    {
      filename:
        "https://static5.orstatic.com/userphoto2/photo/15/WM7/06FXWG22F550F18A38EDDCsx.jpg",
      cover_photo: false,
      logo: true,
      shop_id: 6,
    },
    {
      filename:
        "https://static8.orstatic.com/userphoto2/photo/1G/15GK/086TRZ7B9C44A4203D9A13sx.jpg",
      cover_photo: true,
      logo: false,
      shop_id: 6,
    },
    {
      filename:
        "https://static7.orstatic.com/userphoto2/photo/2F/1WYB/0DMC524BED8669E48D59DApx.jpg",
      cover_photo: false,
      logo: true,
      shop_id: 7,
    },
    {
      filename:
        "https://static5.orstatic.com/userphoto2/photo/1Q/1DHS/09RYLW4F17ED8C0744B080px.jpg",
      cover_photo: true,
      logo: false,
      shop_id: 7,
    },
    {
      filename:
        "https://static6.orstatic.com/userphoto2/photo/20/1L84/0BAXQ5EB9E6181091B4062px.jpg",
      cover_photo: false,
      logo: true,
      shop_id: 8,
    },
    {
      filename:
        "https://static6.orstatic.com/userphoto2/photo/25/1PB1/0C3YFHF6CF520FE1B67AA9px.jpg",
      cover_photo: true,
      logo: false,
      shop_id: 8,
    },
  ]);
}
