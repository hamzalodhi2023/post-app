import { useEffect, useState } from "react";
import { CreatePosts, DeletePosts, EditPosts, GetPosts } from "../api/PostApi";

function Posts() {
  const [formDis, setFormDis] = useState(false);
  const [res, setRes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState();
  const [formTitle, setFormTitle] = useState("Add New Post");
  const [search, setSearch] = useState("");

  // for search data
  const searchData = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  //   for get post data
  const getPostsData = async () => {
    const res = await GetPosts();
    setPosts(res.data);
  };

  // for delete data
  const deletePostsData = async (id) => {
    const res = await DeletePosts(id);
    setRes(res.data);
  };

  useEffect(() => {
    getPostsData();
  }, [res]);

  //   create post handleSubmit function
  const [inputValues, setInputValues] = useState({
    title: "",
    news: "",
    creatorName: "",
    creatorEmail: "",
  });
  const handleSubmit = async () => {
    const { title, news, creatorName, creatorEmail } = inputValues;
    const res = await CreatePosts(title, news, creatorName, creatorEmail);
    setRes(res.data);
    setInputValues({
      title: "",
      news: "",
      creatorName: "",
      creatorEmail: "",
    });
    setFormDis(false);
  };

  const handleEdit = async () => {
    const { title, news, creatorName, creatorEmail } = inputValues;
    const res = await EditPosts(title, news, creatorName, creatorEmail, postId);
    setRes(res.data);
    setInputValues({
      title: "",
      news: "",
      creatorName: "",
      creatorEmail: "",
    });
    setFormDis(false);
  };

  //   for block the page scroll scroll
  useEffect(() => {
    if (formDis) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [formDis]);

  return (
    <>
      {/* post add form */}
      <div
        className={`fixed ${
          formDis === false ? "hidden" : "flex"
        } inset-0 bg-gray-900 bg-opacity-75 items-center justify-center z-50`}
      >
        <div className="bg-gray-800 p-4 rounded-lg w-full max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{formTitle}</h2>
            <button
              onClick={() => {
                setFormDis(false);
                setInputValues({
                  title: "",
                  news: "",
                  creatorName: "",
                  creatorEmail: "",
                });
              }}
              className="text-gray-400 hover:text-white "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formTitle === "Edit Post" ? handleEdit() : handleSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <input
                required
                type="text"
                name="title"
                value={inputValues.title}
                onChange={(e) => {
                  setInputValues({ ...inputValues, title: e.target.value });
                }}
                placeholder="Post Title"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <textarea
                required
                name="news"
                value={inputValues.news}
                onChange={(e) => {
                  setInputValues({
                    ...inputValues,
                    news: e.target.value,
                  });
                }}
                placeholder="Post Content"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 outline-none focus:border-blue-500 h-32 resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <input
                  required
                  type="text"
                  name="creatorName"
                  value={inputValues.creatorName}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      creatorName: e.target.value,
                    });
                  }}
                  placeholder="Creator Name"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 outline-none focus:border-blue-500"
                />
              </div>

              <div className="w-full sm:w-1/2">
                <input
                  required
                  type="email"
                  name="creatorEmail"
                  value={inputValues.creatorEmail}
                  onChange={(e) => {
                    setInputValues({
                      ...inputValues,
                      creatorEmail: e.target.value,
                    });
                  }}
                  placeholder="Creator Email"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              {formTitle}
            </button>
          </form>
        </div>
      </div>
      {/* add post button and search bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-900">
        <div className="flex w-full sm:w-auto mb-4 sm:mb-0">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search posts..."
            className="bg-gray-800 outline-none text-white border border-gray-700 rounded-l px-4 py-2 w-full sm:w-64"
          />
        </div>
        <button
          onClick={() => {
            setFormDis(true);
            setFormTitle("Add New Post");
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
        >
          Add New Post
        </button>
      </div>
      {/* posts */}
      <div className="flex w-full flex-wrap gap-5 justify-evenly min-h-screen bg-gray-900">
        {searchData.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
          >
            <div className="p-4 border-b border-gray-700 w-full h-full flex justify-between flex-col">
              {/* post content main div */}
              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Id:<b> {post.id} </b>
                </p>
                <h2 className="text-xl font-semibold mb-2 truncate text-white">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.news}</p>
                <p className="text-sm text-gray-400 mb-2">
                  Creator: <b>{post.creatorName}</b>
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Email: <b>{post.creatorEmail}</b>
                </p>
              </div>
              {/* button main div */}
              <div>
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <button
                    onClick={() => {
                      setPostId(post.id);
                      setFormDis(true);
                      setFormTitle("Edit Post");
                      setInputValues({
                        title: post.title,
                        news: post.news,
                        creatorName: post.creatorName,
                        creatorEmail: post.creatorEmail,
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => deletePostsData(post.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View Post
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default Posts;
