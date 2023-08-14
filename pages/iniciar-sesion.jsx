import { loginAPI } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const Signin = () => {
  const { login, user, loading } = useAuth();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  if (loading) return <p>loading...</p>;
  if (user && !loading) {
    if (typeof window !== "undefined")
      navigate.replace("/dashboard", undefined, { shallow: true });
    return null;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 bg-white shadow-lg rounded-md"
      >
        <label htmlFor="email">Correo electronico</label>
        <input
          className="p-2 rounded-md my-2 shadow-md"
          type="text"
          name="email"
          placeholder="alexis@hotmail.com"
          {...register("identifier", { required: true })}
        />
        {errors.identifier && (
          <span className="text-red-500 my-2">Este campo es requerido</span>
        )}
        <label htmlFor="email">Contrasena </label>
        <input
          className="p-2 rounded-md my-2 shadow-md"
          type="password"
          name="email"
          placeholder="********"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 my-2">Este campo es requerido</span>
        )}
        <button
          type="submit"
          className="bg-purple-300  rounded-md mt-4 p-2 hover:opacity-80"
        >
          <p>Iniciar sesion</p>
        </button>
      </form>
    </div>
  );
};

export default Signin;
