import React from 'react';

interface RichText {
  type: string;
  text?: {
    content: string;
    link?: { url: string } | null;
  };
  annotations?: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
}

interface NotionBlock {
  id: string;
  type: string;
  [key: string]: unknown;
}

interface NotionBlockRendererProps {
  blocks: NotionBlock[];
}

function renderRichText(richTextArray: RichText[] | undefined): React.ReactNode {
  if (!richTextArray || richTextArray.length === 0) {
    return null;
  }

  return richTextArray.map((text, index) => {
    let content: React.ReactNode = text.plain_text;
    const annotations = text.annotations;

    if (annotations?.code) {
      content = (
        <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-primary">
          {content}
        </code>
      );
    }
    if (annotations?.bold) {
      content = <strong className="font-semibold">{content}</strong>;
    }
    if (annotations?.italic) {
      content = <em>{content}</em>;
    }
    if (annotations?.strikethrough) {
      content = <s>{content}</s>;
    }
    if (annotations?.underline) {
      content = <u>{content}</u>;
    }
    if (text.href) {
      content = (
        <a
          href={text.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {content}
        </a>
      );
    }

    return <React.Fragment key={index}>{content}</React.Fragment>;
  });
}

function NotionBlock({ block }: { block: NotionBlock }): React.ReactNode {
  const { type } = block;
  const value = block[type] as Record<string, unknown>;

  switch (type) {
    case 'paragraph':
      return (
        <p className="mb-4 text-muted-foreground leading-relaxed">
          {renderRichText(value?.rich_text as RichText[])}
        </p>
      );

    case 'heading_1':
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">
          {renderRichText(value?.rich_text as RichText[])}
        </h1>
      );

    case 'heading_2':
      return (
        <h2 className="text-2xl font-bold mt-6 mb-3 text-foreground">
          {renderRichText(value?.rich_text as RichText[])}
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="text-xl font-semibold mt-5 mb-2 text-foreground">
          {renderRichText(value?.rich_text as RichText[])}
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <li className="ml-6 mb-2 text-muted-foreground list-disc">
          {renderRichText(value?.rich_text as RichText[])}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li className="ml-6 mb-2 text-muted-foreground list-decimal">
          {renderRichText(value?.rich_text as RichText[])}
        </li>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
          {renderRichText(value?.rich_text as RichText[])}
        </blockquote>
      );

    case 'code':
      return (
        <pre className="bg-secondary rounded-lg p-4 my-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground">
            {renderRichText(value?.rich_text as RichText[])}
          </code>
        </pre>
      );

    case 'divider':
      return <hr className="my-8 border-border" />;

    case 'image': {
      const imageValue = value as {
        type: string;
        file?: { url: string };
        external?: { url: string };
        caption?: RichText[];
      };
      const src = imageValue.type === 'file'
        ? imageValue.file?.url
        : imageValue.external?.url;
      const caption = imageValue.caption;

      return (
        <figure className="my-6">
          <img
            src={src}
            alt={caption?.[0]?.plain_text || 'Article image'}
            className="rounded-lg max-w-full h-auto"
          />
          {caption && caption.length > 0 && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">
              {renderRichText(caption)}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'callout': {
      const calloutValue = value as {
        icon?: { emoji?: string };
        rich_text?: RichText[];
      };
      return (
        <div className="bg-secondary/50 border border-border rounded-lg p-4 my-4 flex gap-3">
          {calloutValue.icon?.emoji && (
            <span className="text-xl">{calloutValue.icon.emoji}</span>
          )}
          <div className="text-muted-foreground">
            {renderRichText(calloutValue.rich_text)}
          </div>
        </div>
      );
    }

    case 'toggle': {
      const toggleValue = value as { rich_text?: RichText[] };
      return (
        <details className="my-4 bg-secondary/30 rounded-lg">
          <summary className="cursor-pointer p-3 font-medium text-foreground hover:bg-secondary/50 rounded-lg">
            {renderRichText(toggleValue.rich_text)}
          </summary>
          <div className="p-3 pt-0">
            {/* Toggle children would need recursive handling */}
          </div>
        </details>
      );
    }

    case 'bookmark': {
      const bookmarkValue = value as { url?: string; caption?: RichText[] };
      return (
        <a
          href={bookmarkValue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block my-4 p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
        >
          <span className="text-primary hover:underline">{bookmarkValue.url}</span>
          {bookmarkValue.caption && bookmarkValue.caption.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {renderRichText(bookmarkValue.caption)}
            </p>
          )}
        </a>
      );
    }

    case 'table_of_contents':
      // Skip table of contents in rendered view
      return null;

    case 'unsupported':
      return null;

    default:
      console.log(`Unsupported block type: ${type}`);
      return null;
  }
}

export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps): React.ReactNode {
  // Group consecutive list items
  const groupedBlocks: (NotionBlock | NotionBlock[])[] = [];
  let currentList: NotionBlock[] = [];
  let currentListType: string | null = null;

  blocks.forEach((block) => {
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      if (currentListType === block.type) {
        currentList.push(block);
      } else {
        if (currentList.length > 0) {
          groupedBlocks.push(currentList);
        }
        currentList = [block];
        currentListType = block.type;
      }
    } else {
      if (currentList.length > 0) {
        groupedBlocks.push(currentList);
        currentList = [];
        currentListType = null;
      }
      groupedBlocks.push(block);
    }
  });

  if (currentList.length > 0) {
    groupedBlocks.push(currentList);
  }

  return (
    <div className="notion-content">
      {groupedBlocks.map((item, index) => {
        if (Array.isArray(item)) {
          const listType = item[0].type;
          const ListTag = listType === 'numbered_list_item' ? 'ol' : 'ul';
          return (
            <ListTag key={index} className="my-4">
              {item.map((block) => (
                <NotionBlock key={block.id} block={block} />
              ))}
            </ListTag>
          );
        }
        return <NotionBlock key={item.id} block={item} />;
      })}
    </div>
  );
}
