import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Home() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            const q = query(collection(db, "bootcamps"), where("active", "==", true));
            const snap = await getDocs(q);
            setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        };
        run();
    }, []);

    if (loading) return <p>Cargando bootcamps…</p>;

    /*Mostrando bootscamps al ingresar al sitio web*/
    return (
        <>
            <div className="card card-hero">
                <h1 className="title">Aprende con Kodigo</h1>
                <p className="subtitle">Explora nuestros bootcamps y da el siguiente paso.</p>
            </div>

            <div className="grid">
                {items.map(b => (
                    <article className="card card-hover" key={b.id}>
                        <img className="card-img" src={b.image} alt={b.title} />
                        <h3 className="card-title">{b.title}</h3>
                        <p className="card-desc">{b.description}</p>
                        <small className="badge">{b.status}</small>
                    </article>
                ))}
            </div>
        </>
    );
}
