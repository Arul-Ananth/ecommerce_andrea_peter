import React, { useState } from 'react'
import * as yup from 'yup';

function Validation() {

  const [data, setData] = useState({ name: '', place: '' });
  const [errors, setErrors] = useState({ name: '', place: '' });

  const ValidationSchema = yup.object({
    name: yup.string().required("Name is required"),
    place: yup.string().required("Place is required"),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await ValidationSchema.validate(data, { abortEarly: false });
      setErrors({ name: '', place: '' });
      console.log('Form submitted:', data);
    } catch (err) {
      const newErrors = { name: '', place: '' };
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name='name'
          value={data.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />
        <p>{errors.name}</p>

        <input
          name="place"
          value={data.place}
          onChange={handleChange}
          placeholder="Enter Place"
        />
        <p>{errors.place}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Validation;
