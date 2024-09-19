import { useState } from "react";

import { Container } from "@/shared/ui/container";
import infoIcon from "@/shared/assets/icons/info.svg";
import { Tabs } from "@/shared/ui/tabs";
import { Card } from "@/shared/ui/card";

import * as lib from "./lib";

type SelectedFood = {
  selectedFoodType: number;
};

export const MainPage = () => {
  const [selectedSet, setSelectedSet] = useState(1);
  const [packType, setPackType] = useState(1);
  const [addition, setAddition] = useState({
    salads: new Set() as Set<number>,
    drinks: new Set() as Set<number>,
  });

  const setPrice =
    lib.foodSets.find((set) => set.value === selectedSet)?.price ?? 0;
  const saladPrice = lib.salads.reduce((acc, next) => {
    if (addition.salads.has(next.id)) {
      acc += next.price;
    }
    return acc;
  }, 0);
  const drinksPrice = lib.drinks.reduce((acc, next) => {
    if (addition.drinks.has(next.id)) {
      acc += next.price;
    }
    return acc;
  }, 0);

  const totalPrice = setPrice + saladPrice + drinksPrice;

  return (
    <Container>
      <div className="flex gap-24 h-full pt-16">
        <div>
          <div className="flex items-center gap-2.5 mb-10">
            <img src={infoIcon} />
            <p>Заказ включает в себя 5 порций</p>
          </div>
          <SelectedFood selectedFoodType={selectedSet} />
          <p className="mb-2.5 text-[#8D8D8D]">Выберете сет:</p>
          <SelectSet
            onSelectedSetChanged={setSelectedSet}
            selectedSet={selectedSet}
          />
          <p className="mb-2.5 text-[#8D8D8D]">Разница в упаковке блюда</p>
          <Pack onSelectedPackChanged={setPackType} selectedPack={packType} />
        </div>
        <div className="w-full ">
          <h2 className="mb-3 font-bold text-3xl">Самаркандский плов</h2>
          <p className="max-w-[18.2rem] mb-4 text-[#6F6F6F]">
            Приготовлен с любовью и вниманием к каждой детали
          </p>
          <p className="max-w-96 mb-5 text-lg">
            Вкуснейшая говядина , казы , рис , красная морковь, перепелинные
            яйца, чеснок,  подсолнечное масло, долма.
          </p>
          <p className="mb-2.5 text-secondary text-2xl">Дополнительно:</p>
          <Menu
            name="Салаты х5"
            food={lib.salads}
            onClick={setAddition}
            field="salads"
            list={addition}
            className="mb-2.5"
          />
          <Menu
            name="Напитки х5"
            food={lib.drinks}
            onClick={setAddition}
            field="drinks"
            list={addition}
            className="mb-2.5"
          />
          <div className="flex w-full justify-end">
            <CartButton
              price={totalPrice}
              addition={addition}
              packType={packType}
              selectedSet={selectedSet}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

const SelectedFood = ({ selectedFoodType }: SelectedFood) => {
  return (
    <div className="w-[30rem] h-[32rem] mb-2.5">
      <img
        src={
          lib.selectedFood[selectedFoodType as keyof typeof lib.selectedFood]
        }
      />
    </div>
  );
};

type SelectedSetProps = {
  selectedSet: number;
  onSelectedSetChanged: (value: number) => void;
};

const SelectSet = ({ selectedSet, onSelectedSetChanged }: SelectedSetProps) => {
  return (
    <div className="mb-5">
      <Tabs
        variant="secondary"
        tabs={lib.foodSets}
        activeTab={selectedSet}
        onSelectedTabChanged={onSelectedSetChanged}
      />
    </div>
  );
};

type PackProps = {
  selectedPack: number;
  onSelectedPackChanged: (value: number) => void;
};

const Pack = ({ selectedPack, onSelectedPackChanged }: PackProps) => {
  return (
    <div>
      <Tabs
        variant="main"
        tabs={lib.packType}
        activeTab={selectedPack}
        onSelectedTabChanged={onSelectedPackChanged}
      />
    </div>
  );
};

type MenuProps = {
  name: string;
  food: {
    name: string;
    count: number;
    weight: number;
    image: string;
    id: number;
  }[];
  onClick: (
    value: React.SetStateAction<{
      salads: Set<number>;
      drinks: Set<number>;
    }>
  ) => void;
  field: "salads" | "drinks";
  list: {
    salads: Set<number>;
    drinks: Set<number>;
  };
  className?: string;
};

const Menu = ({ food, name, onClick, field, list, className }: MenuProps) => {
  return (
    <div className={className}>
      <p className="mb-4 text-lg">{name}</p>
      <div className="flex justify-between">
        {food.map((item) => (
          <Card
            isSelected={list[field].has(item.id)}
            {...item}
            key={item.id}
            onClick={() => {
              onClick((prevAddition) => {
                const newSet = new Set(prevAddition[field]);

                if (newSet.has(item.id)) {
                  newSet.delete(item.id);
                } else {
                  newSet.add(item.id);
                }

                return {
                  ...prevAddition,
                  [field]: newSet,
                };
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

type CartButtonProps = {
  price: number;
  selectedSet: number;
  packType: number;
  addition: {
    drinks: Set<number>;
    salads: Set<number>;
  };
};

const CartButton = ({
  price,
  selectedSet,
  packType,
  addition,
}: CartButtonProps) => {
  return (
    <button
      className="w-full bottom-5  bg-main rounded-2xl text-white text-2xl py-4"
      onClick={() => showOrder({ addition, packType, selectedSet })}
    >
      В корзину {price} Сум
    </button>
  );
};

function showOrder({
  addition,
  packType,
  selectedSet,
}: Omit<CartButtonProps, "price">) {
  const salads = Array.from(addition.salads);
  const drinks = Array.from(addition.drinks);
  console.log({
    order: {
      id: 1,
      set: selectedSet,
      package: packType,
      additional_: {
        salads,
        drinks,
      },
    },
  });
}
