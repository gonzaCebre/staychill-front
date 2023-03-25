import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePosts } from "../context/postContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post);
      }
    })(); //Esto es una funcion autoinvocada para poder usar el async-await dentro del useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return (
    <div>
      <div>
        <h3>Nuevo Post</h3>
        <Link to='/'>Cancelar</Link>
      </div>
      <div>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Title is required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize //Permite que al cambiar el estado del form se carguen los datos
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor='title'>Título</label>
              <Field name='title' placeholder='title' />
              <ErrorMessage component='p' name='title' />

              <label htmlFor='description'>Descripción</label>
              <Field
                name='description'
                placeholder='description'
                component='textarea'
              />
              <ErrorMessage component='p' name='description' />

              <label htmlFor='image'>Imagen</label>
              <input
                type='file'
                name='image'
                id=''
                onChange={(e) => setFieldValue("image", e.target.files[0])} //Metodo que viene desde formik, el primer parametro es la propiedad a la que le vas a pasar el valor, el segundo es el archivo en si, que como es una lista de files hay que pasarle el primer elemento de la lista que es el que contiene el file.
              />
              <ErrorMessage component='p' name='description' />

              <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? "Cargando..." : "Guardar"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
//'name' hace referencia al valor planteado dentro de initialValues
