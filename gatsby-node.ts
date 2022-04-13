// @ts-ignore
import Cite from "citation-js";

// https://github.com/tetsuyakanda/gatsby-transformer-citationjs/blob/letsgo/src/gatsby-node.js
function format(entry: { [key: string]: any }) {
  delete entry["_graph"];
  return entry;
}

export async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  // file type check
  if (node.extension !== `bib`) {
    return;
  }

  const { createNode, createParentChildLink } = actions;

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
}
