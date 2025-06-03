import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { fetchReposByUser, fetchSearchUser } from "../../services/fetchApi";
import Expand from "../../components/Expand";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [queryUser, setQueryUser] = useState("riza");
  const { users, loading, reposByUsername, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchSearchUser({ q: queryUser, per_page: 5 }));
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      users.forEach((user) => {
        dispatch(fetchReposByUser(user.login));
      });
    }
  }, [dispatch, users]);

  const handleSubmit = () => {};

  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="p-5 md:container">
      <div className="">
        <form action={handleSubmit} className="flex justify-between md:justify-end md:gap-5">
          <input
            type="text"
            name="search"
            value={queryUser}
            onChange={(e) => setQueryUser(e.target.value)}
            placeholder="Search GitHub username"
            className="border px-2 py-1 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Search
          </button>
        </form>
        <p className="text-gray-400 py-3">Showing user for "{queryUser}"</p>
      </div>
      <div>
        {users.map((user) => (
          <Expand key={user.login} title={user.login}>
            {(reposByUsername[user.login] || []).map((repo) => (
              <div
                key={repo.id}
                className="border p-2 rounded mb-2 shadow-sm bg-gray-50"
              >
                <div className="flex justify-between font-bold">
                  {repo.name} <span>⭐ {repo.stargazers_count}</span>
                </div>
                <p className="text-sm text-gray-600">{repo.description}</p>
              </div>
            ))}
          </Expand>
        ))}
      </div>
    </div>
  );
};

export default Home;
