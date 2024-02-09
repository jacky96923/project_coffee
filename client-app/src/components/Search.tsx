export default function Search() {
  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="尋找咖啡店"
          className="input input-bordered w-full max-w-xs"
        />

        <button>Filter</button>
      </div>
    </>
  );
}
