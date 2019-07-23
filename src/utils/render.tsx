import { Document, BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React from "react";


export function richTextToComponents(richTextJson: Document): React.ReactNode {
    return documentToReactComponents(richTextJson, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        console.log(node);
        let {file} = node.data.target.fields;
        return <img src={file["en-US"].url} className="rich-image"/>
      }
    }
  });
}