import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Dashboard() {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    /*Hace un mapeo de los bootcamps en nuestra base de firebase*/
    useEffect(() => {
        const run = async () => {
            const q = query(collection(db, "bootcamps"), where("active", "==", true));
            const snap = await getDocs(q);
            setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        run();
    }, []);

    /*Mostrar los bootcamps que estan activos en el sistema*/
    return (
        <>
            <div className="card card-hero">
                <h2 className="title">¡Hola, {user?.displayName || user?.email}!</h2>
                <p className="subtitle">Este es tu panel. Explora los bootcamps disponibles.</p>
            </div>

            <h3 className="section-title">Bootcamps disponibles</h3>
            <div className="grid">
                {items.map(b => (
                    <article className="card card-hover" key={b.id}>
                        <img className="card-img" src={b.image} alt={b.title} />
                        <h4 className="card-title">{b.title}</h4>
                        <p className="card-desc">{b.description}</p>
                        <small className="badge">{b.status}</small>
                    </article>
                ))}
            </div>
        </>
    );
}

