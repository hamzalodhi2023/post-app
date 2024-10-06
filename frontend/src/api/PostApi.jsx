import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const GetPosts = () => {
  return api.get("/posts");
};

export const DeletePosts = (id) => {
  return api.delete(`/delete-post/${id}`);
};

export const CreatePosts = (title, news, creatorName, creatorEmail) => {
  return api.post("/new-post", {
    title,
    news,
    creatorName,
    creatorEmail,
  });
};

export const EditPosts = (title, news, creatorName, creatorEmail, id) => {
  return api.patch(`/update-post/${id}`, {
    title,
    news,
    creatorName,
    creatorEmail,
  });
};
