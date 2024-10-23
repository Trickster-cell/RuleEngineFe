import React, { useEffect, useState } from "react";
import { Tree } from "react-d3-tree";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const CreateRule = () => {
  const [name, setName] = useState("");

  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    setName(e.target.value);
  };

  const createRule = async () => {
    try {
      // Prepare the rule data
      const ruleData = {
        rule: getString(tree), // Assuming getString(tree) returns the desired rule data
        name: name.length > 0 ? name : v4(), // If name is empty, use a generated UUID
      };

      const response = await fetch(`https://ruleenginebackend-9sxx.onrender.com/rule/add-rule`, {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Specify the content type
          Accept: "application/json", // Set the Accept header
        },
        body: JSON.stringify(ruleData), // Convert the ruleData object to a JSON string
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success("Rule Created Successfully");

      navigate("/");

      // const data = await response.json(); // Parse JSON response
      // console.log(data);
      // Uncomment the next line to set your state with the fetched data
      // setRuleData(data.nodes);
    } catch (error) {
      toast.error("Some error occurred");
      console.log("Some error occurred", error);
    }
  };

  const handleCreateRule = async (e) => {
    e.preventDefault();
    // console.log("name:", );
    // console.log("ruleString:", getString(tree));
    await createRule();
  };

  const CheckButton = () => {
    return (
      <button
        type="button"
        className={`w-3/12 h-10 focus:outline-none ${"text-white"}  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5
           "bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          } 
            "cursor-pointer" `}
        onClick={handleCreateRule}
      >
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    );
  };

  const TypeInput = (props) => {
    const { onChangeType } = props;
    return (
      <form class="w-40 mx-auto">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Type
        </label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          text-center"
          onChange={onChangeType}
        >
          <option selected value="DE">
            Default
          </option>
          <option value="OP">Operator (AND,OR)</option>
          <option value="CO">Comparator (&gt;, &lt;, =)</option>
          <option value="VA">Value</option>
          <option value="AT">Attribute</option>
        </select>
      </form>
    );
  };

  const OperatorInput = (props) => {
    const { setValue } = props;
    return (
      <form class="max-w-sm mx-auto">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Operator:
        </label>
        <select
          id="countries"
          onChange={(e) => setValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center "
        >
          <option selected>Choose an Operator</option>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
          <option value="XOR">XOR</option>
        </select>
      </form>
    );
  };

  const ComparatorInput = (props) => {
    const { setValue } = props;
    return (
      <form class="max-w-sm mx-auto">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Comparator:
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center "
          onChange={(e) => setValue(e.target.value)}
        >
          <option selected>Choose a Comparator</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value="=">=</option>
          <option value=">=">&gt;=</option>
          <option value="<=">&lt;=</option>
        </select>
      </form>
    );
  };

  const ruleData = ["rule1", "rule2", "rule3"];

  const RuleInput = (props) => {
    const { setValue } = props;
    return (
      <form class="max-w-sm mx-auto">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Rule:
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center "
          onChange={(e) => setValue(e.target.value)}
        >
          <option selected>Choose a Rule</option>
          {ruleData.map((rule) => {
            return <option value={rule}>{rule}</option>;
          })}
        </select>
      </form>
    );
  };

  const ValueInput = (props) => {
    const { setValue } = props;

    return (
      <form class="max-w-sm mx-auto">
        <label
          for="number-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Value:
        </label>
        <input
          type="text"
          id="number-input"
          onChange={(e) => setValue(e.target.value)}
          aria-describedby="helper-text-explanation"
          class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="90210"
          required
        />
      </form>
    );
  };

  const AttributeInput = (props) => {
    const { setValue } = props;
    return (
      <form class="max-w-sm mx-auto">
        <label
          for="number-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Attribute:
        </label>
        <input
          type="text"
          id="number-input"
          onChange={(e) => setValue(e.target.value)}
          aria-describedby="helper-text-explanation"
          class="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Salary"
          required
        />
      </form>
    );
  };

  const DefaultVal = () => {
    return (
      <div className="mx-auto w-2/6">
        <label
          for="number-input"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Default
        </label>
        <p className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          True
        </p>
      </div>
    );
  };

  const LevelInput = () => {
    const [type, setType] = useState("DE");
    const [leftChild, setLeftChild] = useState(false);
    const [rightChild, setRightChild] = useState(false);

    const onChangeType = (e) => {
      e.preventDefault();
      const newType = e.target.value; // Get the new type from the event
      setType(newType);

      if (
        newType !== "DE" &&
        newType !== "" &&
        newType !== "VA" &&
        newType !== "AT"
      ) {
        setLeftChild(true);
        setRightChild(true);
      } else {
        setLeftChild(false);
        setRightChild(false);
      }
    };

    return (
      <div className="my-5 mx-5">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="container">
            <TypeInput onChangeType={onChangeType} />
            {type === "OP" && <OperatorInput />}
            {type === "AT" && <AttributeInput />}
            {type === "CO" && <ComparatorInput />}
            {type === "VA" && <ValueInput />}
            {(type === "DE" || type === "") && <DefaultVal />}
          </div>
        </div>
      </div>
    );
  };

  const RuleMaker = () => {
    return (
      <div
        className="max-h-screen w-full overflow-y-auto" // Limit height and make it scrollable
        style={{ maxHeight: "80vh" }} // Optional: Adjust height as needed
      >
        <LevelInput />
      </div>
    );
  };

  const bfs = (id, tree, nodeL, nodeR, elementType, newName) => {
    const queue = [];
    const newTree = JSON.parse(JSON.stringify(tree)); // Deep copy the tree to avoid mutation
    queue.unshift(newTree);

    while (queue.length > 0) {
      const curNode = queue.pop();

      if (curNode.attributes?.id === id) {
        curNode.children = [];
        if (
          elementType != "VA" &&
          elementType != "AT" &&
          elementType !== "RL"
        ) {
          curNode.children.push(nodeL);
          curNode.children.push(nodeR);
        }
        curNode.name = newName;
        curNode.attributes.type = elementType;

        return newTree; // Return the modified copy of the tree
      }

      const len = curNode.children.length;

      for (let i = 0; i < len; i++) {
        queue.unshift(curNode.children[i]);
      }
    }

    return newTree; // Return the newTree even if the node was not found
  };

  const dfsHeight = (node) => {
    // Base case: if the node is null or doesn't exist, return -1 (or 0 based on your height definition)
    if (!node) {
      return -1; // Return -1 if considering height from 0 for the leaf nodes
    }

    // If the node has no children, its height is 0
    if (node.children.length === 0) {
      return 0;
    }

    // Initialize the max height variable
    let maxHeight = 0;

    // Iterate over each child and recursively find their height
    for (const child of node.children) {
      const childHeight = dfsHeight(child);
      maxHeight = Math.max(maxHeight, childHeight);
    }

    // Add 1 to account for the current node's height
    return maxHeight + 1;
  };

  const orgChart = {
    name: "Default",
  };

  const [tree, setTree] = useState({
    name: "Default",
    attributes: {
      id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f",
      type: "Default",
    },
    children: [],
  });

  const [node, setNode] = useState(undefined);

  const [finalString, setFinalString] = useState("True");

  const getString = (treeNode) => {
    if (treeNode.name == "Default") {
      return "True";
    }
    var thisString = ` ${treeNode.name} `;
    var leftString =
      treeNode.children.length > 0 ? getString(treeNode.children[0]) : "";
    var rightString =
      treeNode.children.length > 1 ? getString(treeNode.children[1]) : "";

    var leftEx =
      treeNode.attributes.type != "VA" && treeNode.attributes.type != "AT"
        ? "("
        : "";
    var rgtEx =
      treeNode.attributes.type != "VA" && treeNode.attributes.type != "AT"
        ? ")"
        : "";
    return leftEx + leftString + thisString + rightString + rgtEx;
  };

  const close = () => setNode(undefined);

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }) => (
    <>
      <g>
        <circle
          onClick={() => {
            toggleNode();
            handleNodeClick(nodeDatum);
          }}
          r={20}
          fill="red"
        ></circle>
        {/* `foreignObject` requires width & height to be explicitly set. */}
        <foreignObject {...foreignObjectProps}>
          <div
            className="flex flex-row justify-center items-center"
            style={{
              border: "1px solid black",
              backgroundColor: "#dedede",
              minHeight: "40%",
            }}
          >
            <div className="flex flex-row h-full items-center justify-center">
              <div className="mx-4 flex h-full flex-col items-center justify-center">
                <h3 style={{ textAlign: "center", marginBottom: "-0.75em" }}>
                  {nodeDatum.name}
                </h3>
                {nodeDatum.children && nodeDatum.children.length > 0 && (
                  <button
                    className="my-2"
                    style={{ width: "100%" }}
                    onClick={toggleNode}
                  >
                    {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
                  </button>
                )}
              </div>
              <div className="mx-4 h-full bg-blue-500">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    handleNodeClick(nodeDatum);
                  }}
                  class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </foreignObject>
      </g>
    </>
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const AddModal = () => {
    const [elementType, setElementType] = useState("DE");
    const [value, setValue] = useState("Default");
    const onChangeElementType = (e) => {
      e.preventDefault();
      const newType = e.target.value; // Get the new type from the event
      setElementType(newType);
    };

    const handleSubmit = async () => {
      // console.log(node)
      const newNodeLeft = {
        name: "Default",
        attributes: {
          id: v4(),
          type: elementType,
        },
        children: [],
      };

      const newNodeRight = {
        name: "Default",
        attributes: {
          id: v4(),
        },
        children: [],
      };

      var newTree = bfs(
        node?.attributes?.id,
        tree,
        newNodeLeft,
        newNodeRight,
        elementType,
        value
      ); // Call bfs synchronously

      console.log(getString(newTree));
      if (newTree) {
        setTree(newTree); // Update state with the new tree
        setDepth(dfsHeight(newTree));
        // var depth = dfsHeight(newTree);
        // console.log(depth);
      }

      setNode(undefined); // Reset node state
    };

    return (
      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        style={{ position: "absolute", top: "15%", left: "35%" }}
        className={`${
          isModalOpen ? "" : "hidden"
        }  overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Choose Element
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => {
                  setIsModalOpen(false);
                  setNode(undefined);
                }}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <form class="p-4 md:p-5">
              <div class="grid gap-4 mb-4 grid-cols-2">
                <div class="col-span-2 sm:col-span-1">
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type
                  </label>
                  <select
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={onChangeElementType}
                  >
                    <option selected value="DE">
                      Default
                    </option>
                    <option value="OP">Operator (AND,OR, XOR)</option>
                    <option value="CO">
                      Comparator (&gt;, &lt;, =,&gt;=, &lt;=)
                    </option>
                    <option value="VA">Value</option>
                    <option value="AT">Attribute</option>
                    {/* <option value="RL">Rule</option> */}
                  </select>
                </div>
                <div class="col-span-2 sm:col-span-1">
                  {/* <select
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option selected="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select> */}
                  {elementType === "OP" && (
                    <OperatorInput setValue={setValue} />
                  )}
                  {elementType === "AT" && (
                    <AttributeInput setValue={setValue} />
                  )}
                  {elementType === "CO" && (
                    <ComparatorInput setValue={setValue} />
                  )}
                  {elementType === "VA" && <ValueInput setValue={setValue} />}
                  {/* {elementType === "RL" && <RuleInput setValue={setValue} />} */}
                  {(elementType === "DE" || elementType === "") && (
                    <DefaultVal setValue={setValue} />
                  )}
                </div>
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e);
                  handleSubmit();
                  setIsModalOpen(false);
                }}
                class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  class="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Add Element
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const nodeSize = { x: "15em", y: "15em" };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 10 };

  const handleNodeClick = (dataum) => {
    console.log(dataum);
    setNode(dataum);
  };

  const [stringMode, setStringMode] = useState(false);

  const handleToggle = () => {
    setStringMode(!stringMode);
  };

  const goBack = () => {
    navigate(-1);
  };

  const [depth, setDepth] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const calculateCenter = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 4;
    setTranslate({ x: centerX, y: centerY });
  };
  useEffect(() => {
    calculateCenter(); // On mount
    window.addEventListener("resize", calculateCenter); // Recalculate on window resize

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateCenter);
    };
  }, []);

  const TreeComponent = () => {
    return (
      <div>
        <h4 className="text-2xl dark:text-white">Equivalent String</h4>
        <h3 className="text-4xl font-bold dark:text-white">
          {getString(tree)}
        </h3>
        {/* <RuleMaker /> */}
        <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
          <Tree
            data={tree}
            orientation={"vertical"}
            transitionDuration={500}
            translate={translate}
            initialDepth={depth}
            pathFunc={"straight"}
            separation={{ siblings: 2, nonSiblings: 2 }}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps,
              })
            }
          />
        </div>
      </div>
    );
  };

  const RuleWritingGuidelines = () => {
    return (
      <div className="p-4 text-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Rule Writing Guidelines</h2>
        <div className="flex flex-col justify-start items-start w-full">
          <p>To create valid rule strings, follow these guidelines:</p>

          <ol className="list-decimal list-inside mb-4 text-left">
            <li>
              <strong>Use Attributes:</strong> Include predefined fields:
              <span className="font-mono">
                {" "}
                age, salary, experience, department.
              </span>
            </li>
            <li>
              <strong className="mr-2">Enclose Comparisons:</strong>

              <span>
                Each simple comparison must be enclosed in parentheses:
              </span>
              <span className="ml-6 font-mono">(age &gt; 30)</span>
            </li>
            <li>
              <strong>Use Comparison Operators:</strong>
              <div style={{ marginLeft: "2em" }}>
                <ul className="list-disc list-inside ml-4">
                  <li>Numeric comparisons: &gt;, &lt;, =.</li>
                  <li>
                    String comparisons: = (values must be enclosed in single{" "}
                    {/* <span className="font-mono">'</span> or double{" "} */}
                    <span className="font-mono">'</span> quotes).
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <strong>Combine Conditions:</strong> Use logical operators to
              connect conditions: <span className="font-mono">AND, OR.</span>
            </li>
            <li>
              <div className="inline-flex gap-1">
                <strong>Group Conditions:</strong>{" "}
                <div>
                  Use additional parentheses for grouping multiple conditions:
                  <br />
                  <span className="font-mono">
                    (((age &gt; 30) AND (department = 'Sales')) OR (salary &gt;
                    50000)).
                  </span>
                </div>
              </div>
            </li>
            <li>
              <strong>Value Types:</strong>
              <div style={{ marginLeft: "2em" }}>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Ensure numeric fields use numbers:{" "}
                    <span className="font-mono">(age &gt; 30).</span>
                  </li>
                  <li>
                    Ensure string fields use quotes:{" "}
                    <span className="font-mono">(department = 'Sales').</span>
                  </li>
                </ul>
              </div>
            </li>
          </ol>

          <h3 className="text-lg font-semibold mb-2">Examples:</h3>
          <p>
            <span className="font-mono">(age &gt; 30)</span>
          </p>
          <p>
            <span className="font-mono">
              (((age &gt; 30) AND (department = 'Sales')) OR (salary &gt;
              50000))
            </span>
          </p>
        </div>
      </div>
    );
  };

  const StringComponent = () => {
    const [ruleString, setRuleString] = useState("");

    const handleStringChange = (e) => {
      e.preventDefault();
      setRuleString(e.target.value);
    };

    function validateRuleString(rule) {
      if (!rule || !rule.trim()) return false;
      rule = rule.trim();
      
      if (!rule.startsWith('(') || !rule.endsWith(')')) return false;
  
      function tokenize(str) {
          const tokens = [];
          let current = '';
          let inQuote = false;
          
          for (let i = 0; i < str.length; i++) {
              const char = str[i];
              
              if (char === "'" && str[i - 1] !== '\\') {
                  inQuote = !inQuote;
                  current += char;
                  continue;
              }
              
              if (inQuote) {
                  current += char;
                  continue;
              }
              
              if (char === ' ') {
                  if (current) tokens.push(current);
                  current = '';
                  continue;
              }
              
              if (char === '(' || char === ')') {
                  if (current) tokens.push(current);
                  tokens.push(char);
                  current = '';
                  continue;
              }
              
              current += char;
          }
          
          if (current) tokens.push(current);
          return tokens;
      }
  
      function isValidComparison(tokens, startIndex) {
          // Need at least 3 tokens for a valid comparison (attribute, operator, value)
          if (startIndex + 2 >= tokens.length) return { valid: false };
          
          const attribute = tokens[startIndex];
          const operator = tokens[startIndex + 1];
          const value = tokens[startIndex + 2];
  
          // Check if attribute contains only valid characters
          if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(attribute)) return { valid: false };
          
          // Check if operator is valid
          if (!['>', '<', '=', '>=', '<=', '!='].includes(operator)) return { valid: false };
          
          // For = and !=, value must be quoted if not a number
          if ((operator === '=' || operator === '!=')) {
              if (!value.startsWith("'") && isNaN(value)) return { valid: false };
          }
          
          // For other operators, value must be numeric
          if (['>', '<', '>=', '<='].includes(operator) && isNaN(value)) return { valid: false };
  
          return { valid: true, tokensUsed: 3 };
      }
  
      function validateStructure(tokens) {
          let stack = [];
          let i = 0;
          
          while (i < tokens.length) {
              const token = tokens[i];
  
              if (token === '(') {
                  stack.push(token);
                  i++;
                  continue;
              }
              
              if (token === ')') {
                  if (stack.length === 0) return false;
                  stack.pop();
                  i++;
                  continue;
              }
  
              if (['AND', 'OR', 'XOR'].includes(token)) {
                  i++;
                  continue;
              }
  
              // At this point, we should be at the start of a comparison
              // and inside parentheses
              if (stack.length === 0) return false;
              
              const comparisonResult = isValidComparison(tokens, i);
              if (!comparisonResult.valid) return false;
              
              i += comparisonResult.tokensUsed;
          }
  
          return stack.length === 0;
      }
  
      try {
          const tokens = tokenize(rule);
          return validateStructure(tokens);
      } catch {
          return false;
      }
  }

    const createRuleString = async () => {
      try {
        // Prepare the rule data
        const ruleData = {
          rule: ruleString, // Assuming getString(tree) returns the desired rule data
          name: name.length > 0 ? name : v4(), // If name is empty, use a generated UUID
        };

        const response = await fetch(`https://ruleenginebackend-9sxx.onrender.com/rule/add-rule`, {
          method: "POST", // Use POST method
          headers: {
            "Content-Type": "application/json", // Specify the content type
            Accept: "application/json", // Set the Accept header
          },
          body: JSON.stringify(ruleData), // Convert the ruleData object to a JSON string
        });

        // console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON response
        toast.success("Rule Created Successfully");
        navigate("/");
        // console.log(data);
        // Uncomment the next line to set your state with the fetched data
        // setRuleData(data.nodes);
      } catch (error) {
        toast.error("Some error occured");

        console.log("Some error occurred", error);
      }
    };

    const handeCreate = async (e) => {
      e.preventDefault();
      await createRuleString();
    };

    const [validString, setValidString] = useState(false);

    useEffect(() => {
      setValidString(validateRuleString(ruleString));
      // console.log(validateRuleString(ruleString));
    }, [ruleString]);

    return (
      <>
        <div className="mb-6" style={{ width: "70%" }}>
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter the Rule String
          </label>
          <textarea
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
            value={ruleString}
            placeholder="((((age > 30) AND (department = 'Sales')) OR ((age < 25) AND (department = 'Marketing'))) AND ((salary > 50000) OR (experience > 5)))"
            onChange={handleStringChange}
          />
        </div>
        <div>
          <button
            type="button"
            className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  ${
              !validString
                ? "cursor-not-allowed bg-green-300 hover:bg-green-400 focus:ring-green-500"
                : "bg-green-600 hover:bg-green-700 focus:ring-green-800"
            }`}
            onClick={handeCreate}
          >
            Create
          </button>
          <RuleWritingGuidelines />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <button
        type="button"
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 absolute top-5 left-0 ml-2"
        onClick={goBack}
      >
        Back
      </button>
      <div className="flex flex-row w-1/2 items-center justify-center gap-4">
        <div className="mb-6 w-full">
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Rule Name
          </label>
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
            value={name}
            placeholder="Test Rule"
            onChange={handleChange}
          />
        </div>
        {!stringMode && <CheckButton />}
      </div>
      <div className="flex flex-col gap-5">
        <label className="inline-flex flex-col items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={stringMode}
            onChange={handleToggle} // Trigger toggle state change
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {stringMode ? "String Mode" : "Visual Mode"}
          </span>
        </label>

        <div
          className="inline-flex flex-col justify-start items-center"
          style={{ height: "100vh", width: "100vw" }}
        >
          {!stringMode ? <TreeComponent /> : <StringComponent />}
        </div>
      </div>
      <AddModal />
    </div>
  );
};

export default CreateRule;
