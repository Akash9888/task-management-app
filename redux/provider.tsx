"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import Sidebar from "../app/Components/Sidebar/Sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Sidebar />
      <div className="w-full">{children}</div>
    </Provider>
  );
}
