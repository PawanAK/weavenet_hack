import { useActiveAddress, useConnection } from "@arweave-wallet-kit/react";
import Header from "../components/Header";
import { createDataItemSigner, dryrun, message, result } from "@permaweb/aoconnect";
import { useEffect, useState } from "react";
import Editor from "../components/Editor";

const Create = () => {
    const { connected } = useConnection();
    const processId = "CB7fhKGaFWmkjj-IX7tXjfTwYaPBs0Q-SkLYtTzei9A";
    const [isFetching, setIsFetching] = useState(false);
    const [authorList, setAuthorList] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [name, setName] = useState("");

    const activeAddress = useActiveAddress();

    const syncAllAuthors = async () => {
        if (!connected) {
            return;
        }

        try {
            const res = await dryrun({
                process: processId,
                data: "",
                tags: [{ name: "Action", value: "AuthorList" }],
                anchor: "1234",
            });
            const filteredResult = res.Messages.map((message) => JSON.parse(message.Data));
            if (filteredResult[0]) {
                setAuthorList(filteredResult[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const registerAuthor = async () => {
        const res = await message({
            process: processId,
            tags: [{ name: "Action", value: "Register" }, { name: "Name", value: name }],
            data: "",
            signer: createDataItemSigner(window.arweaveWallet),
        });

        const registerResult = await result({
            process: processId,
            message: res,
        });

        if (registerResult.Messages[0].Data === "Successfully Registered." || registerResult.Messages[0].Data === "Already Registered") {
            setIsRegistered(true);
            syncAllAuthors();
        }
    };

    useEffect(() => {
        setIsFetching(true);
        syncAllAuthors();
        setIsFetching(false);
    }, [connected]);

    useEffect(() => {
        if (authorList.some((author) => author.PID === activeAddress)) {
            setIsRegistered(true);
        }
    }, [authorList, activeAddress]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background pt-16">
            <Header />
            <main className="flex flex-col items-center justify-center w-full max-w-4xl p-4">
                <h2 className="text-4xl font-bold mb-8 text-secondary">Create a Post</h2>
                <p className="text-lg mb-4 text-accent">Create a new post and share your thoughts with the community.</p>
                {isFetching && <div className="text-black">Fetching posts...</div>}
                <hr className="border-t w-full my-4" />
                {!isRegistered && (
                    <div className="flex flex-col items-center w-full">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mb-4 w-full border-2 border-border rounded p-2"
                        />
                        <button className="px-6 py-3 bg-primary text-white rounded-full text-lg mb-4 shadow-md hover:bg-primary-dark hover:shadow-lg transition duration-300" onClick={registerAuthor}>Register</button>
                    </div>
                )}
                {isRegistered && <Editor />}
            </main>
        </div>
    );
};

export default Create;
