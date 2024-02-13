export default function Search() {
  return (
    <>
      <div className="flex justify-center mt-5 border">
        <input
          type="text"
          placeholder="咖啡店名稱"
          className="input input-bordered w-full max-w-xs m-3"
        />

        <button>Filter</button>
      </div>
    </>
  );
}
