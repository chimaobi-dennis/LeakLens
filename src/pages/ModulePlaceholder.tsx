interface Props {
  name: string;
}

const ModulePlaceholder = ({ name }: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="font-display text-4xl text-foreground">{name}</h1>
    </div>
  );
};

export default ModulePlaceholder;
