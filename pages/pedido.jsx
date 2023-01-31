import { createDeviceRequestAPI } from "@/api/DeviceRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { use, useState } from "react";

const Pedido = () => {
  const [request, setRequest] = useState({});
  const [formError, setFormError] = useState("");

  const validateRequest = () => {
    // Validate request and return boolean

    if (!request.name || !request.phone || request.email || !request.device) {
      setFormError("Todos los campos son requeridos");
      return false;
    }

    return true;
  };

  const onChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  const { data, isLoading, error, mutate } = useMutation({
    mutationFn: createDeviceRequestAPI,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <form action="" className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          className="form-input"
          type="text"
          placeholder="Juan Perez"
          onChange={onChange}
        />

        <label htmlFor="email">Email</label>
        <input
          placeholder="juanperez@hotmail.com"
          id="email"
          name="email"
          className="form-input"
          onChange={onChange}
        ></input>

        <label htmlFor="phone">Telefono</label>
        <input
          id="phone"
          name="phone"
          placeholder="8711232232"
          className="form-input"
          onChange={onChange}
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
        ></textarea>

        {error && <p className="font-bold text-red-500">{error}</p>}

        <button
          onClick={(e) => {
            e.preventDefault();

            mutate(request);
          }} 
          type="submit"
          className="form-btn hover:opacity-95"
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default Pedido;
