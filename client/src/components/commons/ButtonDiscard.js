import React from "react";

export default function ButtonDiscard({ text = "Discard Changes" }) {
  return (
    <div>
      <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 m-3">
        {text}
      </button>
    </div>
  );
}
