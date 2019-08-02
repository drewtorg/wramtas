import { Document, BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import React from "react";


export function richTextToComponents(richTextJson: Document, options?: Options): React.ReactNode {
  const opts = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
          let {file} = node.data.target.fields;
          return <img src={file["en-US"].url} className="rich-image"/>
        }
    }
  }

  if (options && options.renderNode) {
    opts.renderNode = {
      ...opts.renderNode,
    }
  }

  
  return documentToReactComponents(richTextJson, opts);
}