import Swal from "sweetalert2"

export const fireAlertMessage = (msg) => {
  Swal.fire("Hmm...", msg, "error")
}

export const fireAlertRegister = (msg) => {
  Swal.fire({
    title: msg,
    icon: "success",
    allowOutsideClick: () => !Swal.isLoading()
  })
}
