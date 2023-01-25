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

  const color = colorTypes[type] || colorTypes["info"];

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
              text-sm md:text-md
              lg:text-lg
              bg-gray-800 
              ${color}
               `}
      role="alert"
    >
      <span class="sr-only">Info</span>
      <div className="flex flex-1 justify-between ml-2">
        <p class="font-medium">
          <span className="font-semibold">{message}</span>
        </p>

        {/* <button className="underline" onClick={() => setShow(false)}>
          Cerrar
        </button> */}
      </div>
    </div>
  );
};

export default Alert;
