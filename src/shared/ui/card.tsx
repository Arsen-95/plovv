import cn from "classnames";

import checkImage from "shared/assets/icons/check.svg";

type CardProps = {
  image: string;
  name: string;
  weight: number;
  count: number;
  isSelected?: boolean;
  onClick: () => void;
};

export const Card = ({
  count,
  image,
  name,
  weight,
  isSelected = false,
  onClick,
}: CardProps) => {
  return (
    <button
      className={cn(
        "flex flex-col items-center max-w-[10.625rem] w-full h-60 rounded-2xl pt-3 pb-2 bg-[#F3F3F7]",
        {
          "outline outline-main outline-offset-0": isSelected,
        }
      )}
      onClick={onClick}
    >
      <div className="flex justify-end w-full pr-3">
        {isSelected ? (
          <img className="mb-2.5" src={checkImage} />
        ) : (
          <div className="w-[1.125rem] h-[1.125rem] mb-2.5 rounded-full border border-main"></div>
        )}
      </div>
      <div className="flex items-center justify-center w-28 h-20 mb-4">
        <img className="mb-[5px]" src={image} />
      </div>
      <p className="mb-2.5 text-xl">{name}</p>
      <p className="text-lg text-[#616161]">{weight} гр</p>
      <p className="text-lg text-[#111111]">{count} шт</p>
    </button>
  );
};
