import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const navigate = useNavigate();
    const from = (useLocation().state?.from?.pathname) || "/dashboard";

    const onSubmit = async (values) => {
        await login(values);
        navigate(from, { replace: true });
    };

    /*Formulario para iniciar sesion conectado a firebase*/
    return (
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            <h2>Iniciar sesión</h2>
            <input placeholder="Email" type="email" {...register("email", { required: true })} />
            <input placeholder="Contraseña" type="password" {...register("password", { required: true })} />
            <button disabled={isSubmitting}>{isSubmitting ? "Ingresando…" : "Entrar"}</button>
        </form>
    );
}
