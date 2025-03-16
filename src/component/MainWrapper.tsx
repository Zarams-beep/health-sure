"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ReactNode } from "react";
import ClientSideWrapper from "./ClentSiteWrapper";
type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  return (
    <Provider store={store}>
      <ClientSideWrapper>{children}</ClientSideWrapper>
    </Provider>
  );
}
