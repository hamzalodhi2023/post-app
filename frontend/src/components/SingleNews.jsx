import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { SingleNewsdata } from "../api/PostApi";

function SingleNews() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getSingleNews = async () => {
    const res = await SingleNewsdata(id);
    setData(res.data);
  };

  useEffect(() => {
    getSingleNews();
  }, []);

  return (
    <div className="px-4 py-8 bg-slate-900 w-full h-screen flex justify-center items-center">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="my-5">
            <NavLink
              onClick={() => {
                navigate(-1);
              }}
              className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Back
            </NavLink>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">{data.title}</h1>
          <div className="flex items-center mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${data.creatorName}&background=random`}
              alt={data.creatorName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-white">{data.creatorName}</p>
              <p className="text-sm text-gray-400">{data.creatorEmail}</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed mb-6">{data.news}</p>
          <div className="text-sm text-gray-400">News ID: {data.id}</div>
        </div>
      </div>
    </div>
  );
}

export default SingleNews;
