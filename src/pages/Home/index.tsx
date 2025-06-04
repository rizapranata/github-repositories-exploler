import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchReposByUser, fetchSearchUser } from "../../services/fetchApi";
import Expand from "../../components/Expand";
import CircularProgress from "../../components/CircullarProgress";
import EmptyState from "../../components/EmptyState";
import { User } from "../../models/userModel";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [queryUser, setQueryUser] = useState("");
  const { users, loading, reposByUsername, error } = useSelector(
    (state: RootState) => state.user
  );

  const handleOnChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryUser(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        fetchSearchUser({ q: queryUser, per_page: 5 })
      ).unwrap();

      if (result.users?.length) {
        result.users.forEach((user: User) => {
          dispatch(fetchReposByUser(user.login));
        });
      }
    } catch (err) {
      console.error("Failed to search user:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex my-52 justify-center">
        <CircularProgress
          pathColor="blue"
          textColor="black"
          trailColor="grey"
        />
      </div>
    );
  }

  return (
    <div className="p-5 md:container">
      <form
        onSubmit={handleSubmit}
        className="flex justify-between md:justify-end md:gap-5"
      >
        <input
          type="text"
          name="search"
          value={queryUser}
          onChange={handleOnChangeQuery}
          placeholder="Enter username"
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Search
        </button>
      </form>

      {queryUser && (
        <p className="text-gray-400 py-3">Showing users for "{queryUser}"</p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {/* Handle jika user tidak ditemukan */}
      {!loading && queryUser && users.length === 0 && (
        <EmptyState message="No users found." />
      )}

      <div className="pt-3">
        {users.map((user) => {
          const repos = reposByUsername[user.login] || [];

          return (
            <Expand key={user.login} title={user.login}>
              {repos.length === 0 ? (
                <EmptyState message="This user has no public repositories." />
              ) : (
                repos.map((repo) => (
                  <div
                    key={repo.id}
                    className="border p-2 rounded mb-2 shadow-sm bg-gray-50"
                  >
                    <div className="flex justify-between font-bold">
                      {repo.name} <span>⭐ {repo.stargazers_count}</span>
                    </div>
                    <p className="text-sm text-gray-600">{repo.description}</p>
                  </div>
                ))
              )}
            </Expand>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
