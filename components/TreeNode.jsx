import React from "react";
import Tree from "react-d3-tree";
import "./TreeNode.css";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const dummyData = {
  name: "OR",
  children: [
    {
      name: "OR",
      children: [
        {
          name: "AND",
          children: [
            {
              name: "AND",
              children: [
                {
                  name: "50",
                  attributes: {
                    final: "A > 50",
                  },
                  children: [
                    {
                      name: "A",
                      attributes: {
                        attribute: "A",
                      },
                    },
                    {
                      name: ">",
                      attributes: {
                        comparator: ">",
                      },
                    },
                  ],
                },
                {
                  name: "50",
                  attributes: {
                    final: "B < 50",
                  },
                  children: [
                    {
                      name: "B",
                      attributes: {
                        attribute: "B",
                      },
                    },
                    {
                      name: "<",
                      attributes: {
                        comparator: "<",
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "default",
            },
          ],
        },
        {
          name: "AND",
          children: [
            {
              name: "OR",
              children: [
                {
                  name: "30",
                  attributes: {
                    final: "A > 30",
                  },
                  children: [
                    {
                      name: "A",
                      attributes: {
                        attribute: "A",
                      },
                    },
                    {
                      name: ">",
                      attributes: {
                        comparator: ">",
                      },
                    },
                  ],
                },
                {
                  name: "40",
                  attributes: {
                    final: "B = 40",
                  },
                  children: [
                    {
                      name: "B",
                      attributes: {
                        attribute: "B",
                      },
                    },
                    {
                      name: "=",
                      attributes: {
                        comparator: "=",
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: "default",
            },
          ],
        },
      ],
    },
    {
      name: "AND",
      children: [
        {
          name: "AND",
          children: [
            {
              name: "30",
              attributes: {
                final: "A < 30",
              },
              children: [
                {
                  name: "A",
                  attributes: {
                    attribute: "A",
                  },
                },
                {
                  name: "<",
                  attributes: {
                    comparator: "<",
                  },
                },
              ],
            },
            {
              name: "40",
              attributes: {
                final: "B > 40",
              },
              children: [
                {
                  name: "B",
                  attributes: {
                    attribute: "B",
                  },
                },
                {
                  name: ">",
                  attributes: {
                    comparator: ">",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "default",
        },
      ],
    },
  ],
};

const nameToCol = (name) => {
  if (name == "AND") {
    return "red";
  } else if (name == "OR") {
    return "#34b7eb";
  } else if (!isNaN(name)) {
    return "#1be067";
  } else if (name == ">" || name == "<" || name == "=") {
    return "#8634eb";
  } else if (name == "default") {
    return "orange";
  } else {
    return "#e6ed18";
  }
};

const nameToType = (name) => {
  if (name == "AND" || name == "OR") {
    return "Operator";
  } else if (!isNaN(name)) {
    return "value";
  } else if (name == ">" || name == "<" || name == "=") {
    return "comparator";
  } else if (name == "default") {
    return "Always True";
  } else {
    return "attribute";
  }
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}) => (
  <g>
    <circle
      onClick={toggleNode}
      r={20}
      fill={`${nameToCol(nodeDatum.name)}`}
      stroke="white" // Set the border color to white
      strokeWidth={2}
    ></circle>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div
        className="flex justify-center items-center w-full h-20 "
        style={{ border: "1px solid black", backgroundColor: "#dedede" }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "-0.75em",
            color: "white",
          }}
        >
          {nodeDatum.name}
        </h3>
        <p
          style={{
            textAlign: "center",
            color: `${nameToCol(nodeDatum.name)} `,
            marginBottom: "-0.75em",
          }}
        >{`(${nameToType(nodeDatum.name)})`}</p>
        <p style={{ textAlign: "center", color: "black" }}>
          {nodeDatum?.attributes?.final ? nodeDatum?.attributes?.final : ""}
        </p>
        {nodeDatum.children && (
          <button style={{ width: "100%" }} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
        )}
      </div>
    </foreignObject>
  </g>
);

export default function OrgChartTree({ dataP = dummyData }) {
  const nodeSize = { x: 100, y: 100 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 10 };
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "100vw", height: "100vw" }}>
      <Tree
        data={dataP}
        orientation={"vertical"}
        initialDepth={0}
        translate={{ x: 750, y: 750 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        pathFunc={"straight"}
      />
    </div>
  );
}
