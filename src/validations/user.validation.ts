import * as yup from "yup";

const validations = yup.object().shape({
	fullName: yup
		.string()
		.required("Required"),
    email: yup
		.string()
		.email('Invalid email format')
		.required("Required"),
	github: yup
		.string()
		.required("Required"),
});

export default validations;

