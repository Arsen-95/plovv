import cn from "classnames";

type TabsProps = {
  tabs: { name: string; value: number }[];
  activeTab: number;
  onSelectedTabChanged: (value: number) => void;
  variant: "main" | "secondary";
};

export const Tabs = ({
  tabs,
  activeTab,
  onSelectedTabChanged,
  variant,
}: TabsProps) => {
  return (
    <div className="flex p-[5px] bg-[#F3F3F7] rounded-full">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          onClick={() => onSelectedTabChanged(tab.value)}
          name={tab.name}
          isActive={tab.value === activeTab}
          variant={variant}
        />
      ))}
    </div>
  );
};

type TabProps = {
  name: string;
  isActive?: boolean;
  onClick: () => void;
  variant: "main" | "secondary";
};

export const Tab = ({ name, isActive, onClick, variant }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("w-full py-[9px] px-6 text-[#757575] rounded-full", {
        "text-secondary bg-white": isActive && variant === "secondary",
        "text-white bg-main": isActive && variant === "main",
      })}
    >
      {name}
    </button>
  );
};
