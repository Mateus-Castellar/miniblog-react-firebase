import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/authContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validar urlImage
    try {
      new URL(image);
    } catch (error) {
      setFormError("a imagem precisa ser uma url");
    }

    //criar lista de tags (array)
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos do formulário");
    }

    if (formError) {
      return;
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    //redirecionar para a dashbaord do usuário
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar Post : {post.title}</h2>
          <p>Altere os dados de seu post, como desejar!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="título do post"
                required
              />
            </label>

            <label>
              <span>Url Imagem:</span>
              <input
                type="text"
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="imagem do post"
                required
              />
            </label>

            <p className={styles.preview_title}>Imagem Atual:</p>
            <img
              className={styles.preview_image}
              src={post.image}
              alt={post.title}
            />

            <label>
              <span>Conteudo:</span>
              <textarea
                name="body"
                required
                value={body}
                placeholder="insira o conteudo do post"
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="insira as tags separadas por virgulas"
                required
              />
            </label>

            {!response.loading && (
              <button className="btn">Atualizar Post</button>
            )}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
