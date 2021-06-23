import { extend, VeeValidate} from "vee-validate"
import { required, alpha, email } from "vee-validate/dist/rules"

extend("required", {
  ...required,
  message: "Kolom harus di isi"
})

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters"
})

extend("email", {
  ...email,
  message: "Mohon masukkan format email yang benar"
})