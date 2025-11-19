import { handleError } from "@utils/errorTratament";
import MySwal from "@utils/custom_swal";

export const loginAction = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  loginData: LoginData
) => {
  setIsLoading(true);

  try {
    MySwal.fire("Cargando...");
    MySwal.showLoading();

    console.log("loginData", loginData);

    //   const {
    //     data: { data },
    //   } = await postLogin(loginData);
  } catch (error) {
    handleError({ error });
    setIsLoading(false);
  } finally {
    MySwal.close();
    setIsLoading(false);
  }
};
