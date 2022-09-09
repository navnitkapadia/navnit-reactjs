import * as yup from "yup";

const validations = yup.object().shape({
	name: yup
		.string()
		.required("Required"),
    description: yup
		.string()
		.required("Required"),
    price: yup
		.number()
		.required("Required"),
    avatar: yup
		.string()
		.required("Required"),
    category: yup
		.string()
		.required("Required"),
	developerEmail: yup
		.string()
		.email('Invalid email format')
		.required("required field"),
});

export default validations;

