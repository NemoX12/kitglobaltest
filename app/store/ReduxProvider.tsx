"use client";

import { Provider } from "react-redux";
import postsStore from "./postsStore";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={postsStore}>{children}</Provider>;
}