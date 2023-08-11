import { Context } from "@/context/Contex";
import { loginAPI } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useAuth = () => {
  const { user, setUser, jwt, setJwt, loading } = useContext(Context);
  const navigate = useRouter();
  const {
    mutate,
    isError: isLoginError,
    isLoading: isLoginLoading,
  } = useMutation({
    mutationKey: "login",
    mutationFn: (data) => loginAPI(data),
    onSuccess: (data) => {
      setJwt(data.jwt);
      setUser(data.user);
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate.push("/dashboard");
    },
    onError: (error) => {
      throw new Error(error);
    },
  });

  const login = async (data) => {
    try {
      mutate(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const logout = () => {};

  return {
    login,
    logout,
    isLoginError,
    isLoginLoading,
    user,
    loading,
  };
};

export default useAuth;
