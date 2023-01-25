const Alert = ({
  message = "Informacion",
  type,
  time = 30000,
  show,
  setShow,
  alwaysVisible = true,
}) => {
  const colorTypes = {
    success: "text-green-500",
    error: " text-red-500",
    info: "text-blue-500",
  };
  const fillTypes = {
    success: "fill-green-500",
    error: "fill-red-500",
    info: "fill-blue-500",
  };

  const color = colorTypes[type] || colorTypes["info"];
  const fillColor = fillTypes[type] || fillTypes["info"];

  if (!alwaysVisible) {
    setTimeout(() => {
      setShow(false);
    }, time);
  }

  if (!show) return null;

  return (
    <div
      class={`flex  p-4
              w-full 
              text-xs md:text-md
              lg:text-lg
              bg-gray-800 
              ${color}
               `}
      role="alert"
    >
      <svg
        aria-hidden="true"
        class="flex-shrink-0 inline w-5 h-5 mr-3"
        className={`w-5 h-5 ${fillColor} `}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Info</span>
      <div className="flex flex-1 justify-between ml-2">
        <p class="font-medium">
          Informacion: <span className="font-semibold">{message}</span>
        </p>

        <button className="underline" onClick={() => setShow(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Alert;
