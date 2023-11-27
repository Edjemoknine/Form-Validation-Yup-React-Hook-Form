import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface UserInput {
  name: string;
  email: string;
  password: string;
}
type InputType = {
  label: string;
  register: UseFormRegister<UserInput>;
  errors: FieldErrors<UserInput>;
};
// we can reuse that component in react-hook-form
const InputField = ({ label, register, errors }: InputType) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input {...register(label)} type={label} placeholder={label} />
      {errors && <span className="error">{errors.message}</span>}
    </div>
  );
};

const Forms = () => {
  const validationSchema = yup
    .object({
      name: yup.string().required("missing username"),
      email: yup
        .string()
        .required("missing email")
        .email("ivalid email format"),
      password: yup.string().required("missing password"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // when we make api request if we had errors then we will put it in setError to display it in the form
  } = useForm<UserInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  console.log(errors);
  const onSubmitUser = (event: UserInput) => {
    console.log(event);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitUser)}>
        <h1>Register</h1>
        <InputField label="name" register={register} errors={errors.name} />
        <InputField label="email" register={register} errors={errors.email} />
        <InputField
          label="password"
          register={register}
          errors={errors.password}
        />
        {/* <div>
          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            name="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            name="password"
          />
        </div> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Forms;
