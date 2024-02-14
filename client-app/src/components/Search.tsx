import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

export default function Search() {
  return (
    <>
      <div className="flex justify-center  ">
        <input
          type="text"
          placeholder="咖啡店名稱"
          className="input input-bordered w-full max-w-xs m-3 rounded-lg"
        />

        <button className="rounded-lg w-10">
          <AdjustmentsHorizontalIcon />
        </button>
      </div>
    </>
  );
}
