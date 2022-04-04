import React from "react";

export default function ButtonDiscard({ text = "Discard Changes" }) {
  return (
    <div>
      <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-md text-lg font-lora font-bold active:translate-y-1 hover:bg-[#3491fc] shadow-lg shadow-primary-200/80 m-3 dark:hover:text-white dark:hover:bg-slate-900 dark:hover:shadow-slate-600 dark:bg-slate-400 dark:text-slate-900 dark:shadow-slate-900">
        {text}
      </button>
    </div>
  );
}
