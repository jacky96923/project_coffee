import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export default function Search() {
  return (
    <>
      <div className="flex justify-center w-5/6 mx-auto m-4">
        <input
          type="text"
          placeholder="咖啡店名稱"
          className="input input-bordered w-full max-w-xs m-3 rounded-2xl	drop-shadow-lg	"
        />

        <button className="rounded-2xl	 w-10">
          <AdjustmentsHorizontalIcon className="text-green-800" />
        </button>
      </div>
    </>
  );
}
