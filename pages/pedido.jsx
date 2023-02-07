import { createDeviceRequestAPI } from "@/api/DeviceRequest";
import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";

const Pedido = () => {
  const [request, setRequest] = useState({});
  const [formError, setFormError] = useState("");

  const { data, isLoading, error, mutate, isSuccess } = useMutation({
    mutationFn: createDeviceRequestAPI,
    onSuccess: () => {
      setRequest({});
      setFormError("");
    },
    onError: (error) => {
      setFormError(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    if (
      Object.values(request).some((value) => value === "" || !value) ||
      Object.values(request).length === 0
    ) {
      setFormError("Todos los campos son requeridos");
      setTimeout(() => setFormError(""), 2500);
      return;
    }
    mutate(request);
    formRef.current.reset();
    setRequest({});
  };

  const onChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const formRef = useRef("");

  return (
    <div className="max-w-xl mx-auto font-Montserrat p-4">
      <h3 className="text-2xl mb-4">Pedido personalizado 🥦</h3>
      <form className="flex flex-col" ref={formRef}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          className="form-input"
          type="text"
          placeholder="Juan Perez"
          onChange={onChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="juanperez@hotmail.com"
          id="email"
          name="email"
          className="form-input"
          onChange={onChange}
          required
        ></input>

        <label htmlFor="phone">Telefono</label>
        <input
          id="phone"
          name="phone"
          placeholder="8711232232"
          className="form-input"
          onChange={onChange}
          required
          maxLength={10}
          minLength={10}
          type="tel"
        ></input>

        <label htmlFor="device">Dipositivo deseado</label>
        <textarea
          name="device"
          id="device"
          cols="30"
          rows="5"
          placeholder="Iphone 13 Pro Max 128GB"
          className="form-input"
          onChange={onChange}
          required
        ></textarea>

        {error && <p className="font-bold text-red-500">{error}</p>}
        {formError && (
          <p className="font-bold text-red-500 mb-2">{formError}</p>
        )}
        {isSuccess && (
          <p className=" text-green-500 mb-2">
            Pedido enviado correctamente, se te enviara un mensaje por WhatsApp.
          </p>
        )}

        <button
          onClick={handleSubmit}
          type="submit"
          className="form-btn hover:opacity-95"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default Pedido;
