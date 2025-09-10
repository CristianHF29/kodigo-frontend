import { useAuth } from "../auth/AuthContext";
import { db } from "../firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const STATUS_OPTIONS = ["Pendiente", "Disponible", "En curso", "Cancelado"];

export default function Admin() {
    const { isAdmin } = useAuth();
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            image: "",
            status: "Pendiente",
            active: true,
        },
    });

    if (!isAdmin) return <div className="card">No tienes permisos para acceder aquí.</div>;

    const loadAll = async () => {
        const snap = await getDocs(collection(db, "bootcamps"));
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    useEffect(() => {
        loadAll();
    }, []);

    const onSubmit = async (v) => {
        if (editingId) {
            await updateDoc(doc(db, "bootcamps", editingId), {
                title: v.title,
                description: v.description,
                image: v.image || "https://via.placeholder.com/300x200",
                status: v.status,
                active: !!v.active,
            });
            setEditingId(null);
            reset({ title: "", description: "", image: "", status: "Pendiente", active: true });
            alert("Bootcamp actualizado.");
        } else {
            await addDoc(collection(db, "bootcamps"), {
                title: v.title,
                description: v.description,
                image: v.image || "https://via.placeholder.com/300x200",
                status: v.status,
                active: !!v.active,
                createdAt: serverTimestamp(),
            });
            reset({ title: "", description: "", image: "", status: "Pendiente", active: true });
            alert("Bootcamp creado.");
        }
        await loadAll();
    };

    const onEdit = (item) => {
        setEditingId(item.id);
        setValue("title", item.title || "");
        setValue("description", item.description || "");
        setValue("image", item.image || "");
        setValue("status", item.status || "Pendiente");
        setValue("active", !!item.active);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onDelete = async (id) => {
        if (!confirm("¿Eliminar este bootcamp?")) return;
        await deleteDoc(doc(db, "bootcamps", id));
        await loadAll();
    };

    const onToggleActive = async (item) => {
        await updateDoc(doc(db, "bootcamps", item.id), { active: !item.active });
        await loadAll();
    };

    const onCancelEdit = () => {
        setEditingId(null);
        reset({ title: "", description: "", image: "", status: "Pendiente", active: true });
    };

    /*Formulario para crear bootcamps solo para administrador*/
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>{editingId ? "Editar bootcamp" : "Nuevo bootcamp"}</h2>

                <input placeholder="Título" {...register("title", { required: true })} />
                <textarea placeholder="Descripción" rows={4} {...register("description", { required: true })} />

                <input placeholder="Imagen (URL)" {...register("image")} />

                <select {...register("status", { required: true })}>
                    {STATUS_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="checkbox" {...register("active")} />
                    Activo (visible para todos)
                </label>

                <div style={{ display: "flex", gap: 8 }}>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? (editingId ? "Actualizando…" : "Guardando…") : (editingId ? "Actualizar" : "Crear")}
                    </button>
                    {editingId && (
                        <button type="button" onClick={onCancelEdit}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h3 className="section-title">Administrar bootcamps</h3>
            <div className="grid">
                {items.map((b) => (
                    <article className="card" key={b.id}>
                        <img className="card-img" src={b.image} alt={b.title} />
                        <h4 className="card-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{b.title}</span>
                            <span className="badge">{b.status}</span>
                        </h4>
                        <p className="card-desc">{b.description}</p>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                            <span className="badge" style={{ background: b.active ? "#e6ffef" : "#fee2e2", color: b.active ? "#065f46" : "#991b1b" }}>
                                {b.active ? "Activo" : "Inactivo"}
                            </span>
                            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                                <button onClick={() => onToggleActive(b)}>{b.active ? "Desactivar" : "Activar"}</button>
                                <button onClick={() => onEdit(b)}>Editar</button>
                                <button onClick={() => onDelete(b.id)}>Eliminar</button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}

