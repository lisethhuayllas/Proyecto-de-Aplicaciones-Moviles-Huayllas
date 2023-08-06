export interface Publicacion {
    publicacionId: string;
    nombre_publicacion: string;
    comentario: string;
    archivo: string;
    fecha_publicacion: string;
    usuario: string;
    estado: 'publico' | 'privado'; 
    likes: number;
    dislikes: number;
  }

  export const publicacionConverter = {
    toFirestore: (publicacion: any) => {
        return <Publicacion>{
            nombre_publicacion: publicacion.nombre_publicacion,
            comentario: publicacion.comentario,
            archivo: publicacion.archivo,
            fecha_publicacion: publicacion.fecha_publicacion,
            usuario: publicacion.usuario,
            estado: publicacion.estado,
            likes: publicacion.likes,
            dislikes: publicacion.dislikes,
        };
    },

    fromFirestore: (snapshot: any, options: any) => {
        const data = snapshot.data(options);
        return <Publicacion>{
            publicacionId: snapshot.id,
            nombre_publicacion: data.nombre_publicacion,
            comentario: data.comentario,
            archivo: data.archivo,
            fecha_publicacion: data.fecha_publicacion,
            usuario: data.usuario,
            estado: data.estado,
            likes: data.likes,
            dislikes: data.dislikes,
        };
    }
};