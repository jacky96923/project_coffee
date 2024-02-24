type HeaderProps = {
    title: string
}

export default function Header (props: HeaderProps) {
    return (
      <header className="bg-white shadow p-4">
        {/* Header content */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold m-4">歡迎, {props.title}</h1>
        </div>
      </header>
    );
  };