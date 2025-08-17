"use client";

import React from "react";
import Image from "next/image";

interface NotionBlock {
  type: string;
  text?: string;
  richText?: any[];
  imageUrl?: string;
  caption?: string;
  alt?: string;
  code?: string;
  language?: string;
  unsupported?: boolean;
  // Table properties
  tableWidth?: number;
  hasColumnHeader?: boolean;
  hasRowHeader?: boolean;
  rows?: {
    cells: string[][];
  }[];
}

interface NotionRendererProps {
  blocks: NotionBlock[];
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    
    // Load Twitter widgets script if tweet embeds exist
    if (
      typeof window !== 'undefined' &&
      !(window as typeof window & { twttr?: any }).twttr
    ) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.head.appendChild(script);
    }
  }, []);

  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading_1":
            return (
              <h1 key={i} className="text-3xl font-bold mb-6 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2">
                {block.text}
              </h1>
            );

          case "heading_2":
            return (
              <h2 key={i} className="text-2xl font-semibold mb-4 mt-6">
                {block.text}
              </h2>
            );

          case "heading_3":
            return (
              <h3 key={i} className="text-xl font-medium mb-3 mt-5">
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <div key={i} className="leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
                {block.text && (block.text.includes('tweet-embed') || block.text.includes('youtube-embed') || block.text.includes('reading-time') || block.text.includes('table-of-contents') || block.text.includes('share-section') || block.text.includes('comment-section') || block.text.includes('image-gallery')) ? (
                  isClient ? (
                    <div className="flex w-full justify-center" dangerouslySetInnerHTML={{ __html: block.text }} />
                  ) : (
                    <div className="embed-placeholder">Loading content...</div>
                  )
                ) : block.text && block.text.includes('<') ? (
                  <span dangerouslySetInnerHTML={{ __html: block.text }} />
                ) : (
                  <p>{block.text}</p>
                )}
              </div>
            );

          case "bulleted_list_item":
            return (
              <div key={i} className="flex items-start mb-2">
                <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span className="leading-relaxed text-gray-700 dark:text-gray-300">{block.text}</span>
              </div>
            );

          case "numbered_list_item":
            return (
              <div key={i} className="flex items-start mb-2">
                <span className="inline-block w-6 h-6 bg-blue-500 text-white text-sm rounded-full mr-3 text-center leading-6 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="leading-relaxed text-gray-700 dark:text-gray-300">{block.text}</span>
              </div>
            );

          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                <p className="italic text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {block.text}
                </p>
              </blockquote>
            );

          case "code":
            return (
              <pre key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 border">
                <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                  {block.code}
                </code>
              </pre>
            );

          case "table":
            return (
              <div key={i} className="overflow-x-auto my-6">
                <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg">
                  <tbody>
                    {block.rows?.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex === 0 && block.hasColumnHeader ? "bg-gray-50 dark:bg-gray-800 font-semibold" : ""}>
                        {row.cells.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm">
                            {cell.join(' ')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "image":
            return (
              <figure key={i} className="flex flex-col justify-center items-center my-8">
                <div className="relative w-fit overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Image
                    src={block.imageUrl || '/placeholder.jpg'}
                    alt={block.alt || 'Image'}
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                    unoptimized
                  />
                  {block.caption && (
                    <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400 mt-3 italic">
                      {block.caption}
                    </figcaption>
                  )}
                </div>
              </figure>
            );

          default:
            return (
              <div key={i} className="my-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-700 dark:text-yellow-300 italic">
                  ⚠️ Unsupported block type: {block.type}
                </p>
              </div>
            );
        }
      })}
    </div>
  );
}