import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface FormValues {
  userName: string;
  email: string;
  age: number;
  dateOfBirth: string;
  phoneNumbers: string[];
  social: {
    x: string;
    linkedIn: string;
  };
  message: string;
  tnc: boolean;
  appointment: "yes" | "no";
}

const Form = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      userName: "",
      email: "",
      age: 0,
      dateOfBirth: "",
      phoneNumbers: ["", ""],
      social: {
        x: "",
        linkedIn: "",
      },
      message: "",
      tnc: false,
      appointment: "no",
    },
  });
  console.log({ form });

  const { register, control, handleSubmit, watch, formState } = form;
  const { errors } = formState;

  //   const { name, ref, onChange, onBlur } = register("userName");

  const onFormSubmit = (data: FormValues) => {
    console.log("form submitted!!");
    console.log({ data });
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full min-w-xl bg-white rounded-2xl p-4 space-y-4"
        noValidate
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Contact Us
        </h2>

        {/* Name */}
        <div className="flex flex-col">
          <label
            htmlFor="userName"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            First Name
          </label>
          <input
            {...register("userName", {
              required: {
                value: true,
                message: "First name is required",
              },
              validate: (fieldValue) => {
                return (
                  fieldValue.length >= 4 || "Minimum 4 characters required"
                );
              },
            })}
            type="text"
            id="userName"
            // name={name}
            // ref={ref}
            // onChange={onChange}
            // onBlur={onBlur}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
          />
          {errors.userName?.message && (
            <p className="text-left text-xs text-red-500 mt-1">
              {errors.userName?.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@admin.com" ||
                    "Enter a different email address"
                  );
                },
                notBlacklisted: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("exec.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
            type="email"
            id="email"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
          {errors.email?.message && (
            <p className="text-left text-xs text-red-500 mt-1">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* Age*/}
        <div className="flex flex-col">
          <label
            htmlFor="age"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            Enter Age
          </label>
          <input
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Please enter your age",
              },
              validate: {
                morethan18: (fieldValue) => {
                  return (
                    fieldValue >= 18 ||
                    "You should be 18 years or older to contact us"
                  );
                },
                lessThan100: (fieldValue) => {
                  return fieldValue <= 100 || "Please enter valid age";
                },
              },
            })}
            type="number"
            id="age"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Age"
          />
          {errors.age?.message && (
            <p className="text-left text-xs text-red-500 mt-1">
              {errors.age?.message}
            </p>
          )}
        </div>

        {/* DOB*/}
        <div className="flex flex-col">
          <label
            htmlFor="dateOfBirth"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            Date of Birth
          </label>
          <input
            {...register("dateOfBirth", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Please enter your birth date",
              },
            })}
            type="date"
            id="dateOfBirth"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Date of birth"
          />
          {errors.dateOfBirth?.message && (
            <p className="text-left text-xs text-red-500 mt-1">
              {errors.dateOfBirth?.message}
            </p>
          )}
        </div>

        {/* Phone - Primary */}
        <div className="flex flex-col">
          <label
            htmlFor="primary-phone"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            Primary Phone number
          </label>
          <input
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "Please provide your Primary phone number",
              },
            })}
            type="text"
            id="primary-phone"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Primary phone number"
          />
          {errors.phoneNumbers && errors.phoneNumbers[0]?.message && (
            <p className="text-left text-xs text-red-500 mt-1">
              {errors.phoneNumbers[0]?.message}
            </p>
          )}
        </div>

        {/* Phone - Secondary*/}
        <div className="flex flex-col">
          <label
            htmlFor="secondary-phone"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            Secondary Phone number
          </label>
          <input
            {...register("phoneNumbers.1")}
            type="text"
            id="secondary-phone"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Secondary phone number"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            Message
          </label>
          <textarea
            {...register("message", {
              required: {
                value: true,
                message: "Message is required",
              },
            })}
            id="message"
            rows={4}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your message..."
          />
          {errors.message?.message && (
            <p className="text-left text-xs text-red-500 mt-1">
              {errors.message?.message}
            </p>
          )}
        </div>

        {/* Social - X */}
        <div className="flex flex-col">
          <label
            htmlFor="xHandle"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            X handle
          </label>
          <input
            {...register("social.x")}
            type="text"
            id="xHandle"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your X handle"
          />
        </div>

        {/* Social - LinkedIn */}
        <div className="flex flex-col">
          <label
            htmlFor="linkedIn"
            className="mb-1 text-sm font-medium text-gray-700 text-left"
          >
            LinkedIn
          </label>
          <input
            {...register("social.linkedIn")}
            type="text"
            id="linkedIn"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your LinkedIn Profile URL"
          />
        </div>

        {/* Appointment */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2 text-left">
            Want to set up an appointment with us?
          </p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                {...register("appointment")}
                type="radio"
                value="yes"
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                {...register("appointment")}
                type="radio"
                value="no"
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div>
          <div className="flex items-start space-x-2">
            <input
              {...register("tnc", {
                required: {
                  value: true,
                  message: "Please accept terms and conditions",
                },
              })}
              type="checkbox"
              id="tnc"
              className="mt-1 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="tnc" className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>
          {errors.tnc?.message && (
            <p className="text-left text-xs text-red-500 mt-1">
              {errors.tnc?.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!watch("tnc")}
          //   className="w-full text-white font-medium py-2 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700  transition-colors"
          className="w-full text-white font-medium py-2 px-4 rounded-lg 
             bg-indigo-600 hover:bg-indigo-700 
             disabled:bg-gray-400 disabled:cursor-not-allowed 
             transition-colors"
        >
          Submit
        </button>
        <DevTool control={control} />
      </form>
    </div>
  );
};

export default Form;
