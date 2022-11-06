import React, { Dispatch } from "react";
import { State, Action } from "../reducers/PollReducer";

const StoreContext = React.createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({} as any);

export function useStore() {
  return React.useContext(StoreContext);
}

export default StoreContext;
