export interface Publicacion {
    publicacionId: string;
    nombre_publicacion: string;
    comentario: string;
    archivo: string;
    fecha_publicacion: string;
    usuario: string;
    nombre_usuario?: string; // Agrega el campo nombre_usuario con '?' para que sea opcional
  }

export const publicacionConverter = {
    toFirestore: (publicacion: any) => {
        return <Publicacion>{
            nombre_publicacion: publicacion.nombre_publicacion,
            comentario: publicacion.comentario,
            archivo: publicacion.archivo,
        };
    },
    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return <Publicacion>{
            publicacionId: snapshot.id,
            nombre_publicacion: data.nombre_publicacion,
            comentario: data.comentario,
            archivo: data.archivo,
        };
    }
};