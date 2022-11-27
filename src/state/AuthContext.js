import { Children, createContext, useContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

// 最初のユーザー状態を定義
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

// 状態をグローバルに管理する
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  // dispatchはどのようなアクションを実行したかの情報
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {/* children=<App /> */}
      {children}
    </AuthContext.Provider>
  );
};
