import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useConnection } from "@arweave-wallet-kit/react";
import { dryrun } from "@permaweb/aoconnect";
import { Outlet } from "react-router-dom";

const View = () => {
  const { connected } = useConnection();
  const processId = "CB7fhKGaFWmkjj-IX7tXjfTwYaPBs0Q-SkLYtTzei9A";
  const [isFetching, setIsFetching] = useState(false);
  const [postList, setPostList] = useState([]);

  const syncAllPosts = async () => {
    if (!connected) {
      return;
    }

    try {
      const result = await dryrun({
        process: processId,
        data: "",
        tags: [{ name: "Action", value: "List" }],
        anchor: "1234",
      });
      const filteredResult = result.Messages.map((message) => JSON.parse(message.Data));
      setPostList(filteredResult[0].reverse()); // Reverse the array to show the most recent posts first
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    syncAllPosts();
    setIsFetching(false);
  }, [connected]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background pt-16">
      <Header />
      <main className="flex flex-col items-center justify-center w-full max-w-2xl p-4">
        <h2 className="text-4xl font-bold mb-8 text-secondary">Welcome to the View Page</h2>
        {isFetching && <div className="text-black">Fetching posts...</div>}
        <hr className="border-t w-full my-4" />
        {postList &&
          postList.map((post, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded mb-4 w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <a href={`/view/${post.ID}`} className="text-black no-underline">
                <h3 className="text-2xl font-bold text-secondary">{post.Title}</h3>
                <p className="text-gray-700">Author: {post.Author}</p>
                <p className="text-gray-700">Likes: {post.Likes}</p>
                <p className="text-gray-700">Comments: {post.Comments}</p>
              </a>
            </div>
          ))}
        <hr className="border-t w-full my-4" />
      </main>
      <Outlet />
    </div>
  );
};

export default View;
