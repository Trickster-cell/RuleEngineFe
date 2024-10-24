import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RuleContext } from "../context/rules";
const TextInput = (props) => {
  const { jsonContent, setJsonContent } = props;

  const handleChange = (e) => {
    e.preventDefault();
    setJsonContent(e.target.value);
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevents default paste behavior
    const pastedText = e.clipboardData.getData("text"); // Get the pasted text

    try {
      const formattedJson = JSON.stringify(JSON.parse(pastedText), null, 2); // Auto-format the pasted JSON
      setJsonContent(formattedJson);
    } catch (err) {
      // If it's not valid JSON, just set the pasted text
      setJsonContent(pastedText);
    }
  };

  return (
    <div className="flex flex-col h-56 m-2" style={{ width: "50%" }}>
      <label
        htmlFor="message"
        className="h-1/4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Input a valid JSON
      </label>
      <textarea
        id="message"
        rows="8"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write a valid data json to validate..."
        value={jsonContent}
        onChange={handleChange}
        onPaste={handlePaste}
      ></textarea>
    </div>
  );
};

const FileInput = ({ setJsonContent }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if file is a .json or .txt
    if (
      file &&
      (file.type === "application/json" || file.type === "text/plain")
    ) {
      const reader = new FileReader();

      // Read file content
      reader.onload = (e) => {
        const text = e.target.result;

        try {
          // If the file is JSON, parse it
          const json = JSON.parse(text);
          // Format the JSON content and update the TextInput component
          setJsonContent(JSON.stringify(json, null, 2));
        } catch (error) {
          // If it's not a valid JSON, just display the text
          setJsonContent(text);
        }
      };

      // Read the file as text
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .json or .txt file.");
    }
  };

  return (
    <div className="flex items-center justify-center w-1/2">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JSON OR TXT
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept=".json, .txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
const EvaluateData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const host = import.meta.env.VITE_SERVER_URL || "https://ruleenginebackend-9sxx.onrender.com";


  const {
    ruleString,
    ruleId,
    ruleName,
    setRuleId,
    setRuleString,
    setRuleName,
  } = useContext(RuleContext);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // get rule details from the api

    console.log("Rule Name");
  }, []);

  const handlePaste = (event) => {
    event.preventDefault();

    // Get the pasted text from the clipboard
    const text = event.clipboardData.getData("text");

    try {
      // Try to parse the pasted text as JSON
      const json = JSON.parse(text);

      // Format the JSON with indentation
      const formattedJson = JSON.stringify(json, null, 2);

      // Insert the formatted JSON into the textarea
      event.target.value = formattedJson;
    } catch (e) {
      // If it's not valid JSON, just insert the plain text
      event.target.value = text;
    }
  };

  const [jsonContent, setJsonContent] = useState("");

  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const [final, setFinal] = useState(true);

  const evaluateData = async () => {
    try {
      console.log(jsonContent);
      const response = await fetch(
        `${host}/rule/evaluate?idx=${id}`,
        {
          method: "POST", // Use POST method
          headers: {
            "Content-Type": "application/json", // Specify the content type
            Accept: "application/json", // Set the Accept header
          },
          body: JSON.stringify(JSON.parse(jsonContent)), // Convert the JSON object to a string
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse JSON response
      setFinal(data);
      // console.log(data);
      // setRuleData(data.nodes); // Uncomment this line to set your state with the fetched data
    } catch (error) {
      console.log("Some error occurred", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChecked(false);

    try {
      // Try to parse the jsonContent to validate it
      JSON.parse(jsonContent);
      // If parsing is successful, handle valid JSON
      console.log("Valid JSON:", jsonContent);

      setLoading(true);
      await evaluateData();
      // setTimeout(4000)
      setLoading(false);
      setChecked(true);

      // Use setTimeout to delay execution of the next steps

      // Note: No further processing should be done outside the setTimeout block
    } catch (error) {
      // If parsing fails, handle the error (invalid JSON)
      console.error("Invalid JSON:", error);
      // Optionally, display an error message to the user
      alert("Please enter valid JSON.");
    }
  };

  

  


  return (
    <>
      <div className="absolute top-0 w-full flex justify-center">
        <h4 className="text-2xl absolute top-0 my-3 dark:text-white">
          {ruleName}
          <p className="text-xs dark:text-white">{ruleId}</p>
          <p className="text-3xl font-bold dark:text-white">{ruleString}</p>
        </h4>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-5 left-0 ml-2"
          onClick={goBack}
        >
          Back
        </button>
      </div>
      <div
        className="flex flex-col w-full justify-center items-center mx-4"
        style={{ marginTop: "10%" }}
      >
        <TextInput jsonContent={jsonContent} setJsonContent={setJsonContent} />
        <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Or upload a JSON
        </p>
        <FileInput setJsonContent={setJsonContent} />
        <div className="my-5">
          <button
            onClick={handleSubmit}
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 transition-opacity duration-1000 ease-in-out ${
              jsonContent.length === 0
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
            style={{
              visibility: jsonContent.length === 0 ? "hidden" : "visible",
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Evaluate Data
            </span>
          </button>
          <div class="flex items-center justify-center">
            {loading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            )}
            {!loading && checked && (
              <>
                {final ? (
                  <span class="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 my-2">
                    <svg
                      class="w-4 h-4 text-green-500 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Rule Passed
                  </span>
                ) : (
                  <span class="inline-flex items-center bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 my-2">
                    <svg
                      class="w-2 h-2 me-1 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M1.5 1.5l13 13m0-13l-13 13"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                    </svg>
                    Rule Failed
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EvaluateData;
