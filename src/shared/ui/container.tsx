type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return <div className="h-full max-w-7xl px-16 mx-auto">{children}</div>;
};
