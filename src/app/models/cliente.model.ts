import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface Cliente {
    clienteid: string;
    nombre: string;
    email: string;
    telefono: string;
    ingreso: number;
    nacimiento: Date;
    foto: string;
}

export const clienteConverter = {
    toFirestore: (cliente: any) => {
        return <Cliente>{
            nombre: cliente.nombre,
            email: cliente.email,
            telefono: cliente.telefono,
            ingreso: cliente.ingreso,
            nacimiento: cliente.nacimiento,
            foto: cliente.foto,
        };
    },
    fromFirestore: (snapshot: any , options:any ) => {
        const data = snapshot.data(options);
        return <Cliente>{
            clienteid: snapshot.id,
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono,
            ingreso: data.ingreso,
            nacimiento: data.nacimiento.toDate(),
            foto: data.foto,
        }
    }
};