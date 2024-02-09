import React from "react";

export default function ClientMainPage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              早晨, username{" "}
            </h1>
            <div>
              <input type="text" placeholder="尋找咖啡店" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
