function FormInput({ name, type, formData, setFormData }) {
  return (
    <div className="flex w-full">
      {/* <label htmlFor={name}>
        {(name.charAt(0).toUpperCase() + name.slice(1))
          .match(/[A-Z][a-z]+|[0-9]+/g)
          .join(" ")}
      </label> */}
      <input
        className="w-full border-2 border-slate-400 placeholder-slate-400 focus:border-indigo-700 focus:placeholder-indigo-700 focus:outline-none rounded-lg p-3"
        type={type}
        id={name}
        value={formData[name]}
        placeholder={(name.charAt(0).toUpperCase() + name.slice(1))
          .match(/[A-Z][a-z]+|[0-9]+/g)
          .join(" ")}
        onChange={(e) =>
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: e.target.value,
          }))
        }
      ></input>
    </div>
  );
}

export default FormInput;
