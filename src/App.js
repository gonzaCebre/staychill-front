import { HomePage, PostForm, NotFound } from "./pages/index";
import { Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/postContext";
import { Toaster } from "react-hot-toast"; //Para mostrar alerts personalizados

function App() {
  return (
    //Todo lo que este por fuera de 'Routes' se renderiza siempre, independientemente de la ruta llamada

    <PostProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/new' element={<PostForm />} />
        <Route path='/posts/:id' element={<PostForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </PostProvider>
  );
}

export default App;
