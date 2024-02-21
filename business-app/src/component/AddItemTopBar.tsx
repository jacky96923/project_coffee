export default function AddItemTopBar() {
  return (
    <div className="navbar bg-base-100 border-2 rounded-lg">
      <div className="flex-1">
        <span>排序：</span>
        <a className="btn btn-ghost">類別</a>
        <a className="btn btn-ghost">價格</a>
        <a className="btn btn-ghost">餐單</a>
        <a className="btn btn-ghost">狀態</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
