// @ts-ignore
import Cite from "citation-js";
import { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";

// https://github.com/tetsuyakanda/gatsby-transformer-citationjs/blob/letsgo/src/gatsby-node.js
function format(entry: { [key: string]: any }) {
  delete entry["_graph"];
  return entry;
}

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  getNode,
}) => {
  const { createNode, createParentChildLink, createNodeField } = actions;

  if (node.extension === `bib`) {
    const content = await loadNodeContent(node);
    const parsedContent = new Cite(content).data;

    parsedContent
      .map(format)
      .map((d) => {
        return {
          ...d,
          id: createNodeId(`${node.id} ${d.id} >>> Citation`),
          children: [],
          parent: node.id,
          internal: {
            contentDigest: createContentDigest(d),
            type: `Citation`,
          },
        };
      })
      .forEach((data) => {
        createNode(data);
        createParentChildLink({ parent: node, child: data });
      });
  } else if (node.internal.type === "MarkdownRemark") {
    createNodeField({
      node,
      name: "slug",
      value: createFilePath({ node, getNode }),
    });
  }
};
