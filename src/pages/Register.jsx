import { useForm } from "react-hook-form";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register: doRegister } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (values) => {
        try {
            await doRegister(values);
            reset();
            alert("Cuenta creada. Ahora puedes iniciar sesión cuando quieras.");
            navigate("/");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Ese correo ya está registrado. Intenta con otro.");
            } else {
                alert("Error al crear la cuenta: " + error.message);
            }
        }
    };

    /*Formulario para registrar usuarios*/
    return (
        <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            <h2>Crear nuevo usuario</h2>
            <input placeholder="Nombre" {...register("name", { required: true })} />
            <input placeholder="Email" type="email" {...register("email", { required: true })} />
            <input placeholder="Contraseña" type="password" {...register("password", { required: true, minLength: 6 })} />
            <button disabled={isSubmitting}>
                {isSubmitting ? "Creando…" : "Registrarme"}
            </button>
        </form>
    );
}


