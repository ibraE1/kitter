function FormInput({ name, type, formData, setFormData }) {
  return (
    <div>
      <label htmlFor={name}>
        {(name.charAt(0).toUpperCase() + name.slice(1))
          .match(
            /[A-Z][a-z]+|[0-9]+/g /* match regex to handle special case display name */
          )
          .join(" ")}
      </label>
      <input
        type={type}
        id={name}
        value={formData[name]}
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
