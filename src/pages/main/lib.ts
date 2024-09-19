import achichukImage from "shared/assets/images/achichuk.png";
import meatImage from "shared/assets/images/meat.png";
import borjomiImage from "shared/assets/images/borjomi.png";
import cacaColaImage from "shared/assets/images/cola.png";
import cocaColaZeroImage from "shared/assets/images/cola-zero.jpg";
import simpleImage from "shared/assets/images/plov.png";
import specialImage from "shared/assets/images/special.png";
import superSpecialImage from "shared/assets/images/super special.png";

export type SelectedFoodType = "simple" | "special" | "superSpecial";

export const salads = [
  {
    name: "Ачичук",
    weight: 350,
    count: 5,
    image: achichukImage,
    id: 1,
    price: 20,
  },
  {
    name: "Мясной",
    weight: 350,
    count: 5,
    image: meatImage,
    id: 2,
    price: 30,
  },
  {
    name: "Ачичук",
    weight: 350,
    count: 5,
    image: achichukImage,
    id: 3,
    price: 40,
  },
];

export const drinks = [
  {
    name: "Borjomi",
    weight: 350,
    count: 5,
    image: borjomiImage,
    id: 1,
    price: 100,
  },
  {
    name: "Coca Cola",
    weight: 350,
    count: 5,
    image: cacaColaImage,
    id: 2,
    price: 200,
  },
  {
    name: "Coca Cola Zero",
    weight: 350,
    count: 5,
    image: cocaColaZeroImage,
    id: 3,
    price: 300,
  },
];

export const selectedFood = {
  1: simpleImage,
  2: specialImage,
  3: superSpecialImage,
};

export const foodSets = [
  { name: "Обычный", value: 1, price: 1000 },
  { name: "Special", value: 2, price: 2000 },
  { name: "Super special", value: 3, price: 3000 },
];

export const packType = [
  { name: "В офис", value: 1 },
  { name: "Домой", value: 2 },
];
